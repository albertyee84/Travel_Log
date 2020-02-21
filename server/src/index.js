const express = require('express');
const morgan = require('morgan');
//morgan is a logger
const helmet = require('helmet');
//helmet will add and remove some headers ie x-powered-by: express
//helps secure our app
const cors = require('cors');
const middlewares = require('./middlewares');

const mongoose = require('mongoose');

const logs = require('../api/logs')

require('dotenv').config();



const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    //in the browser, our extress app will only accept this origin
}));

app.use(express.json());
//body parser

app.get('/', (req, res) => {
    res.json({
        "message": "Hello World"
    })
})

app.use('/api/logs', logs)

app.use(middlewares.notFound)

//error handling middleware, need 4 params otherwise
app.use(middlewares.errorHandler)

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost.com:${port}`);
});