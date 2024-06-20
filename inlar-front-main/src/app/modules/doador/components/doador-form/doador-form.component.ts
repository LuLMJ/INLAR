import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoadorService } from 'src/app/services/doador/doador.service';
import { GetDoadorResponse } from 'src/app/models/interfaces/doador/responses/GetDoadorResponse';
import { EditDoadorAction } from 'src/app/models/interfaces/doador/event/EditDoadorAction';
import { isValid as isValidCNPJ } from '@fnando/cnpj';
import { isValid as isValidCPF } from '@fnando/cpf';

@Component({
  selector: 'app-doador-form',
  templateUrl: './doador-form.component.html',
  styleUrls: []
})
export class DoadorFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public doadorForm: FormGroup;
  public isEditing = false; 
  public estados: any[]; 
  public tiposPessoa: any[]; 
  public generos: any[]; 

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private doadorService: DoadorService
  ) {
    this.doadorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoPessoa: ['F', Validators.required], 
      cpf: ['', [Validators.required, this.cpfValidator]],
      rg: [''],
      genero: ['', Validators.required],
      dataNascimento: [''],
      cnpj: ['', [Validators.required, this.cnpjValidator]],
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
    const doadorData = this.ref.data;

    if (doadorData) {
      this.isEditing = !!doadorData.id; 
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
      cpf: doadorData.cpf || '',
      rg: doadorData.rg || '',
      genero: doadorData.genero || '',
      dataNascimento: doadorData.dataNascimento || '',
      cnpj: doadorData.cnpj || '',
      razaoSocial: doadorData.razaoSocial || '',
      contato1: doadorData.contato1 || '',
      contato2: doadorData.contato2 || '',
      cep: doadorData.cep || '',
      logradouro: doadorData.logradouro || '',
      numero: doadorData.numero || '',
      complemento: doadorData.complemento || '',
      bairro: doadorData.bairro || '',
      cidade: doadorData.cidade || '',
      siglaEstado: doadorData.siglaEstado || '',
      observacoes: doadorData.observacoes || '',
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

  private cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCNPJ(value.replace(/\D/g, ''))) {
      return { 'invalidCnpj': true };
    }
    return null;
  }

  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !isValidCPF(value.replace(/\D/g, ''))) {
      return { 'invalidCpf': true };
    }
    return null;
  }
}
