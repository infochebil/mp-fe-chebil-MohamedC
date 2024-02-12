import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from "../model/produit";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:3333/categorie/";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(this.urlHote);
  }

}
