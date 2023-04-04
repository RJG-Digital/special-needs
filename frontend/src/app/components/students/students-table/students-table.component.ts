import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/models/studentModels';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  @Input() students: Student[];

  @Output() onStudentEdit = new EventEmitter<Student | null>();
  @Output() onGetDetails = new EventEmitter<Student>();
  @Output() onDelete = new EventEmitter<string>();

  public displayedColumns: string[] = [
    'name',
    'teacher',
    'grade',
    'homeroomNumber',
    'actions',
  ];

  public delete(id: string) {
    this.onDelete.emit(id);
  }

  public getDetails(s: Student) {
    this.onGetDetails.emit(s);
  }

  public studentEdit(student = null) {
    this.onStudentEdit.emit(student);
  }
}
