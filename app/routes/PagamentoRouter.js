"use strict";
var express_1 = require("express");
var PagamentoService_1 = require("../service/PagamentoService");
var PagamentoValidator_1 = require("../validation/PagamentoValidator");
var IdentificacaoValidator_1 = require("../validation/IdentificacaoValidator");
var RestQueryInterpreter_1 = require("../utils/rest/RestQueryInterpreter");
var Page_1 = require("../utils/pagination/Page");
var Env_1 = require("../utils/env/Env");
var url = require("url");
var PagamentoRouter = (function () {
    function PagamentoRouter() {
        this.router = express_1.Router();
        this.service = new PagamentoService_1.PagamentoService();
        this.init();
    }
    ;
    PagamentoRouter.prototype.init = function () {
        this.router.route("/pagamentos")
            .get(this.obterPagamentos.bind(this))
            .post(this.registrarPagamento.bind(this));
        this.router.route("/pagamentos/:id")
            .get(this.obterPagamentoById.bind(this));
    };
    PagamentoRouter.prototype.obterPagamentos = function (req, res, next) {
        var _this = this;
        var page = new Page_1.Page();
        RestQueryInterpreter_1.RestQueryInterpreter.parse(req.query) //Interpresta a query
            .then(function (restQuery) {
            //Armazena os valores de limit e offset para paginação
            page.offset = restQuery.offset.value;
            page.limit = restQuery.limit.value;
            return PagamentoValidator_1.PagamentoValidator.assertQuery(restQuery); //Valida campos da query
        })
            .then(function (restQuery) {
            return Promise.all([
                _this.service.obterPagamentos(restQuery.restrictions.concat([restQuery.limit, restQuery.offset])),
                _this.service.countPagamentos(restQuery.restrictions) //Conta os pagamentos
            ]);
        })
            .then(function (values) {
            page.body = values[0], page.totalCount = values[1];
            return page;
        })
            .then(function (page) {
            var links = {};
            if (page.hasNext()) {
                var nextPageUrl = url.parse(req.originalUrl, true);
                nextPageUrl.search = null;
                nextPageUrl.query._offset = nextPageUrl.query._offset ? nextPageUrl.query._offset++ : 2;
                links['next'] = url.resolve(url.format(Env_1.default.APLICATION_BASE_PATH), url.format(nextPageUrl));
                ;
            }
            if (page.hasPrevious()) {
                var prevPageUrl = url.parse(req.originalUrl, true);
                prevPageUrl.search = null;
                prevPageUrl.query._offset = prevPageUrl.query._offset--;
                links['previous'] = url.resolve(url.format(Env_1.default.APLICATION_BASE_PATH), url.format(prevPageUrl));
            }
            res
                .links(links) //Monta os links
                .json(page.body); //Devolve os pagamentos
        })
            .catch(function (err) { return next(err); });
    };
    PagamentoRouter.prototype.obterPagamentoById = function (req, res, next) {
        var _this = this;
        IdentificacaoValidator_1.IdentificacaoValidator.assert(req.params["id"])
            .then(function (id) { return _this.service.obterPagamentoById(id); })
            .then(function (pagamento) { return res.json(pagamento); })
            .catch(function (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json(err.message);
            }
            return next(err);
        });
    };
    PagamentoRouter.prototype.registrarPagamento = function (req, res, next) {
        var _this = this;
        PagamentoValidator_1.PagamentoValidator.assertEntrance(req.body)
            .then(function (pagamento) { return _this.service.registrarPagamento(pagamento); })
            .then(function (pagamentoCriado) { return res.json(pagamentoCriado).status(201); })
            .catch(function (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json(err.message);
            }
            return next(err);
        });
    };
    return PagamentoRouter;
}());
var pagamentoRouter = new PagamentoRouter();
var router = pagamentoRouter.router;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=PagamentoRouter.js.map