import {Router, Request, Response, NextFunction} from "express";
import AuthValidator from "../validation/AuthValidator";
import UsuarioService from "../service/UsuarioService";
import * as jwt from "jwt-simple";
import {Usuario} from "../models/Usuario";
import Env from "../utils/env/Env";

class AuthenticationRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        this.router.post("/auth", this.auth.bind(this));
    }

    private auth(req: Request, res: Response, next: NextFunction): void {

        AuthValidator.assertEntrance(req.body)
            .then(UsuarioService.autenticar)
            .then((usuarioAutenticado: Usuario) => {

                let payload = {
                    login: usuarioAutenticado.login,
                    exp: Date.now() + (1000 * 60 * 60) //Validade: 1 Hora
                };

                res.json(200, {
                    token: jwt.encode(payload, Env.AUTH_SECRET)
                });
            })
            .catch((err: Error) => {
                if (err.name = "AuthenticationError") {
                    return res.sendStatus(401);
                }
                return next(err);
            })
    }
}

let authenticationRouter: AuthenticationRouter = new AuthenticationRouter();
const router = authenticationRouter.router;
export default router;

