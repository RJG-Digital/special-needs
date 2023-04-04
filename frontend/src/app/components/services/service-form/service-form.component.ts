import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { RequestCompanyService } from 'src/app/models/companyServiceModels';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent implements OnInit, OnDestroy {
  @Output() onClose = new EventEmitter();
  public companyServiceForm: FormGroup;
  public colorOptions: string[];

  get name() {
    return this.companyServiceForm.get('name');
  }
  get color() {
    return this.companyServiceForm.get('color');
  }
  get description() {
    return this.companyServiceForm.get('description');
  }

  constructor(
    private fb: FormBuilder,
    private companyServiceService: CompanyServiceService,
    private notificationService: NotificationService
  ) {}

  private createCompanyServiceForm() {
    this.companyServiceForm = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.colorOptions = this.companyServiceService.companyServiceColorOptions;
    this.createCompanyServiceForm();
  }

  public onSubmit() {
    const service: RequestCompanyService = {
      name: this.name?.value,
      color: this.color?.value,
      description: this.description?.value,
    };
    this.companyServiceService
      .createService(service)
      .pipe(take(1))
      .subscribe((s) => {
        if (s) {
          this.companyServiceService.refreshCompanyServiceList();
          this.notificationService.success('Service Saved Successfully!');
          this.close();
        }
      });
  }

  public close() {
    this.companyServiceForm.reset();
    this.onClose.emit();
  }

  ngOnDestroy(): void {}
}
