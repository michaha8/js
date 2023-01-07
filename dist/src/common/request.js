"use strict";
class request {
    constructor(body, userId) {
        this.body = {};
        this.userId = null;
        this.body = body;
        this.userId = userId;
    }
    //cons
    static fromRestRequest(req) {
        return new request(req.body, req.body.userId);
    }
}
module.exports = request;
//# sourceMappingURL=Request.js.map