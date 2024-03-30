import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, startWith, map } from "rxjs";
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs";
import { MapOption } from "src/app/helpers/helper";
import { GoogleMap } from "@angular/google-maps";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ResultsComponent } from "../results/results.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"],
})
export class GoogleMapsComponent {
  zoom = 40;
  img = "";

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
    private dialogRef: MatDialog,
    private http: HttpClient
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
    this.captureService
      .getImage(this.mapElement, false, {
        x: 50,
        y: 150,
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
        this.openDialog(this.img);
      });
  }

  openDialog(result: string) {
    this.dialogRef.open(ResultsComponent, {
      data: result,
    });
  }
}
