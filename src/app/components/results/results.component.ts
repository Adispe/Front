import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
import { HttpClient } from "@angular/common/http";
import { SendImageService } from "src/app/services/send-image/send-image.service";
import { IaresultComponent } from "../iaresult/iaresult.component";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private http: HttpClient,
    private sendimage: SendImageService,
    private dialogRef: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  @ViewChild("screen", { static: true }) screen: any;

  ngOnInit(): void {}

  public IAResult = false;

  async send() {
    const result = await this.sendimage.sendResult(this.data).subscribe({
      next: (res: any) => {
        this.openDialog(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    console.log("%c⧭", "color: #733d00", result);
  }

  private openDialog(res: any) {
    this.IAResult = true;
    this.dialogRef.open(IaresultComponent, {
      data: res,
    });
  }
}
