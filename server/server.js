const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const config = require("../config");

const app = express();

const middleware = [
    cors(),
    // express.static(path.resolve(__dirname, './assets')),
    bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
    bodyParser.json({ limit: '50mb', extended: true }),
]

middleware.forEach((it) => app.use(it))

//constants mongoDB. Use your real url or mongodb://127.0.0.1/nameDB to connect to DB
// const url = config.url;
//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(8090, () => {
        console.log(`server is working http://localhost:8090`)
    });
})

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

//function is done before create new user in DB. If password changed that need hash it.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
        return next()
    }
    this.password = bcrypt.hashSync(this.password);
    return next();
})

const User = mongoose.model('auth', userSchema, 'auth');

app.get('/', (req, res) => {
    res.send('Hello server')
})

app.get("/v1/auth/users", async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

app.get("/v1/auth/users/:id", async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.send(user)
})

app.post("/v1/auth/add/user", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user)
})

app.delete("/v1/auth/users/delete/:id", async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}) 


// app.listen(config.port, () => {
    //     console.log(`server is working http://localhost:${config.port}`)
    // });
    
    // const initDB = {
    //     login: 'login',
    //     password: 'pass'
    // }
    // app.get('/', (req, res) => {
    //     res.send('Hello server')
    // })
    
    // app.get("/v1/auth", (req, res) => {
    //      res.send(initDB);
    // })
    