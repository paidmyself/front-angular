// user-service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
  blocked?: boolean; // Optional, depending on if you fetch this field
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = 'http://localhost:3000/utilisateurs'; // Your Express API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  blockUser(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/block`, {});
  }

  unblockUser(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/unblock`, {});
  }
}
