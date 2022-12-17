//Configuration
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./passport/bearer');





const app = express();

// middelwares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//static
app.get('/',(req,res)=>{
    res.send('Hello Wold!')
})

// initialize routes
app.use('/api',require('./routes/employeeApi'));
app.use('/api',require('./routes/missionApi'));
app.use('/api', require('./routes/authRouter'))

//connect to database and start server
require('./database/connect');
app.listen(process.env.PORT || 5000,()=>{
    console.log('Server Started')
})