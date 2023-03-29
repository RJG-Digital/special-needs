import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/userModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseEndpoint = ''
  public Users$ = new BehaviorSubject<User[]>([])

  constructor(
    private http: HttpClient, 
    private endpointService: EndpointService,
  ) {
    this.baseEndpoint = endpointService.getUsersEndpoint();
   }

   public getUsers(companyId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseEndpoint}/${companyId}`)
   }
}
