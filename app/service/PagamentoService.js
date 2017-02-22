"use strict";
var PagamentoDAO_1 = require("../persistence/PagamentoDAO");
var StatusPagamento_1 = require("../models/StatusPagamento");
var QueryRestriction_1 = require("../utils/query/QueryRestriction");
var PagamentoService = (function () {
    function PagamentoService() {
    }
    PagamentoService.prototype.registrarPagamento = function (pagamento) {
        return new Promise(function (resolve, reject) {
            pagamento.status = StatusPagamento_1.StatusPagamento.Pendente;
            PagamentoDAO_1.default.insereERecupera(pagamento)
                .then(resolve)
                .catch(reject);
        });
    };
    PagamentoService.prototype.obterPagamentoById = function (id) {
        return new Promise(function (resolve, reject) {
            PagamentoDAO_1.default.buscarPorId(id)
                .then(resolve)
                .catch(reject);
        });
    };
    PagamentoService.prototype.countPagamentos = function (restrictions) {
        return new Promise(function (resolve, reject) {
            PagamentoDAO_1.default.count.apply(PagamentoDAO_1.default, QueryRestriction_1.QueryInterpreter.parse(restrictions)).then(resolve)
                .catch(reject);
        });
    };
    PagamentoService.prototype.obterPagamentos = function (restrictions) {
        return new Promise(function (resolve, reject) {
            PagamentoDAO_1.default.buscar.apply(PagamentoDAO_1.default, QueryRestriction_1.QueryInterpreter.parse(restrictions)).then(resolve)
                .catch(reject);
        });
    };
    return PagamentoService;
}());
var pagamentoService = new PagamentoService();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pagamentoService;
//# sourceMappingURL=PagamentoService.js.map