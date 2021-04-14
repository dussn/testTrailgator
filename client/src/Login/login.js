import React from 'react';
import axios from 'axios';
import "./login.css";
import history from './../history';
import Cookies  from 'universal-cookie';
import auth from './auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const validator = require('email-validator');

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {eValue : '',passValue: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      switch(event.target.name) {
        case 'emailField':
          this.setState({emailValue: event.target.value});
          break;
        case 'passField':
          this.setState({passwordValue: event.target.value});
          break;
      }
    }
    handleSubmit(event) {
        //submit button
        var account = {
            name: "",
            email: this.state.emailValue,
            password: this.state.passwordValue
        };
        if(validator.validate(account["email"])){
            axios
            .post('http://localhost:3001/login', account)
            .then(function (response) {
                if(!response.data){
                  alert("Email or password is incorrect!")
                } else {
                  const token = response.data
                  const cookies = new Cookies();
                  cookies.set('token',token);
                  
                  auth(token);
                  history.push('/')
                  window.location.reload();
                }
                
              })
            .catch(err => {
              console.error(err);
         });
        
      } else alert("Please enter a valid email!");
      event.preventDefault();
    }
  
    render() {
      return (
        <div className = 'login-page-container'>
            <nav>
                <a className="nav-link" href="/"> Home</a> 
            </nav>
            <div className = 'container'>
                <form className = 'loginForm' onSubmit={this.handleSubmit}>
                    <div className = 'input-group mb-3'>
                        <input type="text" className ='form-control' placeholder = 'Email' value={this.state.emailValue} name="emailField" onChange={this.handleChange}  />
                    </div>
                    <div class = 'input-group mb-3'>
                        <input type="password" className ='form-control' placeholder = 'Password' value={this.state.passwordValue} name="passField" onChange={this.handleChange} />
                    </div>

                    <input className = 'submit' type="submit" value = 'Log In'  name = "submit button" />
                    <br></br>
                    <br></br>
                    <div class="form-check form-check-inline nowrap">
                    Dont Have an Account? <a className="nav-link" href="/signup">Sign Up</a>
                    </div>
                    
                </form>
                
            </div>
        </div>
        
      );
    }
  }
  
  export default LoginForm;