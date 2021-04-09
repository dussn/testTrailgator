const express = require('express');
Promise = require('promise');
//const router = express.Router();


const MongoClient = require('mongodb').MongoClient;


const User = require('./hash'); 
const uri = require('../../config/db').uri;

const dbname = require('../../config/db').database;
const collname = require('../../config/db').collection;

module.exports = {
    connect: function (account, action) {
        return new Promise(function(resolve,reject) {
            MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
                if(err)
                console.log(err)
                else {
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
                        if (action == 'signup') {
                            if(!result.length){
                                let newUser = new User(); 
                                newUser.name = account["name"], 
                                newUser.email = account["email"],
                                newUser.password = account["password"]
                                newUser.setPassword(account["password"]);
                                console.log(newUser);
                                
                                collection.insertOne(newUser, function (err, docs) {
                                    resolve(true);
                                    client.close();
                                });
                            }
                            else resolve(false)
                            
                        } 
                        else if(action == 'login'){
                            if(result.length){
                                client.close();
                                let newUser = new User(); 
                                newUser.salt = result[0]["salt"];
                                newUser.hash = result[0]["hash"];
    
                                resolve(newUser.validPassword(account['password']));
                            }
                            else resolve(false);
                        }
                        else client.close()
                    });
                }
            });
        });
    }
}