const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const loginRouter = require('./api/routers/login-router');
const registerRouter = require('./api/routers/register-router');
const usersRouter = require('./api/routers/users-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

server.get('/', (req,res) =>{
    res.status(200).json({message: "Server is alive and well!"});
});

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server is up and running on port ${port}.`));