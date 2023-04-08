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
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const index_1 = require("./routes/index");
const register_1 = require("./routes/register");
const login_1 = require("./routes/login");
const debug = require('debug')('my express app');
const app = express();
class App {
    constructor() {
        this.app = express();
        //body parse
        this.app.use(bodyParser.json());
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/', index_1.default);
        this.app.use('/register', register_1.default);
        this.app.use('/login', login_1.default);
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use((err, req, res, next) => {
                res.status(err['status'] || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        this.app.set('port', process.env.PORT || 3000);
    }
    server() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.app.listen(this.app.get('port'), function () { });
        });
    }
    server_test() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.app;
        });
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map