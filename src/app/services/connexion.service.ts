import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  connecte = false;

  constructor() {
    this.connecte = localStorage.getItem('jwt') != null;
  }
}

