import * as express from "express";
import {MainRouter} from './routes/MainRouter';
import {MiddlewareConfigurator} from "./config/MiddlewareConfigurator";
import {ValidationError} from "./errors/ValidationError";
import {ConnectionFactory} from "./config/ConnectionFactory";

/**
 * Cria e configura o servidor express
 */
export class App {

    public app: express.Application;

    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        this.startDataBase();

        this.configureMiddleware();

        this.prepareRoutes();

        this.prepareLastErrorHandler();

        this.app.listen(3000, function () {
            console.log('Checando sistemas!');
        });
    }

    private prepareRoutes() {
        new MainRouter(this.app);
    }

    private configureMiddleware() {
        new MiddlewareConfigurator(this.app);
    }

    private prepareLastErrorHandler() {
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) : void => {
            console.log(err);

            if (err.name === ValidationError.prototype.name) {
                res.status(400).send(err.message);
            }else{
                res.sendStatus(500);
            }
        });
    }

    private startDataBase() {
        new ConnectionFactory("mongodb://localhost/payfast").startConnection();
    }
}
