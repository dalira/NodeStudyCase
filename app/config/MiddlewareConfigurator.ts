import {Application} from 'express';
import * as bodyParser from 'body-parser';
import * as compression from "compression";
import * as helmet from "helmet";
import AutenticationMiddleware from "../config/AutenticationMiddleware";

export class MiddlewareConfigurator {

    private app : Application;

    constructor(app : Application) {
        this.app = app;
        this.init();
    }

    private init() : void{
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(AutenticationMiddleware.initialize());
    }

}
