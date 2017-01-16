"use strict";
var Restriction_1 = require("../restriction/Restriction");
var util_1 = require("util");
var RestQueryOperations_1 = require("./RestQueryOperations");
var RestQuery_1 = require("./RestQuery");
var RestQueryInterpreter = (function () {
    function RestQueryInterpreter() {
    }
    RestQueryInterpreter.parse = function (query) {
        return new Promise(function (resolve, reject) {
            try {
                var restrictions = [];
                var limitQuery = util_1.isUndefined(query['_limit']) ? 10 : Number(query['_limit']);
                delete query['_limit'];
                var offsetQuery = util_1.isUndefined(query['_offset']) ? 1 : Number(query['_offset']);
                delete query['_offset'];
                for (var field in query) {
                    for (var operation in RestQueryOperations_1.default) {
                        if (field.substring(field.length - operation.length) == operation) {
                            restrictions.push(new RestQueryOperations_1.default[operation](field.replace(operation, ""), query[field]));
                            break;
                        }
                    }
                }
                var limit = new Restriction_1.Limit(limitQuery);
                var offset = new Restriction_1.Offset(offsetQuery);
                resolve(new RestQuery_1.RestQuery(restrictions, limit, offset));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return RestQueryInterpreter;
}());
exports.RestQueryInterpreter = RestQueryInterpreter;
//# sourceMappingURL=RestQueryInterpreter.js.map