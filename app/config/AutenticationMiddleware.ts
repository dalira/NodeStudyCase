import {Strategy, ExtractJwt, StrategyOptions, VerifiedCallback} from "passport-jwt";
import * as passport from "passport";
import {AuthenticateOptions} from "passport";
import Env from "../utils/env/Env";
import {Handler} from "express-serve-static-core";
import UsuarioService from "../service/UsuarioService";

class AutenticationMiddleware {

    private _opts: StrategyOptions;
    private _authOptions: AuthenticateOptions;

    constructor() {

        this._opts = {
            secretOrKey: Env.AUTH_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        };

        passport.use(new Strategy(this._opts, (payload: any, done: VerifiedCallback) => {
            UsuarioService
                .obterUsuarioByLogin(payload.login)
                .then((usuario) => {
                    if (usuario) {
                        done(null, usuario);
                    } else {
                        done(null, false);
                    }
                })
                .catch((err) => done(err, null));
        }));
    }

    public initialize(): Handler {
        return passport.initialize();
    }

    public interceptRequest(): Handler {
        return passport.authenticate('jwt', {session: false});
    }

}

const auth: AutenticationMiddleware = new AutenticationMiddleware();
export default auth;
