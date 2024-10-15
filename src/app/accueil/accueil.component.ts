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
      images: [
        'https://www.vsveicolispeciali.com/wp-content/uploads/2024/01/trdelnik-kurtoskalacs-street-food.jpg',
        'https://www.vsveicolispeciali.com/wp-content/uploads/2024/01/trdelnik-kurtoskalacs-street-food.jpg',
      ],
    },
    {
      nom: 'Bien',
      images: [
        'https://www.vsveicolispeciali.com/wp-content/uploads/2024/01/trdelnik-kurtoskalacs-street-food.jpg',
      ],
    },
    {
      nom: 'Moyen',
      images: [
        'https://www.vsveicolispeciali.com/wp-content/uploads/2024/01/trdelnik-kurtoskalacs-street-food.jpg',
        'https://www.vsveicolispeciali.com/wp-content/uploads/2024/01/trdelnik-kurtoskalacs-street-food.jpg',
      ],
    },
    { nom: 'Pas top', images: [] },
    { nom: 'Nul', images: [] },
  ];

  ajouterImage() {
    if (this.saisieImage != '') {
      this.categories[0].images.push(this.saisieImage);
      this.saisieImage = '';
    }
  }

  deplacerImage(indexCategorie: number, indexImage: number, enDessous = true) {
    const imageClique = this.categories[indexCategorie].images[indexImage];
    this.categories[indexCategorie + (enDessous ? 1 : -1)].images.push(
      imageClique,
    );
    this.categories[indexCategorie].images.splice(indexImage, 1);
  }

  supprimerImage(indexCategorie: number, indexImage: number) {
    this.categories[indexCategorie].images.splice(indexImage, 1);
  }
}
