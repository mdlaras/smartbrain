const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const knex = require('knex')({
    client: 'pg',
    connection:{
        host: process.env.DATABASE_URL,
        ssl : true
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.send('it is working!')
})

app.post('/signin', (req, res) => {signin.handleSignIn(req,res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req,res, knex, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, knex)})

app.put('/image', (req,res) => {image.handleImage(req, res, knex)})

app.post('/imageurl', (req,res) => {image.handleAPICall(req, res, knex)})



app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
