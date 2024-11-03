import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Admin from './components/Admin';
import Results from './components/Results';
import Player from './components/Player';
import Live from './components/Live';
import AdminSignup from './components/AdminSignup';
import { useState } from 'react';


function App() {
  const [ user, setUser ] = useState("")
  const [ admin, setAdmin ] = useState(false)
  const [ live, setLive ] = useState(false)
  const [ status, setStatus ] = useState("login")
  const [ songs, setSongs ] = useState([])
  const [ liveSong, setLiveSong ] = useState([])
  const [ currUser, setCurrUser ] = useState({})
  
  return (
    <div className="App">
     {live ? (
        <Live setLiveSong={setLiveSong} liveSong={liveSong} user={user} setLive={setLive} live={live} setSongs={setSongs} currUser={currUser}/>
    ) : (
        <>
            {status === "login" ? <Login setUser={setUser} setStatus={setStatus} setCurrUser={setCurrUser}/> : null}
            {status === "signup" ? (admin ? <AdminSignup /> : <Signup setStatus={setStatus} />) : null}
            {user === "admin" ? (
                songs.length > 0 ? <Results setSongs={setSongs} live={live} setLive={setLive} setLiveSong={setLiveSong} songs={songs} /> : <Admin setSongs={setSongs} />
            ) : null}
            {user === "player"? (live ? <Live live={live} setLiveSong={setLiveSong} liveSong={liveSong} user={user} setLive={setLive} setSongs={setSongs} currUser={currUser}/> :<Player setLive={setLive}/>) : null}
        </>
    )}
    </div>
  );
}

export default App;
