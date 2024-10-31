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
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatDivider } from "@angular/material/divider";
import { MatToolbar } from "@angular/material/toolbar";
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'; // Adjust path if necessary
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from "@angular/common";

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCard,
    MatProgressSpinner,
    MatDivider,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatToolbar,
    CommonModule
  ],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  get dialog(): MatDialog {
    return <MatDialog>this._dialog;
  }

  set dialog(value: MatDialog) {
    this._dialog = value;
  }
  private _dialog: MatDialog // Inject MatDialog
    | undefined // Inject MatDialog
  isLoading = false;
  constructeurFormulaire = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  connexionService = inject(ConnexionService);
  errorMessage: string | null = null; // To hold error messages

  formulaire: FormGroup = this.constructeurFormulaire.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });
  onConnexion() {
    // Clear any existing error message
    this.errorMessage = null;

    if (this.formulaire.valid) {
      this.isLoading = true;
      const utilisateur: User = this.formulaire.value;

      this.http.post<LoginResponse>('http://localhost:3000/login', utilisateur).subscribe(
        (reponse: LoginResponse) => {
          localStorage.setItem('jwt', reponse.jwt);
          this.connexionService.connecte = true;
          this.router.navigateByUrl('/accueil');
        },
        (error) => {
          let errorMessage: string; // Create a variable for the error message
          // Handle error response
          if (error.status === 403) {
            errorMessage = 'Mot de passe incorrect';
          } else if (error.status === 404) {
            errorMessage = 'Aucun utilisateur avec cet email';
          } else {
            errorMessage = 'Une erreur est survenue, veuillez réessayer'; // General error
          }
          this.dialog.open(ErrorDialogComponent, {
            data: { message: errorMessage },
          });
        },
        () => {
          this.isLoading = false; // Ensure isLoading is set to false after request completes
        }
      );
    }
  }
}
