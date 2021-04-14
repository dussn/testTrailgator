const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

module.exports = {
    generateAccessToken: function(username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
      },

    authenticateToken: function (req) {
        return new Promise(function(resolve,reject) {
            const token = req.body['code'];
            const header = token.split('.')[0]
            if (header == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
            {
                jwt.verify(token,process.env.TOKEN_SECRET,  (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if(result)
                    {
                        resolve(result['username']);
                    }
                    else resolve(false);
                    
                });
            }
            else { 
                send_back = false;
                resolve(false)
            }
        });
    }   
}