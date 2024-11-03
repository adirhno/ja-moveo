import axios from "axios";
import React, { useState } from "react";
import Error from "./Error";
import { ApiUrl } from '../config'

export default function Admin({setSongs}) {
  const [song, setSong] = useState("");
  const [error, setError] = useState(false);

  function handleSearch () {
   
    axios.get(`${ApiUrl}/song/${song}`).then((response)=>{
      setSongs(response.data)
  }).catch((error) => {
    if (error.status == 404) {
      setError(true);
    }
  });
  };

  return <div className="admin">
            <h1>Search any song...</h1>
            <div>{error?<Error error={"No results found"}/>:<></>}</div>
            <input className='searchInput' onChange={(e)=>{setSong(e.target.value)}} placeholder='enter song name'></input>
            <br></br>
            <button onClick={handleSearch}>Search</button>
         </div>;
}
