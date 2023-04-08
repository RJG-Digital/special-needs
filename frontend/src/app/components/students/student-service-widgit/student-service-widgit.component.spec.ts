import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentServiceWidgitComponent } from './student-service-widgit.component';

describe('StudentServiceWidgitComponent', () => {
  let component: StudentServiceWidgitComponent;
  let fixture: ComponentFixture<StudentServiceWidgitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentServiceWidgitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentServiceWidgitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
