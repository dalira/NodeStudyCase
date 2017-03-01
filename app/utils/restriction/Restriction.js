"use strict";
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
//# sourceMappingURL=Restriction.js.map