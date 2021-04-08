const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const accountManagement = require('./routes/api/accountManagement');

const app = express();

//middleware setup
app.use(express.json());
app.set('port', process.env.PORT || 3001);


const mongo = require('./routes/api/accountManagement');



//cors config
app.use(
    cors({
      /*origin: 'http://localhost:3001',
      credentials: true,*/
    })
);

//new account request
app.post('/signup', function(req, res){
  console.log('POST');
  mongo.addAccount(req.body);
  console.log(req.body);
  //todo add verification api here
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server Listening on port '+ PORT);
  });