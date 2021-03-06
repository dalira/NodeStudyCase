"use strict";
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var es6_promise_1 = require("es6-promise");
var QueryRestrictionParser_1 = require("../utils/query/QueryRestrictionParser");
var StatusPagamento_1 = require("../models/StatusPagamento");
var schemaDefinition = {
    status: {
        type: String,
        enum: StatusPagamento_1.StatusPagamentoHelper.getAllValues()
    },
    dataCriacao: {
        type: Date,
    },
    valor: {
        type: Number,
        min: 0
    }
};
var options = {
    versionKey: false
};
var schema = new mongoose_1.Schema(schemaDefinition, options);
var model = mongoose.model('Pagamento', schema);
var PagamentoDAO = (function () {
    function PagamentoDAO() {
    }
    PagamentoDAO.prototype.insereERecupera = function (pagamento) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            model.create(pagamento)
                .then(function (newPagamento) {
                resolve(newPagamento);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    PagamentoDAO.prototype.buscarPorId = function (id) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            model.findById(id)
                .then(resolve)
                .catch(reject);
        });
    };
    PagamentoDAO.prototype.buscar = function () {
        var queryRestrictions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queryRestrictions[_i] = arguments[_i];
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            var query = model.find();
            if (queryRestrictions && queryRestrictions.length) {
                new QueryRestrictionParser_1.QueryRestrictionParser(query).parse(queryRestrictions);
            }
            query.exec()
                .then(function (pagamentos) { return resolve(pagamentos); })
                .catch(function (err) { return reject(err); });
        });
    };
    PagamentoDAO.prototype.count = function () {
        var queryRestrictions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queryRestrictions[_i] = arguments[_i];
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            var query = model.find();
            if (queryRestrictions && queryRestrictions.length) {
                new QueryRestrictionParser_1.QueryRestrictionParser(query).parse(queryRestrictions);
            }
            query
                .count()
                .exec()
                .then(function (pagamentos) { return resolve(pagamentos); })
                .catch(function (err) { return reject(err); });
        });
    };
    return PagamentoDAO;
}());
var pagamentoDAO = new PagamentoDAO();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pagamentoDAO;
//# sourceMappingURL=PagamentoDAO.js.map