import {Application, Router} from "express";
import pagamentoRouter from "./PagamentoRouter";
import usuarioRouter from "./UsuarioRouter";
import autenticationRouter from "./AuthenticationRouter";
import AutenticationMiddleware from "../config/AutenticationMiddleware";

export class MainRouter {

    private app : Application;

    constructor(app : Application) {
        this.app = app;
        this.init();
    }

    public init() : void {
        //Free
        this.app.use(autenticationRouter);

        //Secure
        this.app.all("*", AutenticationMiddleware.interceptRequest());
        this.app.use(usuarioRouter);
        this.app.use(pagamentoRouter);
    }

}
