const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config();
const user = require('./routes/user.route')
const song = require('./routes/song.route')

mongoose.connect( process.env.MONGODB_URI, {
    useNewUrlParser: true,
})
//  "mongodb://localhost:27017/bank"
.then(() => console.log("conneted to DB"))
.catch((err) => console.log(err));

app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
// 	res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//     next()
// })
// app.use(cookieParser());
app.use('/user', user)
app.use('/song', song)
const port = 3001

app.listen(port, function () {
	console.log("Server up and running on port ",port);
});