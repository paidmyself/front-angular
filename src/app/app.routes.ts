import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from './page404/page404.component';
import { utilisateurConnecteGuard } from './services/utilisateur-connecte.guard';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [utilisateurConnecteGuard],
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
