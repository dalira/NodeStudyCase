"use strict";
var mysql = require("mysql");
var ConnectionFactory = (function () {
    function ConnectionFactory() {
    }
    ConnectionFactory.createConnection = function () {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'payfast'
        });
    };
    return ConnectionFactory;
}());
exports.ConnectionFactory = ConnectionFactory;
//# sourceMappingURL=ConnectionFatory.js.map