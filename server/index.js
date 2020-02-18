require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();

const {SERVER_PORT,SESSION_SECRET}= process.env;

//session controller
const {verifyUser}= require('./middlewares/checkForSession');
// const checkForSession = require("./middlewares/checkForSession");

//swag controller
const {getSwag} = require('./controllers/swagController');

//auth controller
const {register,login,signout,getUser}= require('./controllers/authController');

//cart controller
const {addSwag,deleteSwag,checkout} = require('./controllers/cartController');

//search controller
const {searchSwag} = require('./controllers/searchController');


app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave:true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 60
    }
}));

app.use(express.static(`${__dirname}/../build`));

app.use(verifyUser);
// app.use(checkForSession);

//auth endpoints
app.post('/api/register',register);
app.post('/api/login',login);
app.post('/api/signout',signout);
app.get('/api/user',getUser);

//swag endpoints
app.get('/api/swag', getSwag);

//cart endpoints
app.post('/api/cart/checkout',checkout);
app.post('/api/cart/:id', addSwag);
app.delete('/api/cart/:id',deleteSwag);

//search endpoint
app.get('/api/search',searchSwag);


app.listen(SERVER_PORT, ()=>console.log(`Server is on ${SERVER_PORT}`));