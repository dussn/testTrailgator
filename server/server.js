//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const accountManagement = require('./routes/api/accountManagement');
const app = express();

//middleware setup
app.use(express.json());
app.set('port', process.env.PORT || 3001);

//function imports
const mongo = require('./routes/api/accountManagement');
const auth = require('./routes/api/auth');



//cors config
app.use(cors());

//new account request
app.post('/signup', async (req, res) => {
  res.send(await mongo.connect(req.body,'signup'));
  res.end();
});

//login requests
app.post('/login', async (req, res) => {
  var userRole = 'member';
  var ret = await mongo.connect(req.body,'login');
  if(ret){
    //if password is valid generate access token to pass back to front
    console.log(userRole);
    const token = auth.generateAccessToken({username: req.body.email, role: ret.role});
    //console.log(token)
    res.json(token);
  } else res.send(false);
  res.end();
});

//auth request
app.post('/auth', async (req, res) => {
  //use this to prevent server from crashing due to invalid jwt tokens
  try {
      res.send(await auth.authenticateToken(req));
    }
    catch (error) {
      console.log(error);
    }
    res.end();
});

app.post('/data', async (req, res) => {
  //use this to prevent server from crashing due to invalid jwt tokens
  try {
      //console.log(await mongo.getData()); 
      res.send(await mongo.getData());
    }
    catch (error) {
      console.log(error);
    }
    res.end();
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server Listening on port '+ PORT);
  });