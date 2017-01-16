"use strict";
var es6_promise_1 = require("es6-promise");
var RowParser_1 = require("../utils/query/RowParser");
var QueryRestrictionParser_1 = require("../utils/query/QueryRestrictionParser");
var PagamentoDAO = (function () {
    function PagamentoDAO(connection) {
        this._connection = connection;
    }
    PagamentoDAO.prototype.insereERecupera = function (registro) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this._connection.query("insert into pagamento set ?", registro, function (err, result) {
                if (err)
                    return reject(err);
                _this.buscarPorId(result.insertId)
                    .then(function (comp) { return resolve(comp); })
                    .catch(function (err) { return reject(err); });
            });
        });
    };
    PagamentoDAO.prototype.buscarPorId = function (id) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this._connection.query("select * from pagamento where id = ?", id, function (err, result) {
                if (err)
                    reject(err);
                if (result.length == 0) {
                    resolve(null);
                }
                resolve(RowParser_1.RowParser.parse(result[0]));
            });
        });
    };
    PagamentoDAO.prototype.buscar = function () {
        var _this = this;
        var queryRestrictions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queryRestrictions[_i] = arguments[_i];
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            var query = "select * from pagamento ";
            if (queryRestrictions && queryRestrictions.length) {
                var whereCommand = " where 1 = 1 ";
                var restrictionsSql = QueryRestrictionParser_1.QueryRestrictionParser.parseToText(queryRestrictions);
                query = query.concat(whereCommand).concat(restrictionsSql);
            }
            _this._connection.query(query, function (err, result) {
                if (err)
                    return reject(err);
                resolve(result.map(function (row) { return RowParser_1.RowParser.parse(row); }));
            });
        });
    };
    PagamentoDAO.prototype.count = function () {
        var _this = this;
        var queryRestrictions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            queryRestrictions[_i] = arguments[_i];
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            var query = "select count(1) count from pagamento ";
            if (queryRestrictions && queryRestrictions.length) {
                var whereCommand = " where 1 = 1 ";
                var restrictionsSql = QueryRestrictionParser_1.QueryRestrictionParser.parseToText(queryRestrictions);
                query = query.concat(whereCommand).concat(restrictionsSql);
            }
            _this._connection.query(query, function (err, result) {
                if (err)
                    return reject(err);
                resolve(result[0]['count']);
            });
        });
    };
    return PagamentoDAO;
}());
exports.PagamentoDAO = PagamentoDAO;
//# sourceMappingURL=PagamentoDAO.js.map