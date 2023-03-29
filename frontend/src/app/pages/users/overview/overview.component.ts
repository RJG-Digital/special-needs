import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/userModels';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public users: User[];
  private unsubscribe = new Subject<void>();
  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.usersService.Users$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(users => {
      if(users) {
        this.users = users;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
