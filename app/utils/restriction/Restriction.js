"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Restriction = (function () {
    function Restriction(value) {
        this._value = value;
    }
    Object.defineProperty(Restriction.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return Restriction;
}());
exports.Restriction = Restriction;
var FieldRestriction = (function (_super) {
    __extends(FieldRestriction, _super);
    function FieldRestriction(field, value) {
        var _this = _super.call(this, value) || this;
        _this._field = field;
        return _this;
    }
    Object.defineProperty(FieldRestriction.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: true,
        configurable: true
    });
    return FieldRestriction;
}(Restriction));
exports.FieldRestriction = FieldRestriction;
var Equal = (function (_super) {
    __extends(Equal, _super);
    function Equal(field, value) {
        return _super.call(this, field, value) || this;
    }
    return Equal;
}(FieldRestriction));
exports.Equal = Equal;
var StartsWith = (function (_super) {
    __extends(StartsWith, _super);
    function StartsWith(field, value) {
        return _super.call(this, field, value) || this;
    }
    return StartsWith;
}(FieldRestriction));
exports.StartsWith = StartsWith;
var EndsWith = (function (_super) {
    __extends(EndsWith, _super);
    function EndsWith(field, value) {
        return _super.call(this, field, value) || this;
    }
    return EndsWith;
}(FieldRestriction));
exports.EndsWith = EndsWith;
var Like = (function (_super) {
    __extends(Like, _super);
    function Like(field, value) {
        return _super.call(this, field, value) || this;
    }
    return Like;
}(FieldRestriction));
exports.Like = Like;
var GreaterThan = (function (_super) {
    __extends(GreaterThan, _super);
    function GreaterThan(field, value) {
        return _super.call(this, field, value) || this;
    }
    return GreaterThan;
}(FieldRestriction));
exports.GreaterThan = GreaterThan;
var GreaterOrEqual = (function (_super) {
    __extends(GreaterOrEqual, _super);
    function GreaterOrEqual(field, value) {
        return _super.call(this, field, value) || this;
    }
    return GreaterOrEqual;
}(FieldRestriction));
exports.GreaterOrEqual = GreaterOrEqual;
var LowerThan = (function (_super) {
    __extends(LowerThan, _super);
    function LowerThan(field, value) {
        return _super.call(this, field, value) || this;
    }
    return LowerThan;
}(FieldRestriction));
exports.LowerThan = LowerThan;
var LowerOrEqual = (function (_super) {
    __extends(LowerOrEqual, _super);
    function LowerOrEqual(field, value) {
        return _super.call(this, field, value) || this;
    }
    return LowerOrEqual;
}(FieldRestriction));
exports.LowerOrEqual = LowerOrEqual;
var Limit = (function (_super) {
    __extends(Limit, _super);
    function Limit(value) {
        var _this = _super.call(this, value) || this;
        if (value < 1) {
            throw new Error("Valores válidos de registros por página: > 0");
        }
        return _this;
    }
    return Limit;
}(Restriction));
exports.Limit = Limit;
var Offset = (function (_super) {
    __extends(Offset, _super);
    function Offset(value) {
        var _this = _super.call(this, value) || this;
        if (value < 1) {
            throw new Error("Valores válidos de paginas: > 0");
        }
        return _this;
    }
    return Offset;
}(Restriction));
exports.Offset = Offset;
//# sourceMappingURL=Restriction.js.map