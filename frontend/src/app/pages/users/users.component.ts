import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/userModels';
import { CompanyService } from 'src/app/services/company.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public navLinks = [
    { label: 'Overview', path: '/users/overview' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
  public users: User[];
  public company: any;
  
  private unsubscribe = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyService.company$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((company) => {
        if (company) {
          this.company = company;
          console.log(this.company)
          this.usersService
            .getUsers(this.company._id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((users) => {
              this.users = users
              this.usersService.Users$.next(this.users);
              
            });
        }
      });
  }
}
