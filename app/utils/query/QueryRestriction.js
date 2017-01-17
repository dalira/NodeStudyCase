"use strict";
var Restriction_1 = require("../restriction/Restriction");
var QueryInterpreter = (function () {
    function QueryInterpreter() {
    }
    QueryInterpreter.parse = function (restrictions) {
        var queryRestrictions = [];
        for (var i = 0; i < restrictions.length; i++) {
            var restriction = restrictions[i];
            if (restriction instanceof Restriction_1.Equal) {
                queryRestrictions.push(new QueryEqual(restriction));
            }
            else if (restriction instanceof Restriction_1.EndsWith) {
                queryRestrictions.push(new QueryEndsWith(restriction));
            }
            else if (restriction instanceof Restriction_1.StartsWith) {
                queryRestrictions.push(new QueryStartsWith(restriction));
            }
            else if (restriction instanceof Restriction_1.Like) {
                queryRestrictions.push(new QueryLike(restriction));
            }
            else if (restriction instanceof Restriction_1.GreaterThan) {
                queryRestrictions.push(new QueryGreaterThan(restriction));
            }
            else if (restriction instanceof Restriction_1.GreaterOrEqual) {
                queryRestrictions.push(new QueryGreaterOrEqual(restriction));
            }
            else if (restriction instanceof Restriction_1.LowerThan) {
                queryRestrictions.push(new QueryLowerThan(restriction));
            }
            else if (restriction instanceof Restriction_1.LowerOrEqual) {
                queryRestrictions.push(new QueryLowerOrEqual(restriction));
            }
            else if (restriction instanceof Restriction_1.Limit) {
                queryRestrictions.push(new QueryLimit(restriction));
            }
            else if (restriction instanceof Restriction_1.Offset) {
                var limit = restrictions.filter(function (r) { return r instanceof Restriction_1.Limit; }).pop();
                queryRestrictions.push(new QueryOffset(restriction, limit));
            }
        }
        return queryRestrictions;
    };
    return QueryInterpreter;
}());
exports.QueryInterpreter = QueryInterpreter;
var QueryEqual = (function () {
    function QueryEqual(restriction) {
        this._restriction = restriction;
    }
    QueryEqual.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.where(this._restriction.field).equals(this._restriction.value);
    };
    return QueryEqual;
}());
exports.QueryEqual = QueryEqual;
var QueryStartsWith = (function () {
    function QueryStartsWith(restriction) {
        this._restriction = restriction;
    }
    QueryStartsWith.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.$where("function() { return this." + this._restriction.field + ".toString().match(/^" + this._restriction.value + "/) != null; }");
    };
    return QueryStartsWith;
}());
exports.QueryStartsWith = QueryStartsWith;
var QueryEndsWith = (function () {
    function QueryEndsWith(restriction) {
        this._restriction = restriction;
    }
    QueryEndsWith.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.$where("function() { return this." + this._restriction.field + ".toString().match(/" + this._restriction.value + "$/) != null; }");
    };
    return QueryEndsWith;
}());
exports.QueryEndsWith = QueryEndsWith;
var QueryLike = (function () {
    function QueryLike(restriction) {
        this._restriction = restriction;
    }
    QueryLike.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.$where("function() { return this." + this._restriction.field + ".toString().match(/" + this._restriction.value + "/) != null; }");
    };
    return QueryLike;
}());
exports.QueryLike = QueryLike;
var QueryGreaterThan = (function () {
    function QueryGreaterThan(restriction) {
        this._restriction = restriction;
    }
    QueryGreaterThan.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.gt(this._restriction.field, this._restriction.value.valueOf());
    };
    return QueryGreaterThan;
}());
exports.QueryGreaterThan = QueryGreaterThan;
var QueryGreaterOrEqual = (function () {
    function QueryGreaterOrEqual(restriction) {
        this._restriction = restriction;
    }
    QueryGreaterOrEqual.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.gte(this._restriction.field, this._restriction.value.valueOf());
    };
    return QueryGreaterOrEqual;
}());
exports.QueryGreaterOrEqual = QueryGreaterOrEqual;
var QueryLowerThan = (function () {
    function QueryLowerThan(restriction) {
        this._restriction = restriction;
    }
    QueryLowerThan.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.lt(this._restriction.field, this._restriction.value.valueOf());
    };
    return QueryLowerThan;
}());
exports.QueryLowerThan = QueryLowerThan;
var QueryLowerOrEqual = (function () {
    function QueryLowerOrEqual(restriction) {
        this._restriction = restriction;
    }
    QueryLowerOrEqual.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.lte(this._restriction.field, this._restriction.value.valueOf());
    };
    return QueryLowerOrEqual;
}());
exports.QueryLowerOrEqual = QueryLowerOrEqual;
var QueryLimit = (function () {
    function QueryLimit(restriction) {
        this._restriction = restriction;
    }
    QueryLimit.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.limit(this._restriction.value);
    };
    return QueryLimit;
}());
exports.QueryLimit = QueryLimit;
var QueryOffset = (function () {
    function QueryOffset(restriction, limit) {
        this._restriction = restriction;
        this._limit = limit;
    }
    QueryOffset.prototype.toDataBaseRestriction = function (queryObject) {
        queryObject.skip((this._restriction.value - 1) * this._limit.value);
    };
    return QueryOffset;
}());
exports.QueryOffset = QueryOffset;
//# sourceMappingURL=QueryRestriction.js.map