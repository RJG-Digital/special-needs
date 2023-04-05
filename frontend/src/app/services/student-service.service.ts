import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RequestStudentService, ResponseStudentService, StudentServiceTableMeta } from '../models/studentServiceModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private baseEndpoint = ''
  private unsubscribe = new Subject<void>();

  constructor(
    private http: HttpClient, 
    private endpointService: EndpointService,
  ) {
    this.baseEndpoint = endpointService.getStudentServiceEndpoint();
   }

   public getStudentServices(studentId: string):Observable<ResponseStudentService[]> {
    return this.http.get<ResponseStudentService[]>(`${this.baseEndpoint}/student/${studentId}`);
   }

   public upsertStudentService (studentService: RequestStudentService): Observable<ResponseStudentService> {
    return this.http.post<ResponseStudentService>(`${this.baseEndpoint}`, studentService);
   }
}
