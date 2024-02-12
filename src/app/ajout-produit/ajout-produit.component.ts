import {Component} from '@angular/core';
import {Categorie, Produit} from '../model/produit';
import {ProduitsService} from "../services/produits.service";
import {CategorieService} from "../services/categorie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrl: './ajout-produit.component.css'
})
export class AjoutProduitComponent {
  nouveauProduit: Produit = {id: 0, code: '', designation: '', prix: 0 , quantite: 0};
  categories: Array<Categorie> = [];

  constructor(private produitsService: ProduitsService,
              private router: Router,
              private categorieService: CategorieService) {
    this.getCategories();

  }

  getCategories() {
    console.log("Retrieving the list of products");
    this.categorieService.getCategories().subscribe({
      next: data => {
        console.log("GET Success");
        this.categories = data;
      },
      error: err => {
        console.error("GET Error", err);
      }
    });
  }

  ajouterProduit(nouveau: Produit) {
    let requestUpdate: Produit = {
      "id": this.nouveauProduit.id,
      "code": this.nouveauProduit.code,
      "designation": this.nouveauProduit.designation,
      "prix": this.nouveauProduit.prix,
      "quantite": this.nouveauProduit.quantite,
      "categorie": this.categories.find(item => item.id === Number(this.nouveauProduit.categorie))
    }
    console.log('New product');
    this.produitsService.addProduit(requestUpdate).subscribe({
      next: newProduct => {
        console.log("POST Success");
        this.router.navigate(['/produits'])
      },
      error: err => {
        console.error("POST Error", err);
      }
    });
  }
}
