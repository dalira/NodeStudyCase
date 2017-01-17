import * as joi from "joi";
import {ObjectSchema} from "joi";
import {Pagamento} from "../models/Pagamento";
import {ValidationError} from "../errors/ValidationError";
import {Restriction, FieldRestriction} from "../utils/restriction/Restriction";
import {RestQuery} from "../utils/rest/RestQuery";

export class PagamentoValidator {

    static assertEntrance(valor): Promise<Pagamento> {
        return new Promise((resolve: (pagamento: Pagamento) => void, reject: (err: ValidationError) => void) => {

            let schema: ObjectSchema = joi.object().options({
                presence: 'required',
                abortEarly: false,
                stripUnknown: true
            }).keys({
                dataCriacao: joi.date(),
                valor: joi.number().precision(2).positive()
            });

            joi.validate(valor, schema, (err, pagamento) => {
                if (err) return reject(new ValidationError(err.message));

                resolve(pagamento);
            });
        })
    };

    private static readonly VALID_QUERY_FIELDS: string[] = [
        '_id', 'status', 'dataCriacao', 'valor'
    ];

    static assertQuery(restQuery: RestQuery): Promise<RestQuery> {
        return new Promise((resolve: (restQuery: RestQuery) => void, reject: (err: Error) => void) => {

            restQuery.restrictions.forEach((r: Restriction<any>) => {

                if (r instanceof FieldRestriction) {

                    let field: string = (<FieldRestriction<any>>r).field;

                    if (!this.VALID_QUERY_FIELDS.some((f) => f == field)) {
                        reject(new ValidationError(`${field} não é um campo válido na entidade Pagamento`));
                    }

                }

            });

            resolve(restQuery);
        });
    }

}

