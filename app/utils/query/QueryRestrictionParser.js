"use strict";
var QueryRestrictionParser = (function () {
    function QueryRestrictionParser(query) {
        this._query = query;
    }
    QueryRestrictionParser.prototype.parse = function (queryRestrictions) {
        var _this = this;
        queryRestrictions.forEach(function (restriction) { return restriction.toDataBaseRestriction(_this._query); });
    };
    return QueryRestrictionParser;
}());
exports.QueryRestrictionParser = QueryRestrictionParser;
//# sourceMappingURL=QueryRestrictionParser.js.map