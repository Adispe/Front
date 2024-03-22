import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
import { HttpClient } from '@angular/common/http';
import { SendImageService } from "src/app/services/send-image/send-image.service";
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,private http: HttpClient, private sendimage: SendImageService,){ }

  @ViewChild('screen', { static: true }) screen: any;


  ngOnInit(): void {
  } 

  send(){
    this.sendimage.sendResult(this.data);
  }
}
