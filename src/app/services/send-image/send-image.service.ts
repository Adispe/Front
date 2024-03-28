import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendImageService {

  public apiUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  // Function to convert base64 to Blob
  private base64ToBlob(base64String: string, type: string): Blob {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type });
  }
  
  sendResult(img:any){
    if(img){

      const blob = this.base64ToBlob(img, "image/jpeg")

      const formData = new FormData();
      formData.append('file', blob, 'image.jpeg');

      const url = `${this.apiUrl}/prediction`;
      this.http.post(url, formData).subscribe(
        (response) => {
          console.log('Image envoyée avec succès au backend', response);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'image au backend', error);
        }
      );
    }

    
  }
}
