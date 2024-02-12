export class Produit {
  id: number | undefined;
  code: string | undefined;
  quantite: number | undefined;
  categorie?: Categorie | undefined;
  designation: string | undefined;
  prix: number | undefined
}

export class Categorie {
  id: number | undefined;
  libelle: string | undefined;
  code: string | undefined;
}
