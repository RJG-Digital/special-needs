import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Company } from 'src/app/models/companyModels';
import { Student } from 'src/app/models/studentModels';
import { CompanyService } from 'src/app/services/company.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {

  public navLinks = [
    { label: 'Overview', path: '/students/overview' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  private unsubscribe = new Subject<void>();

  constructor(
    private studentService: StudentService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.company$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((company: Company) => {
        if(company && company._id) {
          this.studentService.getStudents(company._id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((students: Student[]) => {
            this.studentService.students$.next(students);
          })
        }  
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
