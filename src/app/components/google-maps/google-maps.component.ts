import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { NgxCaptureService } from "ngx-capture";
import { Observable, map, startWith, tap } from "rxjs";
import { MapOption } from "src/app/helpers/helper";
import { ResultsComponent } from "../results/results.component";
import { IaresultComponent } from "../iaresult/iaresult.component";
import { SendImageService } from "src/app/services/send-image/send-image.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"],
})
export class GoogleMapsComponent {
  zoom = 40;
  img = "";
  public isLoading = false;
  public myControl = new FormControl<string | any>("");
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: "hybrid",
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  @ViewChild("screen", { static: true }) screen: ElementRef | any;

  mapoptions = MapOption;
  mapElement: any;

  constructor(
    private captureService: NgxCaptureService,
    private dialog: MatDialog,
    private sendimage: SendImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit() {
    this.mapElement = this.screen.nativeElement;
  }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.name;
        return name
          ? this._filter(name as string)
          : this.mockAutoCompleteOptions.slice();
      })
    );
  }

  zoomIn() {
    if (
      this.mapoptions.zoom &&
      this.mapoptions.maxZoom &&
      this.mapoptions.zoom < this.mapoptions.maxZoom
    )
      this.mapoptions.zoom++;
  }

  zoomOut() {
    if (
      this.mapoptions.zoom &&
      this.mapoptions.minZoom &&
      this.mapoptions.zoom > this.mapoptions.minZoom
    )
      this.mapoptions.zoom--;
  }

  mockAutoCompleteOptions: any[] = [
    { address: "10 rue due Périgord" },
    { address: "25 chemin du Beaupuy" },
    { address: "90 avenue de Fronton" },
  ];
  filteredOptions!: Observable<any[]>;

  displayFn(user: any): string {
    return user && user.name ? user.name : "";
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.mockAutoCompleteOptions.filter((option) =>
      option.address.toLowerCase().includes(filterValue)
    );
  }

  moveToUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = userLocation; // Update the map's center
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  takeScreenshot() {
    this.isLoading = true;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the center coordinates
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;

    // Adjust the coordinates to get the top-left corner of the capture area
    const captureX = centerX - 128; // Half of the width (256 / 2)
    const captureY = centerY - 128; // Half of the height (256 / 2)

    this.captureService
      .getImage(this.mapElement, false, {
        x: captureX,
        y: captureY,
        width: 256,
        height: 256,
        scale: 1,
      })
      .pipe(
        tap((img) => {
          //this.captureService.downloadImage(img);
          this.img = img;
        })
      )
      .subscribe((a) => {
        this.isLoading = false;
        this.openDialog(this.img);
      });
  }

  openDialog(result: string) {
    const dialogRef = this.dialog.open(ResultsComponent, {
      data: result,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.isLoading = true;
        this.sendimage.sendResult(res).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            const objectURL = "data:image/png;base64," + res.data;
            const base64Img = this.sanitizer.bypassSecurityTrustUrl(objectURL);

            this.dialog.open(IaresultComponent, {
              data: { base64Img, previousImg: this.img },
            });
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    });
  }
}
