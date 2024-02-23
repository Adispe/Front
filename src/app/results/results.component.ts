import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,    
  ) { }

  @ViewChild('screen', { static: true }) screen: any;


  ngOnInit(): void {
    console.log("rhtrhhrh"+this.data)
  }

}
