const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const accountManagement = require('./routes/api/accountManagement');

const app = express();

//middleware setup
app.use(express.json());
app.set('port', process.env.PORT || 3001);


const mongo = require('./routes/api/accountManagement');
const auth = require('./routes/api/auth');



//cors config
app.use(
    cors({
      /*origin: 'http://localhost:3001',
      credentials: true,*/
    })
);

//new account request
app.post('/signup', async (req, res) => {
  res.send(await mongo.connect(req.body,'signup'));
  res.end();
});

//login request
app.post('/login', async (req, res) => {
  if(await mongo.connect(req.body,'login')){
    const token = auth.generateAccessToken({username: req.body.email});
    console.log(token)
    res.json(token);
  } else res.send(false);
  
});
app.post('/auth', async (req, res) => {;
  try {
      res.send(await auth.authenticateToken(req));
    }
    catch (error) {
      console.log(error);
    }
  
  
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server Listening on port '+ PORT);
  });