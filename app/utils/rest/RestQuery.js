"use strict";
var RestQuery = (function () {
    function RestQuery(restrictions, limit, offset) {
        this._restrictions = restrictions;
        this._limit = limit;
        this._offset = offset;
    }
    Object.defineProperty(RestQuery.prototype, "restrictions", {
        get: function () {
            return this._restrictions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestQuery.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestQuery.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    return RestQuery;
}());
exports.RestQuery = RestQuery;
//# sourceMappingURL=RestQuery.js.map