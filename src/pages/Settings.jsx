
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";
import baseurl from "../Api";


export default function Settings() {


  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [selectedimage,setSelectedimage] = useState();
  const [inputs,setInputs] = useState("");
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProfile = {
      username,
      email,
      password,
    };
  }

  const handleimage =(event)=>{
      const file = event.target.files[0];
      setSelectedimage(file)
      inputs.profile=file;
  }

  const savedata =()=>{
      const formdata = new FormData();
      formdata.append('username');
      formdata.append('email');
      formdata.append('password');
      
      formdata.append('profile',selectedimage)

      fetch(baseurl+'/newProfile',
      {method:'post',body:formdata,})
      .then((response)=>response.json())
      .then((data)=>{
          alert("record saved")
      })
      .catch((err)=>{
         console.log("error")
      })
      // navigate('/certificateview')
  }
    
  


 
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
          {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
           
             
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
           
          </div>
          <label>Username</label>
          <input type="text" name="username" onChange={e=>setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" name="email" onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" name="password"  onChange={e=>setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit" onClick={savedata}>
            Update
          </button>
          
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
