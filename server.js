require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const restricted = require('./api/middleware/restricted');

// Setup Session with Knex user session storage.
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);

const sessionConfiguration = require('./sessionConfig').config(KnexSessionStorage);

const loginRouter = require('./api/routers/login-router');
const registerRouter = require('./api/routers/register-router');
const usersRouter = require('./api/routers/users-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(session(sessionConfiguration));
server.use(restricted);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Server is alive and well!", session: req.session });
});

server.get('/api/restricted/message', (req, res) =>{
    res.status('200').json({message: "This is a super secret message with restricted access."});
});

server.get('/logout', (req,res) =>{
    if(req.session){
        req.session.destroy();
        res.status(200).json({message: "Logged out successfully."});
    }else{
        res.status(200).json({message: "No session was found."});
    }
});

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server is up and running on port ${port}.`));