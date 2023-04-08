import * as express from 'express';
import * as core from 'express-serve-static-core';
import * as bodyParser from 'body-parser';
import { AddressInfo } from "net";
import * as path from 'path';

import routes from './routes/index';
import register from './routes/register';
import login from './routes/login';

const debug = require('debug')('my express app');

const app = express();
class App {
    private app: core.Express;

    constructor() {

        this.app = express();

        //body parse
        this.app.use(bodyParser.json());

        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use('/', routes);
        this.app.use('/register', register);
        this.app.use('/login', login);

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
            this.app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
                res.status(err['status'] || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        this.app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

        this.app.set('port', process.env.PORT || 3000);
    }

    async server() {
        return this.app.listen(this.app.get('port'), function () {});
    }

    async server_test() {
        return this.app;
    }
}

export default new App();