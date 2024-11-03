import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { io } from 'socket.io-client';
import axios from 'axios';
import '../App.css';

const socket = io('http://localhost:3001'); 
function handleSelect(selected, setLiveSong, setLive ){
    axios.get(`http://localhost:3001/song/lyrics/${selected.name}`).then((response)=>{
      socket.emit('selectSong', response.data[0]);
        setLive(true)
    })
}

function renderRow({songs, setLiveSong, setLive, index, style}) {
const song = songs[index];
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={()=>{handleSelect(song, setLiveSong, setLive)}}>
        <ListItemText primary={`${index + 1}`} />
        <ListItemText primary={`${song.name}`} value={song.name}/>
        <ListItemText primary={`Author: ${song.author}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function Results({songs, setLiveSong, setSongs, setLive}) {

  function handleBackButton() {
    setLive(false);
    setSongs([]);
  }

  return (
    
   <div className='results'>
    <button className='results-back' onClick={handleBackButton}>back</button>
     <Box 
      sx={{ width: '100%', height: 400, maxWidth: 500, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={500}
        itemSize={60}
        itemCount={songs.length}
        overscanCount={5}
      >  
        {({ index, style }) => renderRow({ index, style, songs, setLiveSong, setLive })}
      </FixedSizeList>
    </Box>
   </div>
  );
}


