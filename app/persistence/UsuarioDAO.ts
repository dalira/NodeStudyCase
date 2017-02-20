import * as mongoose from "mongoose";
import {Schema, SchemaDefinition, Model, SchemaOptions} from "mongoose";
import {Promise} from "es6-promise";
import {Usuario} from "../models/Usuario";

let schemaDefinition: SchemaDefinition = {
    login: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        minlength: 5,
        maxlength: 20,
        set: function (val) {
            if (this.isNew) {
                return val;
            }else{
                return this.securedField; //Impedir alteração
            }
        }
    },
    senha: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        bcrypt: true,
        select: false
    }
};

let options: SchemaOptions = {
    versionKey: false
};

let schema: Schema = new Schema(schemaDefinition, options);
schema.plugin(require("mongoose-bcrypt"), {rounds: 11});
let model: Model<Usuario> = mongoose.model<Usuario>('Usuario', schema);

class UsuarioDAO {

    insereERecupera(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve: (registro: Usuario) => void, reject: (error: Error) => void) => {

            model.create(usuario)
                .then((newUsuario: Usuario) => {
                    resolve(newUsuario);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    atualiza(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve: (registro: Usuario) => void, reject: (error: Error) => void) => {

            model.findOneAndUpdate({'login': usuario.login}, usuario)
                .then((usuarioAlterado: Usuario) => {
                    resolve(usuarioAlterado);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    buscarPorLogin(login: string, comSenha? : boolean): Promise<Usuario> {
        return new Promise((resolve: (registro: Usuario) => void, reject: (error: Error) => void) => {
            model.findOne({'login': login}, (comSenha ? 'login senha' : 'login'))
                .then(resolve)
                .catch(reject)
        });
    }
}

const usuarioDao: UsuarioDAO = new UsuarioDAO();
export default usuarioDao;