import * as mongoose from "mongoose";
import {StatusPagamento} from "./StatusPagamento";


export interface Pagamento extends mongoose.Document {
    _id: string;
    status: StatusPagamento;
    dataCriacao: Date;
    valor: number;

    new (status: StatusPagamento, dataCriacao: Date, valor: number, id?: string);
}
