import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { DoadorService } from 'src/app/services/doador/doador.service';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';
import { EditDoadorAction } from 'src/app/models/interfaces/doador/event/EditDoadorAction';

@Component({
  selector: 'app-doador-form',
  templateUrl: './doador-form.component.html',
  styleUrls: []
})
export class DoadorFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public doadorForm: FormGroup;
  public isEditing = false; // Flag para verificar se está editando um doador existente

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doadorService: DoadorService
  ) {
    this.doadorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoPessoa: ['F', Validators.required], // Valor padrão 'F' para pessoa física
      cpf: [''],
      cnpj: [''],
      contato1: [''],
      contato2: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      siglaEstado: [''],
      observacoes: [''],
      ativo: [true] // Valor padrão 'true' para ativo
    });
  }

  ngOnInit(): void {
    const doadorData = this.ref.data;

    if (doadorData) {
      this.isEditing = !!doadorData.id; // Verifica se há um ID para determinar se é edição
      this.populateForm(doadorData);
    }
  }

  handleSubmit(): void {
    if (this.doadorForm.valid) {
      const formData = this.doadorForm.value;

      if (this.isEditing) {
        this.editDoador(formData);
      } else {
        this.addDoador(formData);
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private addDoador(formData: any): void {
    this.doadorService['createDoador'](formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.handleSuccessMessage('Doador criado com sucesso!');
      },
      error: () => {
        this.handleErrorMessage('Erro ao criar doador!');
      }
    });
  }

  private editDoador(formData: any): void {
    const editAction: EditDoadorAction = {
      action: 'edit',
      id: formData.id, // Supondo que o ID seja parte do formulário ou seja recuperado de outra forma
      doadorName: formData.nome // Ajuste conforme necessário para capturar o nome do doador
    };

    this.doadorService['editDoador'](editAction).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.handleSuccessMessage('Doador editado com sucesso!');
      },
      error: () => {
        this.handleErrorMessage('Erro ao editar doador!');
      }
    });
  }

  private populateForm(doadorData: GetDoadorResponse): void {
    this.doadorForm.patchValue({
      nome: doadorData.nome,
      cpf: doadorData.cpf,
      cnpj: doadorData.cnpj,
      contato1: doadorData.contato1,
      contato2: doadorData.contato2,
      cep: doadorData.cep,
      logradouro: doadorData.logradouro,
      numero: doadorData.numero,
      complemento: doadorData.complemento,
      bairro: doadorData.bairro,
      cidade: doadorData.cidade,
      siglaEstado: doadorData.siglaEstado,
      observacoes: doadorData.observacoes,
      ativo: doadorData.ativo
    });
  }

  private handleSuccessMessage(detail: string): void {
    this.doadorForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detail,
      life: 3000
    });
  }

  private handleErrorMessage(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detail,
      life: 3000
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
