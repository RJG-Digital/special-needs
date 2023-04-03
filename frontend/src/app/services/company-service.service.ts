import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestCompanyService } from '../models/companyServiceModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
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
}
