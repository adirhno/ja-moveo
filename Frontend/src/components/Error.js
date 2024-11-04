import React from 'react'

export default function Error({error}) {
  return (
    <div>
       {
       //sign up error validation
         error == "signup"?
        <div className="Field">  
          <label> 
          <sup>*</sup>Password must be at least 8 characters <sup>*</sup> <br></br>
          <sup>*</sup>User name and Instrument cant be empty <sup>*</sup>
          </label> 
       </div> :<></>}
       
       {
       //login error validation
        error == "login"?
        <div className="Field">  
          <label> 
          <sup>*</sup>Username or Password is Incorrect! <sup>*</sup> <br></br>
          </label> 
        </div> :<></>}

        {
         error == "No results found"?
         <div className="Field">  
           <label> 
           <sup>*</sup>No results found <sup>*</sup> <br></br>
           </label> 
         </div>:<></>}
      
    </div>
  )
}

 