import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatToolbar } from "@angular/material/toolbar";
import { NgIf } from "@angular/common";
import { MatError } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"],
  imports: [
    MatProgressSpinner,
    MatTableModule,
    MatToolbar,
    NgIf,
    MatError,
    MatButtonModule
  ],
  standalone: true
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  displayedColumns: string[] = ['id', 'email', 'password', 'manage'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.users = data;
          console.log(this.users);
        } else {
          this.errorMessage = 'Unexpected data format';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
        console.error('Error fetching users:', error);
      }
    });
  }

  onBlockUser(user: User): void {
    if (user.blocked) {
      this.userService.unblockUser(user.id).subscribe({
        next: () => {
          user.blocked = false;
          console.log(`User with ID ${user.id} unblocked successfully.`);
        },
        error: (error) => {
          console.error('Error unblocking user:', error);
          this.errorMessage = 'Failed to unblock user';
        }
      });
    } else {
      this.userService.blockUser(user.id).subscribe({
        next: () => {
          user.blocked = true;
          console.log(`User with ID ${user.id} blocked successfully.`);
        },
        error: (error) => {
          console.error('Error blocking user:', error);
          this.errorMessage = 'Failed to block user';
        }
      });
    }
  }
}
