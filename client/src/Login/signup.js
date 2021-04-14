import React from 'react';
import axios from 'axios';
import history from './../history';

const validator = require('email-validator');
class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {nameValue: '',emailValue : '',passValue: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      switch(event.target.name) {
        case 'nameField':
          this.setState({nameValue: event.target.value});
          break;
        case 'emailField':
          this.setState({emailValue: event.target.value});
          break;
        case 'passField':
          this.setState({passwordValue: event.target.value});
          break;
        case 'confirmPassField':
          this.setState({cpasswordValue: event.target.value});
          break;
      }
    }
    handleSubmit(event) {
      if (this.state.passwordValue == this.state.cpasswordValue)
      {
        var account = {
          name: this.state.nameValue,
          email: this.state.emailValue,
          password: this.state.passwordValue
        };
        
        if(validator.validate(account["email"])){
          axios
          .post('http://localhost:3001/signup', account)
          .then(function (response) {
            if(response.data) history.push('/login');
            else alert('An account with this email already exists!');
            
          })
          .catch(err => {
            console.error(err);
          });
        } else alert("Please enter a valid email!");
        
      } else alert("Passwords do not match!")
      event.preventDefault();
    }
  
    render() {
      return (
        <div className = 'signup-container'>
          <nav>
              <a className="nav-link" href="/"> Home</a> 
          </nav>
          <div className = 'container'>
            <form onSubmit={this.handleSubmit}>
              <div className = 'input-group mb-3'>
                <input type="text" className ='form-control' placeholder = 'Name' value={this.state.nameValue} name="nameField" onChange={this.handleChange}  />
              </div>
              <div className = 'input-group mb-3'>
                <input type="text" className ='form-control' placeholder = 'Email' value={this.state.emailValue} name="emailField" onChange={this.handleChange}  />
              </div>
              <div className = 'input-group mb-3'>
                <input type="password" className ='form-control' placeholder = 'Password' value={this.state.passwordValue} name="passField" onChange={this.handleChange} />
              </div>
              <div className = 'input-group mb-3'>
                <input type="password" className ='form-control' placeholder = 'Confirm Password' value={this.state.cpasswordValue} name="confirmPassField" onChange={this.handleChange} />
              </div>
              <input className = 'submit' type="submit" value = 'Sign Up'  name = "submit button" />
          </form>
          </div>
          <div className="form-check form-check-inline nowrap">
              Already have an account? <a className="nav-link" href="/login"> Log In</a>
          </div>
          
        </div>
        
      );
    }
  }
  export default SignupForm;
