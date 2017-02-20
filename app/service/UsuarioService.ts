import UsuarioDAO from "../persistence/UsuarioDAO";
import {Usuario} from "../models/Usuario";
import {AuthenticationError} from "../errors/AuthenticationError";

class UsuarioService {

    public criarUsuario(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve: (usuarioCriado: Usuario) => void, reject: (error: Error) => void) => {
            UsuarioDAO.insereERecupera(usuario)
                .then(resolve)
                .catch(reject);
        });
    }

    public obterUsuarioByLogin(login: string): Promise<Usuario> {
        return new Promise((resolve: (usuario: Usuario) => void, reject: (error: Error) => void) => {
            UsuarioDAO.buscarPorLogin(login)
                .then(resolve)
                .catch(reject);
        });
    }

    public autenticar(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve: (usuario: Usuario) => void, reject: (error: Error) => void) => {
                UsuarioDAO.buscarPorLogin(usuario.login, true)
                    .then((usuarioBase: Usuario) => {
                        usuarioBase.verifySenha(usuario.senha, (err, valid) => {
                            if (err) {
                                reject(err);
                            }

                            if (valid) {
                                resolve(usuarioBase);
                            } else {
                                reject(new AuthenticationError("Usuário/Senha incorretos"));
                            }
                        })
                    })
                    .catch(reject);
            }
        );
    }

}

const usuarioService: UsuarioService = new UsuarioService();
export default usuarioService;