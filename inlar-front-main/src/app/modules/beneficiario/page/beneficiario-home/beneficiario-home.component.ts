import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/DeleteBeneficiarioAction';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BeneficiarioFormComponent } from '../../components/beneficiario-form/beneficiario-form.component';





@Component({
  selector: 'app-beneficiario-home',
  templateUrl: './beneficiario-home.component.html',
  styleUrls: []
})
export class BeneficiarioHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public beneficiarioDatas: Array<GetBeneficiarioResponse> = [];

  constructor(
    private beneficiarioService: BeneficiarioService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBeneficiario();
  }

  getAllBeneficiario() {
    this.beneficiarioService['getAllBeneficiario']()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetBeneficiarioResponse[]) => {
          if (response.length > 0) {
            this.beneficiarioDatas = response;
          }
        },
        //Rota para quando dar algum erro na busca das informações
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os Beneficiario!',
            life: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleDeleteBeneficiarioAction(event: DeleteBeneficiarioAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do beneficiario: ${event?.beneficiarioName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteBeneficiario(event?.beneficiario_id),
      });
    }
  }

  deleteBeneficiario(beneficiario_id: string): void {
    if (beneficiario_id) {
      this.beneficiarioService['deleteBeneficiario']({ beneficiario_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            this.getAllBeneficiario();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria removida com sucesso!',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.getAllBeneficiario();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover beneficiario!',
              life: 3000,
            });
          },
        });
    }
  }

  handleBeneficiarioAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(BeneficiarioFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });
  
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllBeneficiario(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
