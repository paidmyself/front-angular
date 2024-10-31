import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatToolbar } from "@angular/material/toolbar";
import { NgIf } from "@angular/common";
import { MatError } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { ManageUserDialogComponent } from '../manage-user-dialog/manage-user-dialog.component';

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

  displayedColumns: string[] = ['id', 'email', 'password', 'blocked', 'blockAction'];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.users = data.map(user => ({
            ...user,
            blocked: user.blocked || false // Ensure blocked is a boolean
          }));
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

  onManageUser(user: User): void {
    const dialogRef = this.dialog.open(ManageUserDialogComponent, {
      data: { user } // Pass the user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload users if changes were made
      }
    });
  }
}
