import * as joi from "joi";
import {Schema} from "joi";
import {ValidationError} from "../errors/ValidationError";

export class IdentificacaoValidator {

    static assert(valor): Promise<Number> {
        return new Promise((resolve: (id: Number) => void, reject: (err: ValidationError) => void) => {

            let schema: Schema = joi.number().precision(0).positive().label("Identificador");

            joi.validate(valor, schema, (err, pagamento) => {
                if (err) return reject(new ValidationError(err.message));

                resolve(pagamento);
            });
        })
    };

}