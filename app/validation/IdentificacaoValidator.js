"use strict";
var mongoose = require("mongoose");
var ValidationError_1 = require("../errors/ValidationError");
var IdentificacaoValidator = (function () {
    function IdentificacaoValidator() {
    }
    IdentificacaoValidator.assert = function (valor) {
        return new Promise(function (resolve, reject) {
            if (mongoose.Types.ObjectId.isValid(valor)) {
                resolve(valor);
            }
            else {
                reject(new ValidationError_1.ValidationError("O valor " + valor + " n\u00E3o \u00E9 um identificador v\u00E1lido"));
            }
        });
    };
    ;
    return IdentificacaoValidator;
}());
exports.IdentificacaoValidator = IdentificacaoValidator;
//# sourceMappingURL=IdentificacaoValidator.js.map