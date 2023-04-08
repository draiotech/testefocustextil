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
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("./../app");
const cliente_1 = require("./../models/cliente");
const bcrypt = require("bcrypt");
//define user test
const username = '__TEST_USER_RBLTK';
const password = 'gOjw6e%C#ZlO';
// @ts-ignore
global.require_user_test = function () {
    return __awaiter(this, void 0, void 0, function* () {
        //check has user test
        let new_client = yield cliente_1.default.findOne({ email: username });
        if (!new_client) {
            //if not exist then insert
            new_client = new cliente_1.default({
                username: username,
                password: bcrypt.hashSync(password, 12)
            });
            yield new_client.save();
        }
        return new_client;
    });
};
describe("Login", () => {
    it(
    //-----------------------------------
    'Login with no inputs'
    //-----------------------------------
    , () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield request(yield app_1.default.server_test())
            .post('/login')
            .send({})).status)
            .toBe(400);
    }));
    it(
    //-----------------------------------
    'Login wrong email and password'
    //-----------------------------------
    , () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield request(yield app_1.default.server_test())
            .post('/login')
            .send({
            email: '__WRONG_EMAIL',
            password: '__WRONG_PASS'
        })).status)
            .toBe(400);
    }));
    it(
    //-----------------------------------
    'Login wrong password only'
    //-----------------------------------
    , () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        let access = require_user_test();
        expect((yield request(yield app_1.default.server_test())
            .post('/login')
            .send({
            email: access.email,
            password: '__WRONG_PASS'
        })).status)
            .toBe(400);
    }));
});
//# sourceMappingURL=login.test.js.map