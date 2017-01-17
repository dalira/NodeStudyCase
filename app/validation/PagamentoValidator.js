"use strict";
var joi = require("joi");
var ValidationError_1 = require("../errors/ValidationError");
var Restriction_1 = require("../utils/restriction/Restriction");
var PagamentoValidator = (function () {
    function PagamentoValidator() {
    }
    PagamentoValidator.assertEntrance = function (valor) {
        return new Promise(function (resolve, reject) {
            var schema = joi.object().options({
                presence: 'required',
                abortEarly: false,
                stripUnknown: true
            }).keys({
                dataCriacao: joi.date(),
                valor: joi.number().precision(2).positive()
            });
            joi.validate(valor, schema, function (err, pagamento) {
                if (err)
                    return reject(new ValidationError_1.ValidationError(err.message));
                resolve(pagamento);
            });
        });
    };
    ;
    PagamentoValidator.assertQuery = function (restQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            restQuery.restrictions.forEach(function (r) {
                if (r instanceof Restriction_1.FieldRestriction) {
                    var field_1 = r.field;
                    if (!_this.VALID_QUERY_FIELDS.some(function (f) { return f == field_1; })) {
                        reject(new ValidationError_1.ValidationError(field_1 + " n\u00E3o \u00E9 um campo v\u00E1lido na entidade Pagamento"));
                    }
                }
            });
            resolve(restQuery);
        });
    };
    return PagamentoValidator;
}());
PagamentoValidator.VALID_QUERY_FIELDS = [
    '_id', 'status', 'dataCriacao', 'valor'
];
exports.PagamentoValidator = PagamentoValidator;
//# sourceMappingURL=PagamentoValidator.js.map