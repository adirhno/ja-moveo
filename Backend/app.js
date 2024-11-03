const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const user = require('./routes/user.route');
const song = require('./routes/song.route');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');

//Middlewares
app.use(cors({ origin: 'https://ja-moveo-client.onrender.com', credentials: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//connect to mongoDB
mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true })
//  "mongodb://localhost:27017/bank"
.then(() => console.log("conneted to DB"))
.catch((err) => console.log(err));

//webSocket
let currentSong = null;
const io = socketIo(server, {
    cors: {
        origin: 'https://ja-moveo-client.onrender.com',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');
    if (currentSong) {
        socket.emit('songSelected', currentSong); 
    }

    socket.on('selectSong', (song) => {
        console.log("Song selected:", song);
        currentSong = song; 
        io.emit('songSelected', song); 
    });

    socket.on('quitSession', () => {
        console.log('Admin has quit the session');
        currentSong = null
        io.emit('quitSession'); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
// 	res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//     next()
// })

app.use('/user', user)
app.use('/song', song)
const port = 3001

server.listen(port, function () {
	console.log("Server up and running on port ",port);
});