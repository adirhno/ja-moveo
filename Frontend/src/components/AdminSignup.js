import React, { useState } from 'react';
import Error from '../components/Error'
import axios from 'axios';
import { ApiUrl } from '../config'

export default function AadminSignup ({ setStatus }){

    const [ userName, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")

    function is_valid(){
        if(userName == "" | password.length < 6 ){
            return false
        }
        return true
    }

    function submit(e){
        e.preventDefault()
        if(is_valid()){
            axios.post(`${ApiUrl}/user/admin`, {userName, password, admin: true}).then((response)=>{
                setStatus("login")
            })
        }
    }

    return (
        <div>
             <form> 
       <fieldset> 
         <h2>Admin Sign Up</h2> 
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
         {is_valid() ? <></>: <Error Signup={true} />}
         <button onClick={submit}> 
           Create admin account 
         </button> 
       </fieldset> 
     </form> 
        </div>
    );
};

