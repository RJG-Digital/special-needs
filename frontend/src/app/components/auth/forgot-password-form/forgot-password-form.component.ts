import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  get email() {return this.forgotPasswordForm.get('email')};

  constructor(
    public fb: FormBuilder, 
    private authservice: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required , Validators.email]],
    }
    )
  }

  public onSubmit() {
    if(this.forgotPasswordForm.valid) {
      this.authservice.forgotPassword(this.email?.value.trim())
      .pipe(take(1))
      .subscribe((res) => {
        if(res) {
          this.notificationService.success('Please check your email');
          this.buildForm();
        }
      })
    } 
  }
}
