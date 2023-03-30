import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/userModels';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  public resetPasswordForm: FormGroup;

  private token = null;
  private unsubscribe= new Subject<void>();

  get password() {return this.resetPasswordForm.get('password')}
  get confirmPassword() {return this.resetPasswordForm.get('confirmPassword')}

  constructor(
    public fb: FormBuilder, 
    private authservice: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService,
    private route: ActivatedRoute 
    ) {

  }
  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((params: any) => {
      this.token = params.token;
      console.log(this.token);
    })
    this.buildForm();
  }

  public mustMatch: ValidatorFn =  (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(password && confirmPassword && password.value !== confirmPassword.value) {
      return {
        matchError: true
      }
    }
    return null;
  }

  private buildForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.mustMatch}
    )
  }

  public onSubmit() {
    if(this.resetPasswordForm.valid) {
      if(this.token) {
        this.sessionStorageService.saveToken(this.token);
      }
      this.authservice.resetPassword(this.password?.value.trim())
      .pipe(take(1))
      .subscribe((res) => {
        if(res) {
          this.sessionStorageService.deleteToken();
          this.router.navigate(['login'])
          this.notificationService.success('Password Reset Successfully!');
        }
      })
    } 
  }
}
