import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ConnexionService } from './services/connexion.service';
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  connexionService = inject(ConnexionService);
  router = inject(Router);


  drawerOpen = false;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  deconnexion() {
    this.connexionService.deconnexion();
    this.router.navigateByUrl('/connexion');
  }



}
