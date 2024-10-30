import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare type Categorie = {
  nom: string;
  images: string[];
  editCategorie: boolean;
};

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  saisieImage = '';

  saisieCategorie = '';

  categories: Categorie[] = [];

  http: HttpClient = inject(HttpClient);

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    //si la personne est connectée
    if (jwt) {
      this.http
        .get('http://localhost:3000/categories', {
          headers: { Authorization: jwt },
        })
        .subscribe((categories: any) => (this.categories = categories));
    }

    // const jsonCategories = localStorage.getItem('sauvegarde');

    // if (jsonCategories) {
    //   this.categories = JSON.parse(jsonCategories);
    // } else {
    //   this.reset();
    // }
  }

  reset() {
    this.categories = [
      { nom: 'Super', images: [], editCategorie: false },
      { nom: 'Bien', images: [], editCategorie: false },
      { nom: 'Moyen', images: [], editCategorie: false },
      { nom: 'Pas top', images: [], editCategorie: false },
      { nom: 'Nul', images: [], editCategorie: false },
    ];

    this.sauvegarde();
  }

  sauvegarde() {
    const jsonCategories = JSON.stringify(this.categories);
    localStorage.setItem('sauvegarde', jsonCategories);
  }

  ajouterCategorie() {
    if (this.saisieCategorie != '') {
      const nouvelleCategorie = {
        nom: this.saisieCategorie,
        images: [],
        editCategorie: false,
      };
      this.categories.push(nouvelleCategorie);
      this.saisieCategorie = '';
      this.sauvegarde();
    }
  }

  onKeyUpTitreCategorie(categorie: Categorie, evenement: KeyboardEvent) {
    if (evenement.key == 'Escape' || evenement.key == 'Enter') {
      categorie.editCategorie = false;
    }

    this.sauvegarde();
  }

  supprimerCategorie(indexCategorie: number) {
    if (this.categories.length > 1) {
      // on deplace toutes les images de la catégorie à supprimer, une catégories au dessus
      const indexCategorieCible = indexCategorie == 0 ? 1 : indexCategorie - 1;

      this.categories[indexCategorieCible].images = [
        ...this.categories[indexCategorieCible].images,
        ...this.categories[indexCategorie].images,
      ];

      //on supprime la categorie
      this.categories.splice(indexCategorie, 1);

      this.sauvegarde();
    }
  }

  doubleClicNomCategorie(categorie: Categorie, evenement: any) {
    categorie.editCategorie = true;

    const elementClique: HTMLInputElement = evenement.target;
    const enTeteClique = elementClique.closest('.en-tete');
    const inputEnTete = enTeteClique?.querySelector('input');

    setTimeout(() => inputEnTete?.focus(), 1);
  }

  ajouterImage() {
    if (this.saisieImage != '') {
      this.categories[0].images.push(this.saisieImage);
      this.saisieImage = '';

      this.sauvegarde();
    }
  }

  deplacerImage(indexCategorie: number, indexImage: number, enDessous = true) {
    const imageClique = this.categories[indexCategorie].images[indexImage];
    this.categories[indexCategorie + (enDessous ? 1 : -1)].images.push(
      imageClique,
    );
    this.categories[indexCategorie].images.splice(indexImage, 1);
    this.sauvegarde();
  }

  supprimerImage(indexCategorie: number, indexImage: number) {
    this.categories[indexCategorie].images.splice(indexImage, 1);
    this.sauvegarde();
  }
}
