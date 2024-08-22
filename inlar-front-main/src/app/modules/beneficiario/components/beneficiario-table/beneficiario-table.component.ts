import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BeneficiarioEvent } from 'src/app/models/enums/beneficiario/BeneficiarioEvent';
import { DeleteBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/DeleteBeneficiarioAction';
import { EditBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/EditBeneficiarioAction';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';

@Component({
  selector: 'app-beneficiario-table',
  templateUrl: './beneficiario-table.component.html',
  styleUrls: []
})
export class BeneficiarioTableComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() public beneficiario: Array<GetBeneficiarioResponse> = [];
  @Output() public BeneficiarioEvent = new EventEmitter<EditBeneficiarioAction>();
  @Output() public deleteBeneficiarioEvent =
    new EventEmitter<DeleteBeneficiarioAction>();
  public beneficiarioSelected!: GetBeneficiarioResponse;
  public addBeneficiarioAction = BeneficiarioEvent.ADD_BENEFICIARIO_ACTION;
  public EditBeneficiarioAction = BeneficiarioEvent.EDIT_BENEFICIARIO_ACTION;

  handleDeleteBeneficiarioEvent(beneficiario_id: string, beneficiarioName: string): void {
    if (beneficiario_id !== '' && beneficiarioName !== '') {
      this.deleteBeneficiarioEvent.emit({ beneficiario_id, beneficiarioName });
    }
  }

  handleBeneficiarioEvent(
    action: string,
    id?: string,
    beneficiarioName?: string
  ): void {
    if (action && action !== '') {
      this.BeneficiarioEvent.emit({ action, id, beneficiarioName });
    }
  }
}


