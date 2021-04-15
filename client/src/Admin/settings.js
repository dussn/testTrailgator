import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';
import Compress from "react-image-file-resizer";
import "./settings.css";



class Settings extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {name: '', position: '', email: '', image: {
            file: null,
        }};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    onFileResize = e => {
       const file = e.target.files[0];

        Compress.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
        console.log(uri);
       // You upload logic goes here
        },
        "base64" // blob or base64 default base64
        );
   }
    handleSubmit(event) {
        //need to edit a json on database
        //axios.post('http://localhost:3001/settings/addmember')\
        
        //imageUpload(this.state.image);
        //localStorage.setItem("test",getBase64(this.state.image))
        //imageUpload(this.)
        //alert(this.state.image)
        Compress.imageFileResizer(
        this.state.image, // the file from input
        300, // width
        300, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
            const cookies = new Cookies();
            const member = {
                name: this.state.name,
                postion: this.state.position,
                email: this.state.email,
                image: uri
            }
            const request = {
                code: cookies.get("token"),
                member: member
            }
            localStorage.setItem("img",uri)
            alert("sending")
            axios.post('http://localhost:3001/settings/addmember',request)
                .then(function (response) {
                    alert(response.data)
                });
       
        },
        "base64" // blob or base64 default base64
        );
        /*getBase64(this.state.image).then(base64 => {
            const cookies = new Cookies();
            const member = {
                name: this.state.name,
                postion: this.state.position,
                email: this.state.email,
                image: base64
            }
            const request = {
                code: cookies.get("token"),
                member: member
            }
            axios.post('http://localhost:3001/settings/addmember',request)
                .then(function (response) {
                    alert(response.data)
                });
            
            })*/
    }
    handleChange(event) {
        //alert(event.target.placeholder)
        switch(event.target.name) {
            case "name":
                this.setState({name: event.target.value})
                break;
            case "position":
                this.setState({position: event.target.value})
                break;
            case "email":
                this.setState({email: event.target.value})
                break;
            case "file":
                this.setState({image: event.target.files[0]})
                break;

        }
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
                <div className = "container-fluid">
                    <form onSubmit={this.handleSubmit}>
                        <h4>Add Member</h4>
                        <div className = 'input-group mb-3'>
                            <input type="text" className ='form-control'name = 'name' placeholder = 'Name' value={this.state.name}  onChange={this.handleChange}/>
                        </div>
                        <div className = 'input-group mb-3'>
                            <input type="text" className ='form-control' name = 'position' placeholder = 'Position' value={this.state.position}  onChange={this.handleChange}/>
                        </div>
                        <div className = 'input-group mb-3'>
                            <input type="text" className ='form-control' name = 'email' placeholder = 'Email' value={this.state.email}  onChange={this.handleChange}/>
                        </div>
                        
                        <div className="input-group mb-3">
                            <input
                            type="file"
                            name="file"
                            id="input-files"
                            className="form-control-file border"
                            onChange={this.handleChange}
                            />
                        </div>
                        <input className = 'submit' type="submit" value = 'Add Member'  name = "submit button" />
                    </form>
                </div>
            </div>
            
    );}
    
}

//used code from https://bezkoder.com/node-js-upload-store-images-mongodb/
export default Settings;