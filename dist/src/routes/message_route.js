"use strict";
// /**
// * @swagger
// * tags:
// *   name: Messages
// *   description: The Messages API
// */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const request_1 = __importDefault(require("../common/request"));
const message_1 = __importDefault(require("../controllers/message"));
const auth_1 = __importDefault(require("../controllers/auth"));
const conversation_1 = __importDefault(require("../controllers/conversation"));
router.post("/", auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const conversationId = yield conversation_1.default.getConversation(request_1.default.fromRestRequest(req));
        const response = yield message_1.default.addNewMessage(request_1.default.fromRestRequest(req), conversationId);
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(400).send({
            status: "fail",
            message: err.message,
        });
    }
}));
// get user messages
router.get("/", auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield message_1.default.getUserMessages(request_1.default.fromRestRequest(req), req.query.user);
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(400).send({
            status: "fail",
            message: err.message,
        });
    }
}));
module.exports = router;
//# sourceMappingURL=message_route.js.map