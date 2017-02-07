import * as joi from "joi";
import {ObjectSchema} from "joi";
import {Pagamento} from "../models/Pagamento";
import {ValidationError} from "../errors/ValidationError";
import {Restriction, FieldRestriction} from "../utils/restriction/Restriction";
import {RestQuery} from "../utils/rest/RestQuery";
import {Usuario} from "../models/Usuario";

class AuthValidator {

    assertEntrance(valor): Promise<Usuario> {
        return new Promise((resolve: (usuario: Usuario) => void, reject: (err: ValidationError) => void) => {

            let schema: ObjectSchema = joi.object().options({
                presence: 'required',
                abortEarly: false,
                stripUnknown: true
            }).keys({
                login: joi.string(),
                senha: joi.string()
            });

            joi.validate(valor, schema, (err, usuario) => {
                if (err) return reject(new ValidationError(err.message));

                resolve(usuario);
            });
        })
    };
}

const authValidator : AuthValidator = new AuthValidator();
export default authValidator;

