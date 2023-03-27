import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/models/userModels';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public registerForm: FormGroup;

  get firstName() {return this.registerForm.get('firstName')}
  get lastName() {return this.registerForm.get('lastName')}
  get email() {return this.registerForm.get('email')}
  get password() {return this.registerForm.get('password')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}

  constructor(
    public fb: FormBuilder, 
    private authservice: AuthService,
    private router: Router,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    this.buildForm()
    this.registerForm.valueChanges.subscribe(() => {
      if(this.registerForm.errors?.['matchError']) {
        this.confirmPassword?.setErrors({matchError: true})
      } else {
        this.confirmPassword?.setErrors(null)
      }
    })
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
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.mustMatch}
    )
  }

  public onSubmit() {
    if(this.registerForm.valid) {
      const user: User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value,
      }
      this.authservice.register(user)
      .pipe(take(1))
      .subscribe((res) => {
        if(res) {
          this.router.navigate(['auth/login'])
          this.notificationService.success('Registered Successfully');
        }
      })
    } 
  }
}
