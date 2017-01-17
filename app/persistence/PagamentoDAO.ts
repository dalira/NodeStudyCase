import * as mongoose from "mongoose";
import {Schema, SchemaDefinition, Model, SchemaOptions, DocumentQuery} from "mongoose";
import {Promise} from "es6-promise";
import {Pagamento} from "../models/Pagamento";
import {QueryRestriction} from "../utils/query/QueryRestriction";
import {QueryRestrictionParser} from "../utils/query/QueryRestrictionParser";
import {StatusPagamento} from "../models/StatusPagamento";

let schemaDefinition: SchemaDefinition = {
    status: {
        type: String,
        enum: StatusPagamento.values()
    },
    dataCriacao: {
        type: Date,
    },
    valor: {
        type: Number,
        min: 0
    }
};

let options: SchemaOptions = {
    versionKey: false
};

let schema: Schema = new Schema(schemaDefinition, options);
let model: Model<Pagamento> = mongoose.model<Pagamento>('Pagamento', schema);

export class PagamentoDAO {

    insereERecupera(pagamento: Pagamento): Promise<Pagamento> {
        return new Promise((resolve: (registro: Pagamento) => void, reject: (error: Error) => void) => {

            model.create(pagamento)
                .then((newPagamento: Pagamento) => {
                    resolve(newPagamento);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    buscarPorId(id: string): Promise<Pagamento> {
        return new Promise((resolve: (registro: Pagamento) => void, reject: (error: Error) => void) => {
            model.findById(id)
                .then(resolve)
                .catch(reject)
        });
    }

    buscar(...queryRestrictions: QueryRestriction<Pagamento>[]): Promise<Pagamento[]> {
        return new Promise((resolve: (pagamentos: Pagamento[]) => void, reject: (error: Error) => void) => {

            let query: DocumentQuery<Pagamento[], Pagamento> = model.find();

            if (queryRestrictions && queryRestrictions.length) {
                new QueryRestrictionParser<Pagamento>(query).parse(queryRestrictions);
            }

            query.exec()
                .then(pagamentos => resolve(pagamentos))
                .catch((err) => reject(err));
        });
    }

    count(...queryRestrictions: QueryRestriction<Pagamento>[]): Promise<number> {
        return new Promise((resolve: (count: number) => void, reject: (error: Error) => void) => {

            let query: DocumentQuery<Pagamento[], Pagamento> = model.find();

            if (queryRestrictions && queryRestrictions.length) {
                new QueryRestrictionParser<Pagamento>(query).parse(queryRestrictions);
            }

            query
                .count()
                .exec()
                .then(pagamentos => resolve(pagamentos))
                .catch((err) => reject(err));
        });
    }
}