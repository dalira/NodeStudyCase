import {Router, Request, Response, NextFunction} from "express";
import {PagamentoService} from "../service/PagamentoService";
import {PagamentoValidator} from "../validation/PagamentoValidator";
import {ValidationError} from "joi";
import {IdentificacaoValidator} from "../validation/IdentificacaoValidator";
import {Pagamento} from "../models/Pagamento";
import {RestQueryInterpreter} from "../utils/rest/RestQueryInterpreter";
import {Page} from "../utils/pagination/Page";
import {RestQuery} from "../utils/rest/RestQuery";
import Paginator from "../utils/pagination/Paginator";
import {Stream} from "stream";

class PagamentoRouter {

    router: Router;
    service: PagamentoService;

    constructor() {
        this.router = Router();
        this.service = new PagamentoService();
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

        let page: Page<Pagamento> = new Page<Pagamento>();

        RestQueryInterpreter.parse(req.query) //Interpresta a query
            .then((restQuery: RestQuery) => {

                //Armazena os valores de limit e offset para paginação
                page.offset = restQuery.offset.value;
                page.limit = restQuery.limit.value;

                return PagamentoValidator.assertQuery(restQuery); //Valida campos da query
            })
            .then((restQuery: RestQuery) =>
                Promise.all<Stream, number>(
                    [
                        this.service.obterStreamPagamentos([...restQuery.restrictions, restQuery.limit, restQuery.offset]), //Obtem os pagamentos,
                        this.service.countPagamentos(restQuery.restrictions) //Conta os pagamentos
                    ]
                )
            )
            .then((values: any[]) => {
                values[0].pipe(res);
                page.totalCount = values[1];
                return page;
            })
            .then((page: Page<Pagamento>) => Paginator.buildPaginatedResponse(req, res, page))
            .catch((err) => next(err));
    }

    private obterPagamentoById(req: Request, res: Response, next: NextFunction): void {
        IdentificacaoValidator.assert(req.params["id"])
            .then((id: string) => this.service.obterPagamentoById(id))
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
            .then((pagamento) => this.service.registrarPagamento(pagamento))
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
