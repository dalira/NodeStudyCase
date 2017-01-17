import * as mongoose from "mongoose";
import {ValidationError} from "../errors/ValidationError";

export class IdentificacaoValidator {

    static assert(valor : string): Promise<string> {
        return new Promise((resolve: (id: string) => void, reject: (err: ValidationError) => void) => {
            if (mongoose.Types.ObjectId.isValid(valor)) {
                resolve(valor);
            }else{
                reject(new ValidationError(`O valor ${valor} não é um identificador válido`));
            }
        })
    };

}