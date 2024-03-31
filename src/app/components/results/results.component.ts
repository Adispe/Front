import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ResultsComponent>,
  ) {}

  @ViewChild("screen", { static: true }) screen: any;
  @Output() IAResponse = new EventEmitter();

  ngOnInit(): void {}

  sendImage() {
    this.dialogRef.close(this.data)
  }



}
