import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { SendImageService } from "src/app/services/send-image/send-image.service";

@Component({
  selector: "app-iaresult",
  templateUrl: "./iaresult.component.html",
  styleUrls: ["./iaresult.component.css"],
})
export class IaresultComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private sendimage: SendImageService,
    private dialogRef: MatDialog,
    private sanitizer: DomSanitizer
  ) {}
  public image: any;

  ngOnInit() {
    console.log('%c⧭', 'color: #006dcc', this.data);
    let objectURL = "data:image/png;base64," + this.data.data;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
