import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteDoadorAction } from 'src/app/models/interfaces/doador/event/DeleteDoadorAction';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { DoadorService } from 'src/app/services/doador/doador.service';
import { DoadorFormComponent } from '../../components/doador-form/doador-form.component';



@Component({
  selector: 'app-doador-home',
  templateUrl: './doador-home.component.html',
  styleUrls: []
})
export class DoadorHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public doadorDatas: Array<GetDoadorResponse> = [];

  constructor(
    private doadorService: DoadorService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllDoador();
  }

  getAllDoador() {
    this.doadorService['getAllDoador']()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetDoadorResponse[]) => {
          if (response.length > 0) {
            this.doadorDatas = response;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os doador!',
            life: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleDeleteDoadorAction(event: DeleteDoadorAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do Doador: ${event?.doadorName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteDoador(event?.doador_id),
      });
    }
  }

  deleteDoador(doador_id: string): void {
    if (doador_id) {
      this.doadorService['deleteDoador']({ doador_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            this.getAllDoador();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria removida com sucesso!',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.getAllDoador();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover categoria!',
              life: 3000,
            });
          },
        });
    }
  }

  handleDoadorAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(DoadorFormComponent, {
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
        next: () => this.getAllDoador(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
