import { Injectable } from '@angular/core';
import { User } from '../models/userModels';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public saveUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public getCompanyId() {
    const user = this.getUser();
    if(!user) {
      return
    } else {
      return user.company?._id;
    }
  }

  public getUser(): User | null{
    const user = sessionStorage.getItem('user');
    if(user) {
      return JSON.parse(user)
    }
    return null
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token')
  }

  public removeUserData() {
    this.deleteToken();
    this.deleteUser();
  }

  public deleteToken() {
    sessionStorage.removeItem('token');
  }

  public deleteUser() {
    sessionStorage.removeItem('user');
  }
}