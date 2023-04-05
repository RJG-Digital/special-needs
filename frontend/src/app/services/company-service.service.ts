import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { RequestCompanyService, ResponseCompanyService } from '../models/companyServiceModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService implements OnDestroy {
  public companyServiceColorOptions: string[] = [
    '#68AF99',
    '#DE92DA',
    '#8138DA',
    '#3f51b5',
    '#f44336',
    "#4caf50",
    "#ffeb3b",
    "#ff9100",
    "#00e5ff"
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

   public getServices(): Observable<ResponseCompanyService[]> {
    return this.http.get<ResponseCompanyService[]>(`${this.baseEndpoint}`)
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
