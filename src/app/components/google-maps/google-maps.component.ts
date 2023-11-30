import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, startWith, map } from "rxjs";
import { NgxCaptureService } from 'ngx-capture';
import { tap } from "rxjs";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"],
})
export class GoogleMapsComponent {

  @ViewChild('screen', { static: true }) screen: ElementRef | any;

  mapElement:any;
  zoom = 40;
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
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }]
      }
    ],
  };

  constructor(private captureService:NgxCaptureService) {}

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
    if (this.zoom && this.options.maxZoom && this.zoom < this.options.maxZoom)
      this.zoom++;
  }

  zoomOut() {
    if (this.zoom && this.options.minZoom && this.zoom > this.options.minZoom)
      this.zoom--;
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

  takeScreenshot(){
    this.captureService.getImage(this.mapElement,true).pipe(
      tap(img => {
        console.log("screenshot taken : "+img)
      })
    ).subscribe()
  }
}
