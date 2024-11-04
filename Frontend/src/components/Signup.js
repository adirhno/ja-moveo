import React, { useState } from 'react';
import Error from '../components/Error'
import axios from 'axios';
import { ApiUrl } from '../config'

export default function Signup ({ setStatus }){
    const [ userName, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ instrument, setInstrument ] = useState("")

    function is_valid(){
        if(userName == "" | password.length < 6 | instrument == ""){
            return false
        }
        return true
    }

    function submit(e){
        e.preventDefault()
        if(is_valid()){
            axios.post(`${ApiUrl}/user/`, {userName, password, instrument, admin: false}).then(()=>{
              setStatus("login")
            }).catch((error)=>{ console.log(error) })
        }
    }

    return (
      <div>
          <form>
              <fieldset>
                  <h2>Sign Up</h2>
                  <div className="Field">
                      <label>User name</label>
                      <input
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="User Name"
                      />
                  </div>
                  <div className="Field">
                      <label>Password</label>
                      <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                      />
                  </div>
                  <div className="Field">
                      <label>Instrument</label>
                      <input
                          value={instrument}
                          onChange={(e) => setInstrument(e.target.value)}
                          placeholder="Instrument"
                      />
                  </div>
                  {is_valid() ? null : <Error error={"signup"} />}
                  <div className="buttons">
                      <button type="button" onClick={submit}>
                          Create account
                      </button>
                      <button type="button" onClick={() => setStatus("login")}>
                          Login
                      </button>
                  </div>
              </fieldset>
          </form>
      </div>
  );
};

