import * as joi from "joi";
import {ObjectSchema} from "joi";
import {ValidationError} from "../errors/ValidationError";
import {Usuario} from "../models/Usuario";

class UsuarioValidator {

    assertEntrance(valor): Promise<Usuario> {
        return new Promise((resolve: (usuario: Usuario) => void, reject: (err: ValidationError) => void) => {

            let schema: ObjectSchema = joi.object().options({
                presence: 'required',
                abortEarly: false,
                stripUnknown: true
            }).keys({
                login: joi.string().alphanum().min(5).max(20),
                senha: joi.string().min(5).max(20)
            });

            joi.validate(valor, schema, (err, usuario) => {
                if (err) return reject(new ValidationError(err.message));

                resolve(usuario);
            });
        })
    };
}

const usuarioValidator: UsuarioValidator = new UsuarioValidator();
export default usuarioValidator;

