import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/userModels';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User;
  private unsubscribe = new Subject<void>();
  
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.authService.user$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((user) => {
      if(user) {
        this.user = user;
        console.log(this.user);
      } else {
        this.authService.logout();
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
