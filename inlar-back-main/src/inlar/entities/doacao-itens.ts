import { Beneficiario } from "./beneficiario";
import { Doacao } from "./doacao";
import { Doador } from "./doador";
import { TipoDoacao } from "./tipoDoacao";
import { Usuario } from "./usuario";

interface Props {
    idDoacaoItem?: number;
    idDoador?: number;
    idTipoDoacao?: number;
    numItems?: number;
    descricao?: string;
    quantidade?: number;
    valor?: number;
    dataCadastro?: Date;
    doacao?: Doacao
    tipoDoacao?: TipoDoacao
}

export class DoacaoItem {
    private idDoacaoItem?: number
    private idDoador?: number
    private idTipoDoacao?: number
    private numItems?: number
    private descricao?: string
    private quantidade?: number
    private valor?: number
    private dataCadastro?: Date
    private doacao?: Doacao
    private tipoDoacao?: TipoDoacao

    constructor(props: Props = {}) {
        this.idDoacaoItem = props.idDoacaoItem;
        this.idDoador = props.idDoador;
        this.idTipoDoacao = props.idTipoDoacao;
        this.numItems = props.numItems;
        this.descricao = props.descricao;
        this.quantidade = props.quantidade;
        this.valor = props.valor;
        this.dataCadastro = props.dataCadastro;
        this.doacao = props.doacao;
        this.tipoDoacao = props.tipoDoacao;
    }

    getIdDoacaoItem(): number {
        return this.idDoacaoItem;
    }

    getIdDoador(): number {
        return this.idDoador;
    }

    getIdTipoDoacao(): number {
        return this.idTipoDoacao;
    }

    getNumItems(): number {
        return this.numItems;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getQuantidade(): number {
        return this.quantidade;
    }

    getValor(): number {
        return this.valor;
    }

    getDataCadastro(): Date {
        return this.dataCadastro;
    }

    getDoacao(): Doacao {
        return this.doacao;
    }

    getTipoDoacao(): TipoDoacao {
        return this.tipoDoacao;
    }

    setIdDoacaoItem(idDoacaoItem: number) {
        this.idDoacaoItem = idDoacaoItem;
    }

    setIdDoador(idDoador: number) {
        this.idDoador = idDoador;
    }

    setIdTipoDoacao(idTipoDoacao: number) {
        this.idTipoDoacao = idTipoDoacao;
    }

    setNumItems(numItems: number) {
        this.numItems = numItems;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    setQuantidade(quantidade: number) {
        this.quantidade = quantidade;
    }

    setValor(valor: number) {
        this.valor = valor;
    }

    setDataCadastro(dataCadastro: Date) {
        this.dataCadastro = dataCadastro;
    }

    setDoacao(doacao: Doacao) {
        this.doacao = doacao;
    }

    setTipoDoacao(tipoDoacao: TipoDoacao) {
        this.tipoDoacao = tipoDoacao;
    }
}