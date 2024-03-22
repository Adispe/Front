import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendImageService {

  public apiUrl = "http://example.com/api";

  constructor(private http: HttpClient) { }

  
  sendResult(img:any){
    // Envoie la requête HTTP POST avec l'image en base64
    const url = `${this.apiUrl}/register`;
    console.log('Image envoyée avec succès au backend'+img);
    this.http.post(url, img ).subscribe(
      (response) => {
        console.log('Image envoyée avec succès au backend', response);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'image au backend', error);
      }
    );
  }
}
