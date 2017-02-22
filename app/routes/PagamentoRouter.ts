import {Router, Request, Response, NextFunction} from "express";
import pagamentoService from "../service/PagamentoService";
import {PagamentoValidator} from "../validation/PagamentoValidator";
import {ValidationError} from "joi";
import {IdentificacaoValidator} from "../validation/IdentificacaoValidator";
import {Pagamento} from "../models/Pagamento";
import {Page} from "../utils/pagination/Page";
import Paginator from "../utils/pagination/Paginator";

class PagamentoRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        this.router.route("/pagamentos")
            .get(this.obterPagamentos.bind(this))
            .post(this.registrarPagamento.bind(this));

        this.router.route("/pagamentos/:id")
            .get(this.obterPagamentoById.bind(this));
    }

    private obterPagamentos(req: Request, res: Response, next: NextFunction): void {
        Paginator.buildPage<Pagamento>(req.query, PagamentoValidator.assertQuery,
            pagamentoService.obterPagamentos, pagamentoService.countPagamentos)
            .then((page: Page<Pagamento>) => Paginator.setPageResponse(req, res, page))
            .catch((err) => next(err));
    }

    private obterPagamentoById(req: Request, res: Response, next: NextFunction): void {
        IdentificacaoValidator.assert(req.params["id"])
            .then((id: string) => pagamentoService.obterPagamentoById(id))
            .then((pagamento: Pagamento) => res.json(pagamento))
            .catch((err) => {
                if (err.name === "ValidationError") {
                    return res.status(400).json(err.message)
                }
                return next(err);
            });
    }

    private registrarPagamento(req: Request, res: Response, next: NextFunction): void {

        PagamentoValidator.assertEntrance(req.body)
            .then((pagamento) => pagamentoService.registrarPagamento(pagamento))
            .then((pagamentoCriado) => res.json(pagamentoCriado).status(201))
            .catch((err: Error) => {
                if (err.name === "ValidationError") {
                    return res.status(400).json(err.message)
                }
                return next(err);
            });
    }
}

let pagamentoRouter: PagamentoRouter = new PagamentoRouter();
const router = pagamentoRouter.router;
export default router;
