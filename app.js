//express
const express = require("express");
const app = express();

//configure express app 
app.use(express.json());

//middelware
const requireAuth = require('./middleware/requirAuth')



//API
const notesController = require('./controllers/notesController');
const userController = require("./controllers/userController");

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//.env
require('dotenv').config()


//database connection
const connectDB = require('./config/connectDB');
connectDB();

//cross-origin sharing standard
var cors = require('cors')
app.use(cors())




// routing
app.get ('/notes', notesController.fetchNotes)
app.get ('/notes/:id', notesController.fetchNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote)

app.post('/notes/signup', userController.signup)
app.post('/notes/login', userController.login)
//app.get ('/notes/checkauth', requireAuth, userController.checkAuth) //this is not work
app.get ('/checkauth',requireAuth, userController.checkAuth)
app.get ('/logout', userController.logout)

// server start
app.listen(3001, (console.log('server is running on https://localhost:3001')));
