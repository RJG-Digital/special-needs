import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }
  
  public success(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: message,
      panelClass: ['success']
    })
  }
    
  public error(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: message,
      panelClass: ['error']
    })
  }
}
