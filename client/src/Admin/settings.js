import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';
//import Compress from "react-image-file-resizer";
import Compress from "browser-image-compression";
import auth from '../Login/auth';
import "./settings.css";



class Settings extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {name: '', position: '', email: '', image: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    handleSubmit = async(e) =>{

        
        const cookies = new Cookies();
        const jwt = cookies.get('token');
        auth(jwt)
            const member = {
                name: this.state.name,
                postion: this.state.position,
                email: this.state.email,
                image: localStorage.getItem("img")
            }
            const request = {
                code: jwt,
                member: member
            }
            axios.post('http://localhost:3001/settings/addmember',request)
                .then(function (response) {
                    alert(response.data)
            });
        
    }
    onChange = (e) => {
        // Get the files selected from the input tag
        // On select files always come in an array even
        // if you choose one its the first index
        // if you selected a couple then loop through the array
        const file = e.target.files[0]

        // Compression config
        const options = {
            // As the key specify the maximum size
            // Leave blank for infinity
            maxSizeMB: 1,
            // Use webworker for faster compression with
            // the help of threads
            useWebWorker: true
        }

        // Initialize compression
        // First argument is the file object from the input
        // Second argument is the options object with the
        // config
        Compress(file, options)
            .then(compressedBlob => {
                // Compressed file is of Blob type
                // You can drop off here if you want to work with a Blob file
                // If you want to work with the File
                // Let's convert it here, by adding a couple of attributes
                compressedBlob.lastModifiedDate = new Date()

                // Convert the blob to file
                const convertedBlobFile = new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now()})
                //convert to base64 then set this state image to the base64
                var reader = new FileReader();
                    reader.readAsDataURL(convertedBlobFile); 
                    reader.onloadend = function() {
                    var base64data = reader.result;                
                    localStorage.setItem("img",base64data)
                    }
                // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
            })
            .catch(e => {
                console.log(e);
                // Show the user a toast message or notification that something went wrong while compressing file
            })
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
                            onChange={this.onChange}
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