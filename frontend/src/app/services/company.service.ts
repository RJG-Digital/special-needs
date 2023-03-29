import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseEndpoint = ''
  public company$ = new BehaviorSubject<any>(null)

  constructor(
    private http: HttpClient, 
    private endpointService: EndpointService,
  ) {
    this.baseEndpoint = endpointService.getCompanyEndpoint();
   }

   public getCompany(companyId: string) {
    return this.http.get(`${this.baseEndpoint}/${companyId}`)
   }
}
