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
  mongo.connect(req.body,'signup')
.then(function (data) {
    res.send(data);
    res.end();
  });
});

//login request
app.post('/login', function(req, res){

  mongo.connect(req.body,'login')
.then(function (data) {
    if(data)
    {
      res.send({
          token: 'test123'
        });
    }
    
    res.send(data);
    res.end();
  });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server Listening on port '+ PORT);
  });