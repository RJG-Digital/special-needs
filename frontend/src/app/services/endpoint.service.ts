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
}
