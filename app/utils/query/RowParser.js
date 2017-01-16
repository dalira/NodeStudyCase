"use strict";
var RowParser = (function () {
    function RowParser() {
    }
    ;
    RowParser.parse = function (row) {
        var ret = {};
        for (var key in row) {
            ret[key] = row[key];
        }
        return ret;
    };
    return RowParser;
}());
exports.RowParser = RowParser;
//# sourceMappingURL=RowParser.js.map