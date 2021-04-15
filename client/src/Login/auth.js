import axios from 'axios';
import Cookies  from 'universal-cookie';

const auth =  async (login) => {
    var cookies = new Cookies();
    var jwt = cookies.get('token');
    console.log("attempting to auth")
    if(jwt){
        //formats token to post to server
        var token = {
            code: jwt
        }
        cookies.set("isAuth",false);
        //send post request to backend under /auth
        axios //post to localhost/auth
        .post("http://localhost:3001/auth",token)
        .then(function (response) {
                if(response.data != false)
                {   
                    setTimeout(() => {  console.log("authenticated"); }, 10);
                    //console.log()
                    //checks the return is not false 
                    cookies.set('isAuth',true);
                    cookies.set('role',response.data.role);
                    cookies.set('email',response.data.username);
                    if(login) window.location.reload();            
                }
                else {
                    cookies.set('isAuth',false);
                    cookies.remove('token');
                    cookies.remove('role');
                    cookies.remove('email');
                    window.location.reload();
                }
                //window.location.reload();
            })
            .catch(err => {
                console.error(err);
                cookies.remove('token');
                cookies.remove('role');
                cookies.remove('email');
                window.location.reload();
            });
            
    }
    else {
        
        cookies.remove('token');
        cookies.remove('role');
        cookies.remove('email');
        if(cookies.get('isAuth')=="true" || cookies.get('token')){
            cookies.set('isAuth',false);
            window.location.reload();
        }
            
    }
}

export default auth;