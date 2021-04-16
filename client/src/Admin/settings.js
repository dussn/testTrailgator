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
      this.state = {addName: '', addPosition: '', addAbout: '', addEmail: '',
                    removeName: '', removeAccountEmail: '', changeEmail: '', changeRole: '',
                    boxTitle: '', boxInfo: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleAddMemberSubmit = this.handleAddMemberSubmit.bind(this);
      this.onImageChange = this.onImageChange.bind(this);
      this.handleRemoveAccountSubmit = this.handleRemoveAccountSubmit.bind(this);
      this.handleChangeAccountRoleSubmit = this.handleChangeAccountRoleSubmit.bind(this);
      this.handleChangeBoxSubmit = this.handleChangeBoxSubmit.bind(this);
      this.handleRemoveAllMemberSubmit = this.handleRemoveAllMemberSubmit.bind(this);
    }

    
    //used code from https://dev.to/tesh254/compress-images-in-react-browser-image-compression-libary-3cja
    onImageChange = (e) => {
        const file = e.target.files[0]
        // Compression config
        const options = {
            // As the key specify the maximum size
            // Leave blank for infinity
            maxSizeMB: 2,
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
            })
            .catch(e => {
                console.log(e);
                // Show the user a toast message or notification that something went wrong while compressing file
            })
    }
    handleAddMemberSubmit = async(e) =>{

        
        const cookies = new Cookies();
        const jwt = cookies.get('token');
        auth(jwt)
        const member = {
            name: this.state.addName,
            position: this.state.addPosition,
            about: this.state.addAbout,
            email: this.state.addEmail,
            image: localStorage.getItem("img")
        }
        const request = {
            code: jwt,
            member: member
        }
        axios.post('http://localhost:3001/settings/addmember',request)
            .then(function (response) {
                if(response.data == "true") alert("Successfully added")
                localStorage.removeItem("img")
        });
        
    }
    handleRemoveMemberSubmit = async(e) => {
        //add function to post to backend and remove that display memeber
        e.preventDefault();
        const cookies = new Cookies();
        const jwt = cookies.get("token");
        auth(jwt);
        var request = {
            code: jwt,
            name: this.state.removeName
        }
        axios.post('http://localhost:3001/settings/removemember',request)
        .then(function(response) {
            if(!response.data)
                alert("Remove all failed")
            else alert("All Displays Removed")
        })

    }
    handleRemoveAccountSubmit = async(e) => {
        //add function to post to backend and remove that display memeber
        e.preventDefault();
        const cookies = new Cookies();
        const jwt = cookies.get("token");
        auth(jwt);
        var request = {
            code: jwt,
            email: this.state.removeAccountEmail
        }
        axios.post('http://localhost:3001/settings/removeaccount',request)
        .then(function(response) {
            if(!response.data)
                alert("Failed to remove account")
            else alert("Account Removed")
        })
    }
    handleChangeAccountRoleSubmit = async(e) => {
        //add function to post to backend and remove that display memeber
        alert(this.state.changeRole)
    }
    handleChangeBoxSubmit = async(e) => {
        //add function to post to backend and remove that display memeber
        alert(this.state.boxTitle)
    }
    handleRemoveAllMemberSubmit(e) {
        e.preventDefault();
        const cookies = new Cookies();
        const jwt = cookies.get("token");
        auth(jwt);
        axios.post('http://localhost:3001/settings/removeall',{code: jwt})
        .then(function(response) {
            alert("hey")
            if(!response.data)
                alert("Removeall failed")
            else alert("All Displays Removed")
        })
    }
    handleChange(event) {
        //alert(event.target.placeholder)
        switch(event.target.name) {
            case "addName":
                this.setState({addName: event.target.value})
                break;
            case "addPosition":
                this.setState({addPosition: event.target.value})
                break;
            case "addAbout":
                this.setState({addAbout: event.target.value});
                break;
            case "addEmail":
                this.setState({addEmail: event.target.value})
                break;
            case "removeName":
                this.setState({removeName: event.target.value})
                break;
            case "removeAccountEmail":
                this.setState({removeAccountEmail: event.target.value})
                break;
            case "changeEmail":
                this.setState({changeEmail: event.target.value})
                break;
            case "changeRole":
                this.setState({changeRole: event.target.value})
                break;
            case "boxTitle":
                this.setState({boxTitle: event.target.value})
                break;
            case "boxInfo":
                this.setState({boxInfo: event.target.value})
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
                    <div className='row'>
                        <div className = 'col-md-6'>
                            <form className = "holder-left" onSubmit={this.handleAddMemberSubmit}>
                                <h4>Add Display Member</h4>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control'name = 'addName' placeholder = 'Name' value={this.state.addName}  onChange={this.handleChange}/>
                                </div>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control' name = 'addPosition' placeholder = 'Position' value={this.state.addPosition}  onChange={this.handleChange}/>
                                </div>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control' name = 'addEmail' placeholder = 'Email' value={this.state.addEmail}  onChange={this.handleChange}/>
                                </div>
                                <div className = 'input-group mb-3'>
                                    <textarea class="form-control" name="addAbout" placeholder = 'About' rows="4" value={this.state.addAbout} onChange={this.handleChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                    type="file"
                                    name="file"
                                    id="input-files"
                                    className="form-control-file border"
                                    onChange={this.onImageChange}
                                    />
                                </div>
                                <input className = 'submit' type="submit" value = 'Add Member'  name = "submit button" />
                            </form>
                        </div> 
                        <div className = 'col-md-6'>
                            <form className = "holder-right" onSubmit={this.handleRemoveMemberSubmit}>
                                <h4>Remove Display Member</h4>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control' name = 'removeName' placeholder = 'Name' value={this.state.removeName}  onChange={this.handleChange}/>
                                </div>
                                <input className = 'submit' type="submit" value = 'Remove Member'  name = "submit button" />
                            </form>
                            
                            <form className = "holder-right" onSubmit={this.handleRemoveAllMemberSubmit}>
                                <input className = 'submit' type="submit" value = 'Remove All Display Members'  name = "submit button" />
                            </form>
                            <form className = "holder-right" onSubmit={this.handleRemoveAccountSubmit}>
                                <h4>Remove Account</h4>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control'name = 'removeAccountEmail' placeholder = 'Email' value={this.state.removeAccountEmail}  onChange={this.handleChange}/>
                                </div>
                                <input className = 'submit' type="submit" value = 'Remove Account'  name = "submit button" />
                            </form>
                            <form className = "holder-right" onSubmit={this.handleChangeAccountRoleSubmit}>
                                <h4>Change Account Role</h4>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control'name = 'changeEmail' placeholder = 'Email' value={this.state.changeEmail}  onChange={this.handleChange}/>
                                </div>
                                <div className = 'input-group mb-3'>
                                    <input type="text" className ='form-control'name = 'changeRole' placeholder = 'Role' value={this.state.changeRole}  onChange={this.handleChange}/>
                                </div>
                                <input className = 'submit' type="submit" value = 'Change Role'  name = "submit button" />
                            </form>
                        </div> 
                        <div className = 'col-md-12'>
                            <form className = 'holder-center' onSubmit={this.handleChangeBoxSubmit}>
                                <h4>Front Page Information</h4>
                                <div className = 'input-group mb-3' id = 'box'>
                                    <input type="text" className ='form-control'name = 'boxTitle' placeholder = 'Box Title' value={this.state.boxTitle}  onChange={this.handleChange}/>
                                </div>
                                <div className = 'input-group mb-3' id = 'box'>
                                        <textarea class="form-control" name="boxInfo" placeholder = 'Box Information' rows="4" value={this.state.boxInfo} onChange={this.handleChange}/>
                                </div>
                                 <input className = 'submit' type="submit" value = 'Change Info'  name = "submit button" />
                            </form>
                        </div>
                    </div>   
                </div>
            </div>
            
    );}
    
}

//used code from https://bezkoder.com/node-js-upload-store-images-mongodb/
export default Settings;