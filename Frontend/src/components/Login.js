import React, { useState } from 'react';
import Error from './Error'
import axios from "axios"
import { ApiUrl } from '../config'

export default function Login ({ setUser, setStatus, setCurrUser }){
    const [ userName, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [auth, setAuth ] = useState(true)
    
    function is_valid(){
        if(userName == "" | password.length < 6){
            return false
        }
        return true
    }

    function submit(e){
        e.preventDefault()
        if(is_valid()){
             axios.post(`${ApiUrl}/user/login/`, { userName, password }).then((response)=>{
                response.data.admin? setUser("admin"): setUser("player")
                setCurrUser(response.data)
                setStatus("")
             }).catch((error)=>{ 
              setAuth(false)
              console.log(error)
              })
        }else{
            setAuth(false)
        }
    }
    return (
        <div>
             <form> 
       <fieldset> 
         <h2>Login</h2> 
         <div className="Field"> 
           <label> 
             User name 
           </label> 
           <input 
             value={userName} 
             onChange={(e) => { 
                setUserName(e.target.value); 
             }} 
             placeholder="User Name" 
           /> 
         </div> 
         <div className="Field"> 
           <label>Password  
            </label> 
           <input 
           type='password'
             value={password} 
             onChange={(e) => { 
               setPassword(e.target.value); 
             }} 
             placeholder="Password" 
           /> 
         </div> 
    
         {auth ? <></>: <Error error={"login"} />}
        <div className='buttons'> 
          <button onClick={submit}> 
           Login
         </button> 
         <button onClick={()=>{setStatus("signup")}}> 
           Sign Up 
         </button> </div>
       </fieldset> 
     </form> 
        </div>
    );
};

