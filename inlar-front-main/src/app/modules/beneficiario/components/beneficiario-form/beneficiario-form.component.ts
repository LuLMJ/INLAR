// beneficiario-form.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { EditBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/EditBeneficiarioAction';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: []
})
export class BeneficiarioFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public beneficiarioForm: FormGroup;
  public isEditing = false; // Flag para verificar se está editando um beneficiário existente

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService
  ) {
    this.beneficiarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoPessoa: ['F', Validators.required], // Valor padrão 'F' para pessoa física
      cpf: [''],
      rg: [''],
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
    const beneficiarioData = this.ref.data;

    if (beneficiarioData) {
      this.isEditing = !!beneficiarioData.idbeneficiario; // Verifica se há um ID para determinar se é edição
      this.populateForm(beneficiarioData);
    }
  }

  handleSubmit(): void {
    if (this.beneficiarioForm.valid) {
      const formData = this.beneficiarioForm.value;

      if (this.isEditing) {
        this.editBeneficiario(formData);
      } else {
        this.addBeneficiario(formData);
      }
    } else {
      this.handleErrorMessage('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  private addBeneficiario(formData: any): void {
    this.beneficiarioService['createBeneficiario'](formData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.handleSuccessMessage('Beneficiário criado com sucesso!');
      },
      error: () => {
        this.handleErrorMessage('Erro ao criar beneficiário!');
      }
    });
  }

  private editBeneficiario(formData: any): void {
    const editAction: EditBeneficiarioAction = {
      action: 'edit',
      id: formData.idbeneficiario, // Supondo que o ID seja parte do formulário ou recuperado de outra forma
      beneficiarioName: formData.nome
    };

    this.beneficiarioService['editBeneficiario'](editAction).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.handleSuccessMessage('Beneficiário editado com sucesso!');
      },
      error: () => {
        this.handleErrorMessage('Erro ao editar beneficiário!');
      }
    });
  }

  private populateForm(beneficiarioData: GetBeneficiarioResponse): void {
    this.beneficiarioForm.patchValue({
      nome: beneficiarioData.nome,
      tipoPessoa: beneficiarioData.tipoPessoa, // Certifique-se de usar o nome correto da propriedade do tipo
      cpf: beneficiarioData.cpf,
      rg: beneficiarioData.rg,
      cnpj: beneficiarioData.cnpj,
      contato1: beneficiarioData.contato1,
      contato2: beneficiarioData.contato2,
      cep: beneficiarioData.cep,
      logradouro: beneficiarioData.logradouro,
      numero: beneficiarioData.numero,
      complemento: beneficiarioData.complemento,
      bairro: beneficiarioData.bairro,
      cidade: beneficiarioData.cidade,
      siglaEstado: beneficiarioData.siglaEstado, // Certifique-se de usar o nome correto da propriedade do tipo
      observacoes: beneficiarioData.observacoes,
      ativo: beneficiarioData.ativo
    });
  }

  private handleSuccessMessage(detail: string): void {
    this.beneficiarioForm.reset();
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
