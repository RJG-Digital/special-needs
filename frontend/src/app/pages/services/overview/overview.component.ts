import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { ResponseCompanyService } from 'src/app/models/companyServiceModels';
import { CompanyServiceService } from 'src/app/services/company-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  public companyServices: ResponseCompanyService[];

  private unsubscribe = new Subject<void>();

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private companyServiceService: CompanyServiceService){}

  ngOnInit(): void {
    this.companyServiceService.companyServices$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((s) => {
      this.companyServices = s;
    })
  }

  public onColorEdit(event: ResponseCompanyService | null) {
    if (event) {
      // Edit
    } else {
      // Add
      this.drawer.toggle();
    }
  }

  public onFlyoutClose(saved:boolean) {
    if(saved) {}
    this.drawer.close();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}