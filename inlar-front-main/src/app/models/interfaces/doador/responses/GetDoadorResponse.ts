
export interface GetDoadorResponse {
  id: number;
  nome: string;
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
  rg?: string; 
  genero?: string; 
  dataNascimento?: string; 
  razaoSocial?: string; 
}
