import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  saisieImage = '';

  categories: { nom: string; images: string[] }[] = [
    {
      nom: 'Super',
      images: [],
    },
    {
      nom: 'Bien',
      images: [],
    },
    {
      nom: 'Moyen',
      images: [],
    },
    { nom: 'Pas top', images: [] },
    { nom: 'Nul', images: [] },
  ];

  ngOnInit() {
    const jsonCategories = localStorage.getItem('sauvegarde');

    if (jsonCategories) {
      this.categories = JSON.parse(jsonCategories);
    }
  }

  sauvegarde() {
    const jsonCategories = JSON.stringify(this.categories);
    localStorage.setItem('sauvegarde', jsonCategories);
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
