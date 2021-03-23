const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const signupButton = document.getElementById("signuplink");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.email.value;
    const password = loginForm.password.value;

    var account = {
        "email" : loginForm.email.value,
        "password" : loginForm.password.value
    }
    console.log(account);
    //encrypt with server public key
    //send request to server to confirm this is an account and if so that the password matches

    

})
signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    open("signup-page.html","_self");
    //opens a new page
    
})