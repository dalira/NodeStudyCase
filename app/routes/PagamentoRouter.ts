import {Router, Request, Response, NextFunction} from "express";
import {ParsedAsJson} from "body-parser";
import {PagamentoService} from "../service/PagamentoService";
import {PagamentoValidator} from "../validation/PagamentoValidator";
import {ValidationError} from "joi";
import {IdentificacaoValidator} from "../validation/IdentificacaoValidator";
import {Pagamento} from "../models/Pagamento";
import {RestQueryInterpreter} from "../utils/rest/RestQueryInterpreter";
import {Page} from "../utils/pagination/Page";
import {RestQuery} from "../utils/rest/RestQuery";
import Env from "../utils/env/Env";
import * as url from "url";

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
                Promise.all<Pagamento[], number>(
                    [
                        this.service.obterPagamentos([...restQuery.restrictions, restQuery.limit, restQuery.offset]), //Obtem os pagamentos,
                        this.service.countPagamentos(restQuery.restrictions) //Conta os pagamentos
                    ]
                )
            )
            .then((values: any[]) => {
                [page.body, page.totalCount] = values;
                return page;
            })
            .then((page: Page<Pagamento>) => {

                let links = {};

                if (page.hasNext()) {
                    let nextPageUrl: url.Url = url.parse(req.originalUrl, true);
                    nextPageUrl.search = null;
                    nextPageUrl.query._offset = nextPageUrl.query._offset ? nextPageUrl.query._offset++ : 2;
                    links['next'] = url.resolve(url.format(Env.APLICATION_BASE_PATH), url.format(nextPageUrl));;
                }

                if (page.hasPrevious()) {
                    let prevPageUrl: url.Url = url.parse(req.originalUrl, true);
                    prevPageUrl.search = null;
                    prevPageUrl.query._offset = prevPageUrl.query._offset--;
                    links['previous'] = url.resolve(url.format(Env.APLICATION_BASE_PATH), url.format(prevPageUrl));
                }

                res
                    .links(links) //Monta os links
                    .json(page.body); //Devolve os pagamentos
            })
            .catch((err) => next(err));
    }

    private obterPagamentoById(req: Request, res: Response, next: NextFunction): void {
        IdentificacaoValidator.assert(req.params["id"])
            .then((id: Number) => this.service.obterPagamentoById(id))
            .then((pagamento: Pagamento) => res.json(pagamento))
            .catch((err) => {
                if (err.name === "ValidationError") {
                    return res.status(400).json(err.message)
                }
                return next(err);
            });
    }

    private registrarPagamento(req: Request & ParsedAsJson, res: Response, next: NextFunction): void {

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
