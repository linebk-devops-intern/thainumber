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
    <div onSubmit={handleSubmit}>
      <input type = "text" value ={userint}  onChange={e =>setUserint(e.target.value)}  />
      <button type='button' class='button' onClick={tranform}>Tranfer</button>   
      <br></br>{posts.thaiNum}  
      <br></br>{posts.text}  
      <br></br>{posts.currencyText}
    </div>
  );
} 

export default App;
