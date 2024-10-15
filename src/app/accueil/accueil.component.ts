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
      ],
    },
    { nom: 'Bien', images: [] },
    { nom: 'Moyen', images: [] },
    { nom: 'Pas top', images: [] },
    { nom: 'Nul', images: [] },
  ];

  ajouterImage() {
    if (this.saisieImage != '') {
      this.categories[0].images.push(this.saisieImage);
      this.saisieImage = '';
    }
  }
}
