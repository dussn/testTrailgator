import axios from 'axios';
import Cookies  from 'universal-cookie';

const auth = (jwt) => {
    const cookies = new Cookies();
    if(jwt){
        var token = {
            code: jwt
        }
        axios
        .post("http://localhost:3001/auth",token)
        .then(function (response) {
                if(response.data != false)
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