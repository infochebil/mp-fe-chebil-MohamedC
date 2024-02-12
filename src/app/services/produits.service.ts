import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Produit} from '../model/produit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  deleteProduit(produit: Produit) {
    return this.http.delete(this.urlHote, {body:produit});
  }

  addProduit(nouveau: Produit) {
    return this.http.post<Array<Produit>>(this.urlHote, nouveau);
  }

  updateProduit(nouveau: Produit) {
    return this.http.put(this.urlHote, nouveau);
  }
}
