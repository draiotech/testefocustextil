import * as request from 'supertest';
import app from './../app';
import cliente from "./../models/cliente"
const bcrypt = require("bcrypt")

//define user test
const username = '__TEST_USER_RBLTK';
const password = 'gOjw6e%C#ZlO';

// @ts-ignore
global.require_user_test = async function () {

    //check has user test
    let new_client = await cliente.findOne({ email: username });
    if (!new_client) {
        //if not exist then insert
        new_client = new cliente({
            username: username,
            password: bcrypt.hashSync(password, 12)
        });
        await new_client.save();
    }
    return new_client;
}

describe("Login", () => {

    it(
        //-----------------------------------
        'Login with no inputs'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/login')
                .send({
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Login wrong email and password'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/login')
                .send({
                    email: '__WRONG_EMAIL',
                    password: '__WRONG_PASS'
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Login wrong password only'
        //-----------------------------------
        , async () => {
            // @ts-ignore
            let access = require_user_test();

            expect((await request(await app.server_test())
                .post('/login')
                .send({
                    email: access.email,
                    password: '__WRONG_PASS'
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Login correct username and password'
        //-----------------------------------
        , async () => {
             // @ts-ignore
            require_user_test();

            //test
            expect((await request(await app.server_test())
                .post('/login')
                .send({
                    username: username,
                    password: password
                })).status)

                .toBe(200);
        });

})