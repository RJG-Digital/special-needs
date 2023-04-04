import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CompanyServiceService } from 'src/app/services/company-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();

  constructor(private companyServiceService: CompanyServiceService){}

  ngOnInit(): void {
    this.companyServiceService.getServices()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((s) => {
      this.companyServiceService.companyServices$.next(s);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
