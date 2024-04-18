import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-iaresult",
  templateUrl: "./iaresult.component.html",
  styleUrls: ["./iaresult.component.css"],
})
export class IaresultComponent {
  public base64Img: string = "";
  public previousImg: string = "";
  public class_areas: any;
  public class_colors: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('%c⧭', 'color: #1d3f73', data);
    this.base64Img = data.base64Img;
    this.previousImg = data.previousImg;
    this.class_areas = data.class_areas;
    this.class_colors = data.class_colors;
  }

  ngOnInit() {
    if (this.class_areas) {
      this.clearEmptyAreas(this.class_areas);
    }
  }
  clearEmptyAreas(class_areas: any) {
    const total: any = Object.values(class_areas).reduce(
      (acc: any, curr: any) => acc + curr,
      0
    );
    for (const key in class_areas) {
      class_areas[key] = Math.round((class_areas[key] / total) * 100);
      if (class_areas[key] === 0) {
        delete class_areas[key];
      }
    }

    this.class_areas = class_areas;
  }

  getClassColor(areaKey: any): string {
    const colorString = this.class_colors[areaKey];
    const rgbArray = JSON.parse(colorString);
    return `rgb(${rgbArray.join(",")})`;
  }
}
