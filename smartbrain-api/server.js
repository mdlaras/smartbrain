const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id:'123',
            name:'john',
            email:'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name:'sarah',
            email:'sarah@gmail.com',
            password: 'icecream',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users)
})

app.post('/signin', (req,res)=> {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error loggin in')
    }
})

app.post('/register', (req,res)=> {
    const { email, name, password} = req.body;
    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) =>{
    const id  = req.params.id;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.send(user);
        }
    })
    if(!found){
        res.status(400).json('not found')
    }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
