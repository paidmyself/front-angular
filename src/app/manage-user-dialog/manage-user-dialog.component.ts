import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { UserService } from '../user.service';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-manage-user-dialog",
  templateUrl: "./manage-user-dialog.component.html",
  imports:[
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  standalone: true,
  styleUrls: ["./manage-user-dialog.component.scss"]
})
export class ManageUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }, // Pass user data
    private userService: UserService
  ) {}

  onBlockUnblockUser(): void {
    if (this.data.user.blocked) {
      this.userService.unblockUser(this.data.user.id).subscribe({
        next: () => {
          this.data.user.blocked = false;
          this.dialogRef.close(true); // Close dialog and indicate success
        },
        error: (error) => {
          console.error('Error unblocking user:', error);
        }
      });
    } else {
      this.userService.blockUser(this.data.user.id).subscribe({
        next: () => {
          this.data.user.blocked = true;
          this.dialogRef.close(true); // Close dialog and indicate success
        },
        error: (error) => {
          console.error('Error blocking user:', error);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
