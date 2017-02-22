"use strict";
var express_1 = require("express");
var PagamentoService_1 = require("../service/PagamentoService");
var PagamentoValidator_1 = require("../validation/PagamentoValidator");
var IdentificacaoValidator_1 = require("../validation/IdentificacaoValidator");
var Paginator_1 = require("../utils/pagination/Paginator");
var PagamentoRouter = (function () {
    function PagamentoRouter() {
        this.router = express_1.Router();
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
        Paginator_1.default.buildPage(req.query, PagamentoValidator_1.PagamentoValidator.assertQuery, PagamentoService_1.default.obterPagamentos, PagamentoService_1.default.countPagamentos)
            .then(function (page) { return Paginator_1.default.setPageResponse(req, res, page); })
            .catch(function (err) { return next(err); });
    };
    PagamentoRouter.prototype.obterPagamentoById = function (req, res, next) {
        IdentificacaoValidator_1.IdentificacaoValidator.assert(req.params["id"])
            .then(function (id) { return PagamentoService_1.default.obterPagamentoById(id); })
            .then(function (pagamento) { return res.json(pagamento); })
            .catch(function (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json(err.message);
            }
            return next(err);
        });
    };
    PagamentoRouter.prototype.registrarPagamento = function (req, res, next) {
        PagamentoValidator_1.PagamentoValidator.assertEntrance(req.body)
            .then(function (pagamento) { return PagamentoService_1.default.registrarPagamento(pagamento); })
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