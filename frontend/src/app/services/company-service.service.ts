import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RequestCompanyService } from '../models/companyServiceModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService implements OnDestroy {
  public companyServiceColorOptions: string[] = [
    '#68AF99',
    '#723B86',
    '#DE92DA',
    '#695C95',
    '#8138DA',
    '#FDAEFC',
    '#1049B1',
  ];
  private baseEndpoint = ''
  public companyServices$ = new BehaviorSubject<any>(null)
  private unsubscribe = new Subject<void>();

  constructor(
    private http: HttpClient, 
    private endpointService: EndpointService,
  ) {
    this.baseEndpoint = endpointService.getCompanyServiceEndpoint();
   }

   public getServices() {
    return this.http.get(`${this.baseEndpoint}`)
   }

   public getService(id: string) {
    return this.http.get(`${this.baseEndpoint}/${id}`)
   }

   public createService(companyService: RequestCompanyService) {
    return this.http.post(`${this.baseEndpoint}`, companyService)
   }
   public refreshCompanyServiceList() {
      this.getServices()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(services => this.companyServices$.next(services))
  }

  ngOnDestroy(): void {
   this.unsubscribe.next();
   this.unsubscribe.complete();
  }
}
