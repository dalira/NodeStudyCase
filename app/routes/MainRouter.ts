import {Application, Router} from "express";
import PagamentoRouter from "./PagamentoRouter";

export class MainRouter {

    private app : Application;

    constructor(app : Application) {
        this.app = app;
        this.init();
    }

    public init() : void {
        this.app.use(PagamentoRouter);
    }

}
