"use strict";
var joi = require("joi");
var ValidationError_1 = require("../errors/ValidationError");
var IdentificacaoValidator = (function () {
    function IdentificacaoValidator() {
    }
    IdentificacaoValidator.assert = function (valor) {
        return new Promise(function (resolve, reject) {
            var schema = joi.number().precision(0).positive().label("Identificador");
            joi.validate(valor, schema, function (err, pagamento) {
                if (err)
                    return reject(new ValidationError_1.ValidationError(err.message));
                resolve(pagamento);
            });
        });
    };
    ;
    return IdentificacaoValidator;
}());
exports.IdentificacaoValidator = IdentificacaoValidator;
//# sourceMappingURL=IdentificacaoValidator.js.map