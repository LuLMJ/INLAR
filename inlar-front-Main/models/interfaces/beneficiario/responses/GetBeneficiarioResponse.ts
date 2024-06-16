export interface GetBeneficiarioResponse {
  rg: any;
  id: string;
  nome: string;
  tipoPessoa: string;
  cpf?: string;
  cnpj?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?: string;
  observacoes?: string;
  ativo: boolean;
}
