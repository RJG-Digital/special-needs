import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/userModels';
import { EndpointService } from './endpoint.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseEndpoint = ''

  public user$ = new BehaviorSubject<User | null>(this.sessionStorageService.getUser());

  constructor(
    private http: HttpClient, 
    private endpointService: EndpointService,
    private router: Router,
    private sessionStorageService: SessionStorageService
    ) { 
    this.baseEndpoint = endpointService.getAuthEndpoint();
  }

  public login(user: User): Observable<User> {
    return this.http.post(`${this.baseEndpoint}/login`, user);
  }

  public logout() {
    this.sessionStorageService.removeUserData();
    this.user$.next(this.sessionStorageService.getUser());
    this.router.navigate(['auth/login']);
  }

  public register(user: User): Observable<User>{
    return this.http.post(this.baseEndpoint, user);
  }

}
