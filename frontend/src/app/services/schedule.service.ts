import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestUserSchedule, ResponseUserSchedule } from '../models/userScheduleModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseEndpoint = '';
  public selectedSchedule$ = new Subject<ResponseUserSchedule>();

  constructor(  private http: HttpClient,
    private endpointService: EndpointService,) { 
      this.baseEndpoint = this.endpointService.getScheduleEndpoint();
    }

  public createSchedule(schedual: RequestUserSchedule): Observable<RequestUserSchedule> {
    return this.http.post<RequestUserSchedule>(`${this.baseEndpoint}`, schedual);
  }

  public getSchedule(user: string): Observable<ResponseUserSchedule> {
    return this.http.get<ResponseUserSchedule>(`${this.baseEndpoint}/${user}`);
  }

  public getStudentSchedule(studentid: string): Observable<ResponseUserSchedule> {
    return this.http.get<ResponseUserSchedule>(`${this.baseEndpoint}/student/${studentid}`);
  }

  public getSchedules(): Observable<ResponseUserSchedule[]> {
    return this.http.get<ResponseUserSchedule[]>(`${this.baseEndpoint}`);
  }
  public getMySchedules(): Observable<ResponseUserSchedule[]> {
    return this.http.get<ResponseUserSchedule[]>(`${this.baseEndpoint}/me`);
  }

  public updateSchedule(id: string, schedual: RequestUserSchedule): Observable<ResponseUserSchedule[]> {
    return this.http.put<ResponseUserSchedule[]>(`${this.baseEndpoint}/${id}`, schedual);
  }
}
