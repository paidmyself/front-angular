import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  constructeurFormulaire = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  connexionService = inject(ConnexionService);

  formulaire: FormGroup = this.constructeurFormulaire.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  onConnexion() {
    if (this.formulaire.valid) {
      const utilisateur = this.formulaire.value;

      this.http
        .post('http://localhost:3000/login', utilisateur)
        .subscribe((reponse: any) => {
          localStorage.setItem('jwt', reponse.jwt);
          this.connexionService.connecte = true;
          this.router.navigateByUrl('/accueil');
        });
    }
  }
}
