"use strict";
var StatusPagamento;
(function (StatusPagamento) {
    StatusPagamento[StatusPagamento["Pendente"] = 0] = "Pendente";
    StatusPagamento[StatusPagamento["Processando"] = 1] = "Processando";
    StatusPagamento[StatusPagamento["Pago"] = 2] = "Pago";
})(StatusPagamento = exports.StatusPagamento || (exports.StatusPagamento = {}));
var StatusPagamentoHelper = (function () {
    function StatusPagamentoHelper() {
    }
    StatusPagamentoHelper.getAllValues = function () {
        return [StatusPagamento.Pendente, StatusPagamento.Processando, StatusPagamento.Pago];
    };
    return StatusPagamentoHelper;
}());
exports.StatusPagamentoHelper = StatusPagamentoHelper;
//# sourceMappingURL=StatusPagamento.js.map