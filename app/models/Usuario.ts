import {Document} from "mongoose";
import {Pessoa} from "./Pessoa";

export interface Usuario extends Document {

    login : string;
    senha : string;
    pessoa: Pessoa;

    verifySenha(password: String, callback : Function) : boolean;

}