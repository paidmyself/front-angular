import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  connexionService = inject(ConnexionService);
  // router = inject(Router);

  deconnexion() {
    localStorage.removeItem('jwt');
    this.connexionService.connecte = false;
    // this.router.navigateByUrl('/connexion');
  }
}
