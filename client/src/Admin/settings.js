import React from "react";
import axios from 'axios';



class Settings extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {member: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        //need to edit a json on database

        
    }
    handleChange(event) {
        this.setState({member: event.target.value});
    }
    render() {
        return (
            <div>
                <div className = 'cotainer-fluid'>
                    <nav>
                        <div className="form-check form-check-inline nowrap">
                            <a className="nav-link" href="/"> Home</a> |
                            <a className="nav-link" href="/calendar"> Calendar</a> |
                            <a className="nav-link" href="/profile"> Profile</a> |
                            <a className="nav-link" href="/signout"> Sign Out</a>
                        </div>  
                    </nav>
                </div> 
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className = 'input-group mb-3'>
                        <input type="text" className ='form-control' placeholder = 'Add Member' value={this.state.member}  onChange={this.handleChange}/>
                    </div>
                    <input className = 'submit' type="submit" value = 'Sign Up'  name = "submit button" />
                </form>
            </div>
            
    );}
}
export default Settings;