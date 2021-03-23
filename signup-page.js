const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-form-submit");
const loginButton = document.getElementById("loginlink");
//const loginErrorMsg = document.getElementById("login-error-msg");


signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    //need to confirm that something is a legit email address

    //can do this with sendgrid
    //make a json of the fields and send it to the server

    var account = {
        "email" : signupForm.email.value,
        "password" : signupForm.password.value
    }
    console.log(account);

    //send request to server to confirm that this is a unique email
    //if yes send code to email to authenticate account
    //if code matches encrypt and send to the server
    
})

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    open("login-page.html","_self");
    //opens the login page
    
})