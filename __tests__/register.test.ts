import * as request from 'supertest';
import app from './../app';
import cliente from "./../models/cliente"
const bcrypt = require("bcrypt")
import { randomBytes } from "crypto"

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

describe("Register", () => {
    it(
        //-----------------------------------
        'Register with no inputs'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/register')
                .send({
                })).status)

                .toBe(400);
        });

   
    it(
         //-----------------------------------
        'Register with no email'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/register')
                .send({
                    email: '',
                    password: '--------',
                    fullname: '--------'
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Register with no password'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/register')
                .send({
                    email: '--------',
                    password: '',
                    fullname: '--------'
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Register with no fullname'
        //-----------------------------------
        , async () => {
            expect((await request(await app.server_test())
                .post('/register')
                .send({
                    email: '--------',
                    password: '--------',
                    fullname: ''
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Register with duplicated email'
        //-----------------------------------
        , async () => {
            // @ts-ignore
            require_user_test();

            expect((await request(await app.server_test())
                .post('/register')
                .send({
                    email: username,
                    password: 'testpassword',
                    fullname: 'testefullname'
                })).status)

                .toBe(400);
        });

    it(
        //-----------------------------------
        'Register with random email and password'
        //-----------------------------------
        , async () => {

            expect((await request(await app.server_test())
                .post('/register')
                .send({
                    email: randomBytes(20).toString('hex'),
                    password: randomBytes(8).toString('hex'),
                    fullname: '__TEMP_USER_TO_TEST_ONLY__'
                })).status)

                .toBe(200);
        });

    afterEach(() => {
        cliente.deleteOne({ fullname: '__TEMP_USER_TO_TEST_ONLY__' });
    });
});