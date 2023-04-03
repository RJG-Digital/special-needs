import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseCompanyService } from 'src/app/models/companyServiceModels';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent {
  @Input() companyServices: ResponseCompanyService[] = [];
  @Output() onColorEdit = new EventEmitter<ResponseCompanyService | null>();
  public displayedColumns: string[] = ['name', 'color', 'description', 'actions'];

  public colorEdit(companyService = null) {
    this.onColorEdit.emit(companyService);
  }
}
