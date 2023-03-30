import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/userModels';
import { AuthService } from './services/auth.service';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  public user: User;
  public company: any;
  private unsubscribe = new Subject<void>();
  
  constructor(private authService: AuthService, private companyService: CompanyService) {}
 
  ngOnInit(): void {
    this.authService.user$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((user) => {
      if(user) {
        this.user = user;
        if(this.user.company && this.user.company._id) {
          this.companyService.getCompany(this.user.company._id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(company => {
            if(company) {
              this.companyService.company$.next(company);
              this.company = company;
            }
          })
        }
      } 
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}