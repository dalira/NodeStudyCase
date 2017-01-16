"use strict";
var QueryRestriction_1 = require("./QueryRestriction");
var QueryRestrictionParser = (function () {
    function QueryRestrictionParser() {
    }
    QueryRestrictionParser.parseToText = function (queryRestrictions) {
        var restrictionQuery = queryRestrictions
            .sort(function (a, b) {
            if (a instanceof QueryRestriction_1.QueryLimit) {
                return -11;
            }
            else if (a instanceof QueryRestriction_1.QueryOffset) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .map(function (restriction) { return restriction.toDataBaseRestriction(); })
            .reduce(function (previousValue, currentValue) { return previousValue.concat(currentValue).concat(" "); }, " ");
        return restrictionQuery;
    };
    return QueryRestrictionParser;
}());
exports.QueryRestrictionParser = QueryRestrictionParser;
//# sourceMappingURL=QueryRestrictionParser.js.map