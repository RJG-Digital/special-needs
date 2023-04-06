import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { RequestStudent, Student } from '../models/studentModels';
import { EndpointService } from './endpoint.service';
import { SessionStorageService } from './session-storage.service';
import { StudentServiceMinUpdate, StudentServiceTableMeta } from '../models/studentServiceModels';

@Injectable({
  providedIn: 'root',
})
export class StudentService implements OnDestroy {
  public students$ = new BehaviorSubject<Student[]>([]);

  private baseEndpoint = '';
  private unsubscribe = new Subject<void>();

  constructor(
    private http: HttpClient,
    private endpointService: EndpointService,
    private sessionStorageService: SessionStorageService
  ) {
    this.baseEndpoint = endpointService.getStudentEndpoint();
  }

  public getStudent(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseEndpoint}/${studentId}`);
  }

  public getStudents(companyId: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.baseEndpoint}/company/${companyId}`
    );
  }

  public createStudent(student: RequestStudent): Observable<RequestStudent> {
    return this.http.post<RequestStudent>(`${this.baseEndpoint}`, student);
  }

  public updateStudent(
    id: string,
    student: RequestStudent
  ): Observable<RequestStudent> {
    return this.http.put<RequestStudent>(`${this.baseEndpoint}/${id}`, student);
  }

  public deleteStudent(id: string): Observable<RequestStudent> {
    return this.http.delete<RequestStudent>(`${this.baseEndpoint}/${id}`);
  }

  public refreshStudentsList() {
    const companyId = this.sessionStorageService.getCompanyId();
    if (companyId) {
      this.getStudents(companyId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((students) => this.students$.next(students));
    }
  }

  public updateStudentServices(
    studentId: string,
    data: StudentServiceTableMeta[]
  ): Observable<Student> {
    return this.http.put<Student>(
      `${this.baseEndpoint}/${studentId}/services`,
      data
    );
  }

  public updateStudentMinutes(data: any[]): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseEndpoint}/minuteUpdate`,data);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
