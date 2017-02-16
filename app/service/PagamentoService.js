"use strict";
var PagamentoDAO_1 = require("../persistence/PagamentoDAO");
var StatusPagamento_1 = require("../models/StatusPagamento");
var QueryRestriction_1 = require("../utils/query/QueryRestriction");
var PagamentoService = (function () {
    function PagamentoService() {
        this.dao = new PagamentoDAO_1.PagamentoDAO();
    }
    PagamentoService.prototype.registrarPagamento = function (pagamento) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            pagamento.status = StatusPagamento_1.StatusPagamento.Pendente;
            _this.dao.insereERecupera(pagamento)
                .then(resolve)
                .catch(reject);
        });
    };
    PagamentoService.prototype.obterPagamentoById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dao.buscarPorId(id)
                .then(resolve)
                .catch(reject);
        });
    };
    PagamentoService.prototype.countPagamentos = function (restrictions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (_a = _this.dao).count.apply(_a, QueryRestriction_1.QueryInterpreter.parse(restrictions)).then(resolve)
                .catch(reject);
            var _a;
        });
    };
    PagamentoService.prototype.obterPagamentos = function (restrictions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (_a = _this.dao).buscar.apply(_a, QueryRestriction_1.QueryInterpreter.parse(restrictions)).then(resolve)
                .catch(reject);
            var _a;
        });
    };
    PagamentoService.prototype.obterStreamPagamentos = function (restrictions) {
        return (_a = this.dao).stream.apply(_a, QueryRestriction_1.QueryInterpreter.parse(restrictions));
        var _a;
    };
    return PagamentoService;
}());
exports.PagamentoService = PagamentoService;
//# sourceMappingURL=PagamentoService.js.map