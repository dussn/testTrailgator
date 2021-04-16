const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

module.exports = {
    generateAccessToken: function(username) {
        //generates signed jwt storing the users email
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
      },

    authenticateToken: function (req) {
        //validates jwt to confirm user is logged in
        return new Promise(function(resolve,reject) {
            const token = req.body['code'];
            const header = token.split('.')[0]
            //check if token has a valid header
            if (header == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
            //this string is the default jwt header
            {
                jwt.verify(token,process.env.TOKEN_SECRET,  (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if(result)
                    {
                        //if token successfully decodes resolve the promise with the email
                        resolve(result);
                    }
                    else resolve(false);
                    
                });
            }
            else { 
                resolve(false)
            }
        });
    }   
}