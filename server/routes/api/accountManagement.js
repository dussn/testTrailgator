//setup
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const User = require('./hash'); 
const uri = require('../../config/db').uri;
const dbname = require('../../config/db').database;
const accountCollection = require('../../config/db').accountCollection;
const dataCollection = require('../../config/db').dataCollection;
const ObjectId = require('mongodb').ObjectId; 
Promise = require('promise');

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
                    const collection = db.collection(accountCollection);
                    
                    //make a query to the database to see if this email already has an account
                    var query = {email: account["email"]}
            
                    collection.find(query).toArray(function(err, result) {
                        if (err) throw err;
                        
                        //if the search returns nothing we can add the data to the database
                        if (action == 'signup') {
                            //checks if a user with that email already exists
                            if(!result.length){
                                let newUser = new User(); 
                                newUser.name = account["name"], 
                                newUser.email = account["email"],
                                newUser.password = account["password"]
                                newUser.role = 'member';
                                newUser.setPassword(account["password"]);
                                console.log(newUser);
                                
                                collection.insertOne(newUser, function (err, docs) {
                                    if(err) { 
                                        console.log(err);
                                        resolve(false);
                                    }
                                    //successfully added user to db
                                    else resolve(true);
                                    client.close();
                                });
                            } //if email exists promise is resolved as false
                            else resolve(false)
                            
                        } 
                        //login handling
                        else if(action == 'login'){
                            //if db query is not 0
                            if(result.length){
                                client.close();
                                let newUser = new User(); 
                                //hash password
                                newUser.salt = result[0]["salt"];
                                newUser.hash = result[0]["hash"];
                                
                                //store new user into db and resolve promise
                                resolve({email: newUser.validPassword(account['password']), role: result[0]["role"]});
                            }
                            else resolve();
                        }
                        else client.close()
                    });
                }
            });
        });
    },
    getData: function() {
        return new Promise(function(resolve,reject) {
            MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
                if(err){
                    console.log(err)
                    resolve();
                }        
                else {
                    var done = false;
                    // Get db
                    const db = client.db(dbname);

                    // Get collection
                    const collection = db.collection(dataCollection);
                    collection.find().toArray(function(err, result) {
                        if (err) throw err;
                        client.close();
                        resolve(result[0]);
                    });
                }
            });
        });
    },
    addMember: function(req) {
        return new Promise(function(resolve,reject) {
            MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
                if(err){
                    console.log(err)
                    resolve();
                }        
                else {
                    var done = false;
                    // Get db
                    const db = client.db(dbname);

                    // Get collection
                    const collection = db.collection(dataCollection);
                    collection.updateOne({"_id": ObjectId("60779c7e3b85d458c6a69cb0")},
                                        { $push: {
                                                "homePage.clubInfo.clubMembers": req.body.member
                                            }
                                        }, function(err) {
                        if(err) { 
                            console.log(err);
                            resolve(false);
                        }
                                    //successfully added member to db
                        else {
                            resolve(true);
                            console.log("added");
                        }
                        client.close();
                    });
                        
                        
                        /*req.body.member, function (err, docs) {
                        if(err) { 
                            console.log(err);
                            resolve(false);
                        }
                                    //successfully added member to db
                        else {
                            resolve(true);
                            console.log("added");
                        }
                        client.close();
                    });*/
                    
                }
            });
        });
    }
}