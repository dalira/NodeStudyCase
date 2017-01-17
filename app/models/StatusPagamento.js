"use strict";
var StatusPagamento;
(function (StatusPagamento) {
    StatusPagamento[StatusPagamento["Pendente"] = 0] = "Pendente";
    StatusPagamento[StatusPagamento["Processando"] = 1] = "Processando";
    StatusPagamento[StatusPagamento["Pago"] = 2] = "Pago";
})(StatusPagamento = exports.StatusPagamento || (exports.StatusPagamento = {}));
(function (StatusPagamento) {
    function values() {
        return [StatusPagamento.Pendente, StatusPagamento.Processando, StatusPagamento.Pago];
    }
    StatusPagamento.values = values;
})(StatusPagamento = exports.StatusPagamento || (exports.StatusPagamento = {}));
//# sourceMappingURL=StatusPagamento.js.map