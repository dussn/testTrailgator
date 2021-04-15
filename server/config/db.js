const username = "dustin_01";
const pass = "OkMLIMelmzKUBukC";
const cluster = "trailgatorswebsite.knh6i"
const dbname = "testDB";
const accountCol = "testAC";
const dataCol = "testSiteData"
 
module.exports = {
    uri :"mongodb+srv://" + username + ":" + pass + "@" + cluster + ".mongodb.net/" + dbname + "?retryWrites=true&w=majority",
    database : dbname,
    accountCollection: accountCol,
    dataCollection: dataCol
   };