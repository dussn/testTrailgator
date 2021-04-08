const express = require('express');
//const router = express.Router();


const MongoClient = require('mongodb').MongoClient;

const User = require('./hash'); 
const uri = require('../../config/db').uri;

const dbname = require('../../config/db').database;
const collname = require('../../config/db').collection;
module.exports = {
    addAccount: function (account, callback) {
        var readAllLines = false;
        var wasAdded = false;
        console.log(uri);
        
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
            if(err)
                console.log(err)
            else {
                console.log("TEST2");
                var done = false;
                // Get db
                const db = client.db(dbname);
        
                // Get collection
                const collection = db.collection(collname);
                
                //make a query to the database to see if this email already has an account
                var query = {email: account["email"]}
        
                collection.find(query).toArray(function(err, result) {
                    if (err) throw err;
                    
                    //if the search returns nothing we can add the data to the database
                    if (!result.length) {

                        let newUser = new User(); 

                        // Initialize newUser object with request data 
                        newUser.name = account["name"], 

                        newUser.email = account["email"],
                        newUser.password = account["password"]
                        newUser.setPassword(account["password"]);
                        console.log(newUser);

                        collection.insertOne(newUser, function (err, docs) {
                            console.log("1 document inserted");
                            client.close();
                        });
                    } 
                    else client.close()
                });
            }
        });
    }
}