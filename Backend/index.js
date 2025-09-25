const express = require('express');
const session = require('express-session')
/** Db */
const mongoose = require('./db');

/** Middlewares */
const performance = require('./middlewares/performance');

/** Controllers */
const usersV1 = require('./controllers/v1/users');
const authsV1 = require('./controllers/v1/auths');

//+++++++++++++++++++++++++++++++++++++++++++++//
const app = express();


app.use(express.json());

app.use(performance);

app.use(session({
    secret: 'esteesmyclavesecreta',
    resave: false,
    saveUninitialized: false,   
    cookie: {
        name: 'sess:id',
        maxAge: 8 * 60 * 60 * 1000, // 8h
        secure: false
    }
}));


const PORT = 3001;

/** Controllers */
app.use('/api/v1/users', usersV1);
app.use('/api/v1/auths', authsV1);

app.get('/', (req, res) => {
    req.session.counter = req.counter;
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




