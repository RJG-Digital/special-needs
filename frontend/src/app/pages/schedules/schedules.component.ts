import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getMySchedules()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => {
      console.log(res);
    })
  }
  ngOnDestroy(): void {
   this.unsubscribe$.next();
   this.unsubscribe$.complete();
  }

}
