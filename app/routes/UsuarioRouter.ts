import {Router, Request, Response, NextFunction} from "express";
import usuarioValidator from "../validation/UsuarioValidator";
import usuarioService from "../service/UsuarioService";
import {Usuario} from "../models/Usuario";

class UsuarioRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        this.router.post("/usuarios", this.criarUsuario.bind(this));
    }

    private criarUsuario(req: Request, res: Response, next: NextFunction): void {
        usuarioValidator.assertEntrance(req.body)
            .then(usuarioService.criarUsuario)
            .then((usuarioCriado: Usuario) => {
                res.json(201, usuarioCriado);
            })
            .catch((err: Error) => {
                if (err.name = "ValidationError") {
                    return res.sendStatus(400);
                }
                return next(err);
            })
    }
}

let authenticationRouter: UsuarioRouter = new UsuarioRouter();
const router = authenticationRouter.router;
export default router;

