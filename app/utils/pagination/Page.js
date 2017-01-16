"use strict";
var Page = (function () {
    function Page() {
    }
    Page.prototype.hasPrevious = function () {
        var firstPage = this._offset == 1;
        var beforeLastPage = this.offset <= this.lastPage;
        return !firstPage && beforeLastPage;
    };
    Page.prototype.hasNext = function () {
        var totalPages = Math.ceil(this._totalCount / this._limit);
        return this._offset < this.lastPage;
    };
    Object.defineProperty(Page.prototype, "lastPage", {
        get: function () {
            return Math.ceil(this._totalCount / this._limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "body", {
        get: function () {
            return this._body;
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalCount", {
        get: function () {
            return this._totalCount;
        },
        set: function (value) {
            this._totalCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (value) {
            this._limit = value;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=Page.js.map