const express = require('express');
const shortid = require('shortid'); // <-------- id generator 

const server = express();

let users = [
    {
        "id":`${shortid.generate()}`,
        "name": "edwin",
        "bio": "something. something"
    },
    {
        "id":`${shortid.generate()}`,
        "name": "josh",
        "bio": "somethings. somethings"
    }
]

//middleware
server.use(express.json());

// Server Endpoints
server.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

server.post('/api/users',(req,res) => {

    const userInfo = req.body;

    users.push(userInfo);

    res.status(201).json(userInfo);
})

server.get('/api/users',(req,res) => {
    res.status(200).json({users})
})

server.get('/api/users/:id',(req,res) => {
    const id = req.params.id;

    const user = users.find(user => user.id == id);

    res.status(200).json({user})
})

server.delete('/api/users/:id', (req,res) => {
    console.log(req.params.id)
    res.status(202).send(`deleted ${req.params.id}`)
})

// PORT ~ this setups a dynamic port and defaults to 5000 if none is set
const port = process.env.PORT || 5000

server.listen(port, () =>{
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})