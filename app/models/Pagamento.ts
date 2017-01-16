import {StatusPagamento} from "./StatusPagamento";
import * as joi from "joi";

export class Pagamento {
    id: number;
    status: StatusPagamento;
    dataCriacao: Date;
    valor: number;

    constructor(status: StatusPagamento, dataCriacao: Date, valor: number, id?: number) {
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.valor = valor;
    }
}