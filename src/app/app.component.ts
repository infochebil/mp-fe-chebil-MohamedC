import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  actions:Array<any> = [
    {titre:"Accueil" , route: "/accueil"},
    {titre:"Liste des produits" , route: "/produits"},
    {titre:"Ajouter Produit" , route: "/ajouterProduit"},
  ]

  actionCourante: any;
  setActionCourante(a: any)
  {
    this.actionCourante = a;
  }
}
