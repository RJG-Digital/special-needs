import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private baseUrl = 'http://localhost:5001/api'
  
  constructor() { }

  public getAuthEndpoint() {
    return `${this.baseUrl}/users`;
  }

  public getCompanyEndpoint() {
    return `${this.baseUrl}/companies`;
  }
  
  public getUsersEndpoint() {
    return `${this.baseUrl}/users`;
  }

  public getStudentEndpoint() {
    return `${this.baseUrl}/students`;
  }
}
