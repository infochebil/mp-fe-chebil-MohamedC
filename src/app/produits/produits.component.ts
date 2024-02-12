import {Component, OnInit} from '@angular/core';
import {Categorie, Produit} from '../model/produit';
import {NgForm} from '@angular/forms';
import {ProduitsService} from '../services/produits.service';
import {CategorieService} from "../services/categorie.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = [];
  produitsFiltres: Array<Produit> = [];
  categories: Array<Categorie> = [];
  produitCourant: any;
  searchTerm: string = '';

  constructor(private produitsService: ProduitsService,
              private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    console.log("Récupération de la liste des produits");
    this.consulterProduits();
    this.getCategories();
  }

/* Consultation Produit */

  consulterProduits() {
    console.log("Récupération de la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("GET Success");
        this.produits = data;
        this.produitsFiltres = [...this.produits];
      },
      error: err => {
        console.error("GET Error", err);
      }
    });
  }
/* Rechercher un Produit  */

  onSearchChange(): void {
    this.produitsFiltres = this.produits.filter(p => this.matchSearch(p));
  }

  matchSearch(produit: any): boolean {
    const searchFields = ['code', 'designation', 'categorie?.libelle'];
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    return searchFields.some(field =>
      produit[field]?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

/* Listes les Produits */

  getCategories() {
    console.log("Récupération de la liste des produits");
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

/* Supprimer Produit */

  supprimerProduit(produit: Produit) {
    const reponse: boolean = confirm(`Voulez-vous supprimer le produit : ${produit.designation}?`);

    if (reponse) {
      console.log("Suppression confirmée");

      this.produitsService.deleteProduit(produit).subscribe({
        next: () => {
          console.log("supprimer avec Succès");
          const index: number = this.produits.indexOf(produit);

          console.log("Index du produit à supprimer : " + index);

          if (index !== -1) {
            this.produits.splice(index, 1);
          }
        },
        error: err => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    } else {
      console.log("Annulation de la suppression");
    }
  }

  /* Mettre à jour Produit */


  mettreAJourProduit(nouveau: Produit) {
    const confirmation = confirm(`Produit existant. Confirmer la mise à jour: ${nouveau.code}?`);

    if (confirmation) {
      this.produitsService.updateProduit(nouveau).subscribe({
        next: updatedProduit => {
          console.log("PUT Success");
          this.consulterProduits();
        },
        error: err => {
          console.error("PUT Error", err);
        }
      });
    } else {
      console.log("Annulation de mise à jour");
    }
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    let requestUpdate: Produit = {
      "id": this.produitCourant.id,
      "code": this.produitCourant.code,
      "designation": this.produitCourant.designation,
      "quantite": this.produitCourant.quantite,
      "prix": this.produitCourant.prix,
      "categorie": this.categories.find(item => item.id === Number(this.produitCourant.categorie))
    }
    this.mettreAJourProduit(requestUpdate);
  }

  annulerSaisie() {
    this.produitCourant = new Produit();
  }

  /* Editer Produit */

  editerProduit(produit: Produit) {
    this.produitCourant = {
      "id": produit.id,
      "code": produit.code,
      "designation": produit.designation,
      "quantite": produit.quantite,
      "prix": produit.prix,
      "categorie": produit?.categorie?.id
    }
  }
}
