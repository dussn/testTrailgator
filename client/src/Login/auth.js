import axios from 'axios';
import Cookies  from 'universal-cookie';

const auth = (jwt) => {
    //alert(jwt);
    const cookies = new Cookies();
    
    if(jwt){
        var token = {
            code: jwt
        }
        axios
        .post("http://localhost:3001/auth",token)
        .then(function (response) {
                //alert(response.data);
                //alert(response.data)
                if(response.data != false)
                    cookies.set('isAuth',true);
                else cookies.set('isAuth',false);
            })
            .catch(err => {
                console.error(err);
            });
    }
    else {
        cookies.set('isAuth',false);
    }
}

export default auth;