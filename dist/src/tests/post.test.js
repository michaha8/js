"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const newPostMessage = 'This is the new test post message';
const newPostSender = '999000';
const updatedPostMessage = 'This is an Update post';
const nonExistentsender = 'Michael';
let newPostId = '';
let newSender = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
    mongoose_1.default.connection.close();
}));
describe("Posts Tests ", () => {
    test("Add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
            "message": newPostMessage,
            "sender": newPostSender
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage);
        expect(response.body.sender).toEqual(newPostSender);
        newPostId = response.body._id;
        newSender = response.body.sender;
    }));
    //------------------------------------------------------------------
    test("Get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post');
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(newPostMessage);
        expect(response.body[0].sender).toEqual(newPostSender);
    }));
    test("Get all posts containing given text in post message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post?message=new');
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(newPostMessage);
        expect(response.body[0].sender).toEqual(newPostSender);
    }));
    //--------------------------------------------------------------------------
    test("Get post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/' + newPostId);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage);
        expect(response.body.sender).toEqual(newPostSender);
    }));
    //Negative test
    test("Trying to get post by non existent Id <failed>", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/345345');
        expect(response.statusCode).toEqual(400);
    }));
    //--------------------------------------------------------------------------------
    test("Get post by sender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post?sender=' + newSender);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(newPostMessage);
        expect(response.body[0].sender).toEqual(newSender);
    }));
    //Negative test
    test("Trying to get post by Sender that not exist ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post?sender=' + nonExistentsender);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(0);
    }));
    //--------------------------------------------------------------------------
    test("Update post", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(server_1.default).put('/post/' + newPostId).send({
            "message": updatedPostMessage,
            "sender": newPostSender
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(updatedPostMessage);
        expect(response.body.sender).toEqual(newPostSender);
        response = yield (0, supertest_1.default)(server_1.default).get('/post/' + newPostId);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(updatedPostMessage);
        expect(response.body.sender).toEqual(newPostSender);
        // Negative test
        response = yield (0, supertest_1.default)(server_1.default).put('/post/345345').send({
            "message": updatedPostMessage,
            "sender": newPostSender
        });
        expect(response.statusCode).toEqual(400);
        response = yield (0, supertest_1.default)(server_1.default).put('/post/' + newPostId).send({
            "message": updatedPostMessage,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(updatedPostMessage);
        expect(response.body.sender).toEqual(newPostSender);
    }));
});
// test("Update post",async ()=>{
//     const response=await request(app).get('/post')
//     expect(response.statusCode).toEqual(200)
//     expect(response.body[0].sender).toEqual(newPostSender)
//     expect(response.body[0]._id).toEqual(newPostId)
// })
// test("Get post by sender ",async ()=>{
//     const response=await request(app).get('/post/')
//     expect(response.statusCode).toEqual(200)
//     expect(response.body[0].message).toEqual(newPostMessage)
//     expect(response.body[0].sender).toEqual(210)
// })
// describe("Restric access without Auth /",()=>{
//     test("It should respond with error",async ()=>{
//         const response =await request(app).get("/post");
//         expect(response.statusCode).not.toEqual(200);
//     }) 
// })
//# sourceMappingURL=post.test.js.map