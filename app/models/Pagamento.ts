import {StatusPagamento} from "./StatusPagamento";
import * as mongoose from "mongoose";

export interface Pagamento extends mongoose.Document {
    _id: string;
    status: StatusPagamento;
    dataCriacao: Date;
    valor: number;

    new (status: StatusPagamento, dataCriacao: Date, valor: number, id?: string);
}
