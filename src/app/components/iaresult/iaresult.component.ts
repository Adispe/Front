import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-iaresult",
  templateUrl: "./iaresult.component.html",
  styleUrls: ["./iaresult.component.css"],
})
export class IaresultComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}
  public image: any;

  ngOnInit() {
    let objectURL = "data:image/png;base64," + this.data.data;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
