import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestStudent, Student } from '../models/studentModels';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  
  public students$ = new BehaviorSubject<Student[]>([]);

  private baseEndpoint = '';

  constructor(
    private http: HttpClient,
    private endpointService: EndpointService
  ) {
    this.baseEndpoint = endpointService.getStudentEndpoint();
  }

  public getStudent(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseEndpoint}/${studentId}`);
  }

  public getStudents(companyId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseEndpoint}/company/${companyId}`);
  }

  public createStudent(student: RequestStudent): Observable<RequestStudent> {
    console.log(this.baseEndpoint);
    console.log(student)
    return this.http.post<RequestStudent>(`${this.baseEndpoint}`, student);
  }
}
