import React from 'react';
import axios from 'axios';

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
      }
    }
    handleSubmit(event) {
      //submit button
      //alert("name: " +this.state.nameValue + " email: " + this.state.emailValue + " PASSWORD: " + this.state.passwordValue);
      var account = {
        name: this.state.nameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue
      };
      alert(validator.validate(account["email"]));
      if(validator.validate(account["email"])){
        axios
        .post('http://localhost:3001/signup', account)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
      } 
      event.preventDefault();
    }
  
    render() {
      return (
        <div class = 'signup-container'>
          <nav>
              <a class="nav-link" href="/"> Home</a> 
          </nav>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name: 
              <input type="text" value={this.state.nameValue} name="nameField" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Email: 
              <input type="text" value={this.state.emailValue} name="emailField" onChange={this.handleChange} />
            </label>
            <br></br>
            <label>
              Password: 
              <input type="password" value={this.state.passwordValue} name="passField" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" name = "submit button" />
          </form>
          Already have an account? <a class="nav-link" href="/login"> Login</a>
        </div>
        
      );
    }
  }
  export default SignupForm;
