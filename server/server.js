// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import bcrypt from 'bcrypt-nodejs';
// import cors from 'cors';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';

// import config from "../config.js";
// import passportJWT from './manager/passport.js';
// import auth from './manager/rolesMiddleware.js';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require("../config");
const passportJWT = require('./manager/passport');
const auth = require('./manager/rolesMiddleware');

const app = express();

const middleware = [
    cors(),
    passport.initialize(),
    bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
    bodyParser.json({ limit: '50mb', extended: true }),
    cookieParser()
]
middleware.forEach((it) => app.use(it))

passport.use('jwt', passportJWT.jwt) //JsonWebToken logic

const userSchema = new mongoose.Schema(
    {
        "id": Number,
        "email": {
            type: String,
            require: true,
            unique: true
        },
        "password": {
            type: String,
            require: true
        },
        "role": {
            type: [String],
            default: ["user"]
        }
    },
    { versionKey: false }
)

//function is done before create new user in DB. We hash the password before create user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password);
    return next();
})

//two functions for auth
userSchema.method({
    passwordMatches(password) {
        return bcrypt.compareSync(password, this.password) //compare 2 password. hash and from user
    }
})
userSchema.statics = {
    async findAndValidateUser({ email, password }) {
        if (!email) {
            throw new Error('no email')
        }
        if (!password) {
            throw new Error('no password')
        }

        const user = await this.findOne({ email }).exec()
        if (!user) {
            throw new Error('no user')
        }

        const isPasswordOk = await user.passwordMatches(password)
        if (!isPasswordOk) {
            throw new Error('password incorrect')
        }

        return user
    }
}

//connect to MongoDB
mongoose.connection.on('connected', () => { console.log('DB is connected') });
mongoose.connection.on('error', (err) => {
    console.log(`cannot connect to db ${err}`)
    process.exit(1)
});
mongoose.connect(mongoURL = config.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(config.port, () => {
        console.log(`server is working http://localhost:${config.port}, project http://localhost:8080`)
    });
})

//create collection DB
const User = mongoose.model('auth', userSchema, 'auth');
// export default User;
module.exports = User;

//create Rest API

app.get('/', (req, res) => {
    res.send('Hello server')
})

//for registration new user
app.post("/api/v1/auth/add/user", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user)
})

//for login and create token
app.post("/api/v1/auth/user", async (req, res) => {
    try {
        const user = await User.findAndValidateUser(req.body)

        const payload = { uid: user._id }
        const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
        delete user.password
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
        res.json({ status: 'ok', token, user })
    } catch (err) {
        res.json({ status: 'error authentication', err })
    }
})

//for authorization
app.get("/api/v1/authorization",
    async (req, res) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            //decoded token in cookie
            const decoded = jwt.verify(req.cookies.token, config.secret)
            const user = await User.findById(decoded.uid)

            //if have a cookie then
            const payload = { uid: user._id }
            const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
            delete user.password
            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
            res.json({ status: 'ok', token, user })
        } catch (err) {
            res.json({ status: 'error authorization', err })
        }
    })

//for secret route
app.get("/api/v1/admin", auth([]),
    async (req, res) => {
        res.json({ status: 'ok' })
    })

    // app.get("/api/v1/auth/users", async (req, res) => {
    //     const users = await User.find({})
    //     res.send(users)
    // })

    // app.get("/api/v1/auth/users/:id", async (req, res) => {
    //     const user = await User.findOne({ _id: req.params.id })
    //     res.send(user)
    // })

    // app.delete("/api/v1/auth/users/delete/:id", async (req, res) => {
    //     try {
    //         await User.deleteOne({ _id: req.params.id })
    //         res.status(204).send()
    //     } catch {
    //         res.status(404)
    //         res.send({ error: "User doesn't exist!" })
    //     }
    // })

