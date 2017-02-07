import {Application, Router} from "express";
import pagamentoRouter from "./PagamentoRouter";
import usuarioRouter from "./UsuarioRouter";
import AutenticationMiddleware from "../config/AutenticationMiddleware";

export class MainRouter {

    private app : Application;

    constructor(app : Application) {
        this.app = app;
        this.init();
    }

    public init() : void {
        //Free
        this.app.use(usuarioRouter);

        //Secure
        this.app.all("*", AutenticationMiddleware.interceptRequest());
        this.app.use(pagamentoRouter);
    }

}
