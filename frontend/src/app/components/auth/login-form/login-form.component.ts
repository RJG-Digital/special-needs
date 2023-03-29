import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;

  get email() { return this.loginForm.get('email');}
  get password() {return this.loginForm.get('password');}

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public onSubmit() {
    const user = {
      email: this.email?.value,
      password: this.password?.value
    }
    this.authService.login(user)
    .pipe(take(1))
    .subscribe((res) => {
     if(res) {
      const{_id, firstName, lastName, profileImage, email, token, companyId, title, role} = res;
      const user = {_id, firstName, lastName, profileImage, email, title, companyId, role};
      this.sessionStorageService.saveUser(user);
      this.authService.user$.next(this.sessionStorageService.getUser());
      if(token) {
        this.sessionStorageService.saveToken(token);
        this.router.navigate(['/dashboard']);
      }

     }
    },(error) => {
      // notify loginFailed 
      console.log(error.error.message);
      this.notificationService.error(error.error.message);
    })
  }
}
