import { Component, OnDestroy, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/userModels';
import {
  RequestUserSchedule,
  ResponseUserSchedule,
} from 'src/app/models/userScheduleModels';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public view: View = 'WorkWeek';
  public schedules: ResponseUserSchedule[];
  public me: User;
  public selectedSchedule: ResponseUserSchedule;

  private unsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {}
  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.unsubscribe)).subscribe((me) => {
      if (me) {
        this.me = me;
      }
    });
    this.scheduleService
      .getMySchedules()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s) => {
        this.schedules = s;
        if(this.schedules && this.schedules.length) {
          this.selectedSchedule = this.schedules[0];
        }
      });
  }
  public makeSchedule() {
    if (this.me._id) {
      const newSchedule: RequestUserSchedule = {
        user: this.me._id,
        name: 'First Schedule',
        description: 'this is your first schedule',
        calenderEvents: [],
      };
      this.scheduleService
        .createSchedule(newSchedule)
        .pipe(take(1))
        .subscribe((s) => {
          if (s) {
            console.log(s);
          }
        });
    }
  }

  public onScheduleUpdate(event: any) {
    console.log('Got the emit of the schedule: ', event)
    if(event._id) {
      const scheduleUpdate : RequestUserSchedule = {
        ...event,
        user: event.user._id
      }
      this.scheduleService.updateSchedule(event._id, scheduleUpdate)
      .pipe(take(1))
      .subscribe(s => {
        console.log(s);
      })
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
