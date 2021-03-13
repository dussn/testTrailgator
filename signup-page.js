const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-form-submit");
const loginButton = document.getElementById("loginlink");
//const loginErrorMsg = document.getElementById("login-error-msg");


signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    
    //need to confirm that something is a legit email address

    //can do this with sendgrid

    
})

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    open("login-page.html","_self");
    //opens a new page
    
})