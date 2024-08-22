import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';
import { GetBeneficiarioResponse } from 'src/app/models/interfaces/beneficiario/responses/GetBeneficiarioResponse';
import { EditBeneficiarioAction } from 'src/app/models/interfaces/beneficiario/event/EditBeneficiarioAction';
import { isValid as isValidCNPJ } from '@fnando/cnpj';
import { isValid as isValidCPF } from '@fnando/cpf';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: []
})
export class BeneficiarioFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public beneficiarioForm: FormGroup;
  public isEditing = false; 
  public estados: any[]; 
  public tiposPessoa: any[]; 
  public generos: any[]; 

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService
  ) {
    this.beneficiarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoPessoa: ['F', Validators.required], 
      cpf: ['', this.cpfValidator],
      rg: [''],
      genero: ['', Validators.required],
      dataNascimento: [''],
      cnpj: ['', this.cnpjValidator],
      razaoSocial: [''], 
      contato1: ['', Validators.required],
      contato2: [''],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      siglaEstado: ['', Validators.required],
      observacoes: [''],
      ativo: [true] 
    });


    this.estados = [
      { label: 'Acre', value: 'AC' },
      { label: 'Alagoas', value: 'AL' },
      { label: 'Amapá', value: 'AP' },
      { label: 'Amazonas', value: 'AM' },
      { label: 'Bahia', value: 'BA' },
      { label: 'Ceará', value: 'CE' },
      { label: 'Distrito Federal', value: 'DF' },
      { label: 'Espírito Santo', value: 'ES' },
      { label: 'Goiás', value: 'GO' },
      { label: 'Maranhão', value: 'MA' },
      { label: 'Mato Grosso', value: 'MT' },
      { label: 'Mato Grosso do Sul', value: 'MS' },
      { label: 'Minas Gerais', value: 'MG' },
      { label: 'Pará', value: 'PA' },
      { label: 'Paraíba', value: 'PB' },
      { label: 'Paraná', value: 'PR' },
      { label: 'Pernambuco', value: 'PE' },
      { label: 'Piauí', value: 'PI' },
      { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Rio Grande do Norte', value: 'RN' },
      { label: 'Rio Grande do Sul', value: 'RS' },
      { label: 'Rondônia', value: 'RO' },
      { label: 'Roraima', value: 'RR' },
      { label: 'Santa Catarina', value: 'SC' },
      { label: 'São Paulo', value: 'SP' },
      { label: 'Sergipe', value: 'SE' },
      { label: 'Tocantins', value: 'TO' }
    ];

    this.tiposPessoa = [
      { label: 'Pessoa Física', value: 'F' },
      { label: 'Pessoa Jurídica', value: 'J' }
    ];

    this.generos = [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' }
    ];
  }

  ngOnInit(): void {
    const beneficiarioData = this.ref.data;

    if (beneficiarioData) {
      this.isEditing = !!beneficiarioData.id; 
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
    this.beneficiarioService['createBeneficiario'](formData).pipe(takeUntil(this.destroy$)).subscribe({
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
      id: formData.id,
      beneficiarioName: formData.nome
    };

    this.beneficiarioService['editBeneficiario'](editAction).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.handleSuccessMessage('Beneficiário editado com sucesso!');
      },
      error: () => {
        this.handleErrorMessage('Erro ao editar beneficiário!');
      }
    });
  }

  private populateForm(beneficiario: GetBeneficiarioResponse): void {
    this.beneficiarioForm.patchValue({
      nome: beneficiario.nome,
      tipoPessoa: beneficiario.tipoPessoa,
      cpf: beneficiario.cpf,
      rg: beneficiario.rg,
      genero: beneficiario.genero,
      dataNascimento: beneficiario.dataNascimento,
      cnpj: beneficiario.cnpj,
      razaoSocial: beneficiario.razaoSocial,
      contato1: beneficiario.contato1,
      contato2: beneficiario.contato2,
      cep: beneficiario.cep,
      logradouro: beneficiario.logradouro,
      numero: beneficiario.numero,
      complemento: beneficiario.complemento,
      bairro: beneficiario.bairro,
      cidade: beneficiario.cidade,
      siglaEstado: beneficiario.siglaEstado,
      observacoes: beneficiario.observacoes,
      ativo: beneficiario.ativo
    });
  }

  private handleSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
  }

  private handleErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCPF(value.replace(/\D/g, ''))) {
      return { 'invalidCpf': true };
    }
    return null;
  }

  cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCNPJ(value.replace(/\D/g, ''))) {
      return { 'invalidCnpj': true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
