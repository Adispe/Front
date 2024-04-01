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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.base64Img = data.base64Img;
    this.previousImg = data.previousImg;
  }

  ngOnInit() {
  }
}
