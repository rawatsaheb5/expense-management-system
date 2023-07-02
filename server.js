const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDb.js');
const userRoute = require('./routes/userRoute.js');
const userModel = require('./models/userModels');
const path = require('path');
const app = express();

/*--------config dotenv file-------*/
dotenv.config();
/*--------------------------------------------*/
/* -----------mongodb connection ----------*/ 

connectDB();
/*----------------> middlewares <----------------*/

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


/*------------------> routes <----------------*/
app.use('/api/v1/users', userRoute);
//-----transaction routes--
app.use('/api/v1/transactions', require('./routes/transactionRoute.js'))
//--static files

app.use(express.static(path.join(__dirname, './build')));
app.get('*',  (req, res) => {
   res.sendFile(path.join(__dirname, './build/index.html')) 
})
/* -------------> port <----------*/

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
});
