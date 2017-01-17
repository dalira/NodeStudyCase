"use strict";
var Restriction_1 = require("../restriction/Restriction");
var RestQueryOperations = {
    "^": Restriction_1.StartsWith,
    "$": Restriction_1.EndsWith,
    "~": Restriction_1.Like,
    ".gt": Restriction_1.GreaterThan,
    ".ge": Restriction_1.GreaterOrEqual,
    ".lt": Restriction_1.LowerThan,
    ".le": Restriction_1.LowerOrEqual,
    "": Restriction_1.Equal,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RestQueryOperations;
//# sourceMappingURL=RestQueryOperations.js.map