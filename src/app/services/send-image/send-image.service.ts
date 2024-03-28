import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendImageService {

  public apiUrl = "http://127.0.0.1:3000";

  constructor(private http: HttpClient) { }

  convertBaseToImg(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
        
        const blob = new Blob([ia], { type: mimeString })
        const conversionResult = new FormData();
        conversionResult.append('screenshot', blob, 'screenshot.png');
        return conversionResult;
        //return new File([blob], "file", { type: blob.type });
  }
  
  sendResult(img:any){
    if(img){
      let conversionResult =  this.convertBaseToImg(img);
      console.log(conversionResult);
      // Envoie la requête HTTP POST avec l'image en base64
      const url = `${this.apiUrl}/prediction`;
      console.log('Image envoyée avec succès au backend'+conversionResult);
      this.http.post(url, conversionResult ).subscribe(
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
