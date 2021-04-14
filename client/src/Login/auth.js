import axios from 'axios';
import Cookies  from 'universal-cookie';

const auth = (jwt) => {
    const cookies = new Cookies();
    if(jwt){
        //formats token to post to server
        var token = {
            code: jwt
        }

        //send post request to backend under /auth
        axios //post to localhost/auth
        .post("http://localhost:3001/auth",token)
        .then(function (response) {
                if(response.data != false)
                    //checks the return is not false 
                    cookies.set('isAuth',true);
                else {
                    cookies.set('isAuth',false);
                    cookies.remove('token');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    else {
        cookies.set('isAuth',false);
        cookies.remove('token');
    }
}

export default auth;