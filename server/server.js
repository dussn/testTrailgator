//imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

//function imports
const mongo = require('./routes/api/accountManagement');
const auth = require('./routes/api/auth');


//middleware setup
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '500mb',
  extended: true
}));

app.use(cors( {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

//database info
const uri = require('./config/db').uri;
const dbname = require('./config/db').database;
const acountColname = require('./config/db').accountCollection;
const dataColname = require('./config/db').dataCollection;
const User = require('./routes/api/hash');
const ObjectId = require('mongodb').ObjectId; 


app.set('port', process.env.PORT || 3001);
const PORT = process.env.PORT || 3001;



let dbClient;
let accountCollection;
let dataCollection;



MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  dbClient = client;
  const db = client.db(dbname);
  accountCollection = db.collection(acountColname);
  dataCollection = db.collection(dataColname);

  app.listen(PORT, () => {
    console.log('Server Listening on port '+ PORT);
  });
  }).catch(error => console.error(error));

//on close process
process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

//code used from https://blog.fullstacktraining.com/sharing-a-mongodb-connection-in-node-js-express/



//sign up requests
app.post('/signup', async (req, res) => {
    var query = {email: req.body["email"]}
    accountCollection.find(query).toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw(err);
      };  
      if(!result.length){
        let newUser = new User(); 
        newUser.name = req.body["name"], 
        newUser.email = req.body["email"],
        newUser.password = req.body["password"]
        newUser.role = 'member';
        newUser.setPassword(req.body["password"]);
        console.log(newUser);
       //insert new account into db                         
        accountCollection.insertOne(newUser, function (err) {
            if(err) { 
                console.log(err);
                res.send(false);
            }
            //successfully added user to db
            else res.send(true)
          });
      } //if email exists promise is resolved as false
      else res.send(false)
                            
    });  
});


app.post('/login', async (req, res) => {
  var query = {email: req.body["email"]}
  accountCollection.find(query).toArray(function(err, result) {
    if (err) {
      console.log(err);
      throw(err);
    }
    //user has an acoount
    if(result.length){
                                
      let newUser = new User(); 
      //hash password
      newUser.salt = result[0]["salt"];
      newUser.hash = result[0]["hash"];
      if (newUser.validPassword(req.body['password'])) {
        console.log(result)
        const token = auth.generateAccessToken({username: req.body.email, role: result[0].role});
        res.json(token)
        console.log("success")
      }
      else res.end();
    }
    //user does not have an account
    else {
        res.end();
    }
  });
});


//authenticates user has an account and what the account role is
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

//returns site data to front
app.post('/data', async (req, res) => {
  try {
    
    
    dataCollection.find().toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      }
        res.send(result[0]);
      });
    }
    catch (error) {
      console.log(error);
      res.end();
    }
});



//route for adding new display member
app.post('/settings/addmember', async (req, res) => {
  console.log("attempting to add...")
  
  try{
    var role = (await auth.authenticateToken(req)).role
    //autheticate that admin is making the request
    if(role == 'admin' || role == 'owner' ) {  
      dataCollection.updateOne(
        {"_id": ObjectId("6078f5d9869ea9115c6ca69b")},
        { $push: {
        "DisplayedClubMembers": req.body.member
        }
        }, function(err) {
          if(err) { 
              console.log(err);
              res.end();
          }
                      //successfully added member to db
          else {
              res.send(true);
              console.log("added");
          }
      });
    }
    else res.end();
  }
  catch (error) {
    console.log(error);
    res.end()
  }
});


//removeall display members
app.post('/settings/removeall', async (req, res) => {
  console.log("attempting to remove all...")
  
  try{
    var role = (await auth.authenticateToken(req)).role
    //autheticate that admin is making the request
    if(role == 'admin' || role == 'owner' ) {  
      var removeset = (await dataCollection.find().toArray())[0].DisplayedClubMembers;
      dataCollection.updateOne(
        {"_id": ObjectId("6078f5d9869ea9115c6ca69b")},
        { $pullAll: {
        "DisplayedClubMembers": removeset
        }
        }, function(err) {
          if(err) { 
              console.log(err);
              res.end();
          }
                      //successfully added member to db
          else {
              res.send(true);
              console.log("removed all");
          }
      });
    }
    else res.end();
  }
  catch (error) {
    console.log(error);
    res.end()
  }
});

app.post('/settings/removemember', async (req, res) => {
  console.log("attempting to remove "+ req.body.name + " ...")
  
  try{
    var role = (await auth.authenticateToken(req)).role
    //autheticate that admin is making the request
    if(role == 'admin' || role == 'owner' ) {  
      var removeset = (await dataCollection.find().toArray())[0].DisplayedClubMembers;
      dataCollection.updateOne(
        {},
        { $pull: { "DisplayedClubMembers": { name: req.body.name } } }, 
        function(err) {
          if(err) { 
              console.log(err);
              res.end();
          }
                      //successfully added member to db
          else {
              res.send(true);
              console.log("removed");
          }
      });
    }
    else res.end();
  }
  catch (error) {
    console.log(error);
    res.end()
  }
});

app.post('/settings/removeaccount', async (req, res) => {
  console.log("attempting to remove "+ req.body.email + " ...")
  
  try{
    var role = (await auth.authenticateToken(req)).role
    //console.log(role);
    //autheticate that admin is making the request
    if(role == 'admin' || role == 'owner' ) {  
      var removeAccount = await accountCollection.find({"email":  req.body.email}).toArray();
      var removeRole = removeAccount[0].role;
      if(role == "owner") {
        //check to make sure one other owner account exists
        if(removeRole == 'owner') {
          var check = await accountCollection.find({"role":  "owner"}).toArray();
          //if not empty another owner account exists we may delete this one
          console.log(check.length)
          if (check.length>1){
            //remove account
            await accountCollection.deleteOne({"email":  req.body.email});
            console.log("removed account")
            res.send({status: "true"});
          }
          else {
            res.send({status: "false"});
            console.log("removed failed: there is only one owner")
          }
        } else if (removeRole != "owner") {
          await accountCollection.deleteOne({"email":  req.body.email});
          console.log("removed account")
          res.send({status: "true"});
        }
      } 
      else if (role == 'admin'){
        //admins can only remove members, not other admins or owners
        if(removeRole != 'admin' && removeRole != 'owner'){
          //remove account
          await accountCollection.deleteOne({"email":  req.body.email});
          console.log("removed account")
          res.send({status: "true"});
        }
        else  {
          console.log("remove failed")
          res.send({status: "false"});
        }
      }
    }
    else es.send({status: "false"});
  }
  catch (error) {
    console.log(error);
    res.send({status: "false"});
  }
});