import axios from 'axios';
import React,{useState} from 'react';
import './app.css';

const baseURL = "http://localhost:3333/main/thainumber"

function App() {

  let [posts,setPosts] = useState([null]);
  let [userint,setUserint] = useState("1212");
  
  const handleSubmit = (e) => {
    e.preventDefault();
 };

  const  tranform = (e) =>{

     axios.post(baseURL,{
      "input": userint
    }).then((response) => {
      setPosts(response.data); 
      
    })
  }

  return (
    
    <div className='box' onSubmit={handleSubmit}>

      <input className='input' type = "text" value = {userint}  onChange={e => setUserint(e.target.value)}  />

       &nbsp;<button type= 'button' className = 'button' onClick = {tranform}>Tranfer</button> 
         
       &nbsp;<br></br><h4>thainumber  &nbsp;</h4>{posts.thaiNum} 
      <br></br><h4>&nbsp;text  &nbsp;</h4>{posts.text}  
      <br></br><h4>&nbsp;currencyText  &nbsp;</h4>{posts.currencyText}
    </div>
  );
} 

export default App;
