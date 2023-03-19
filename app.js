//express
const express = require("express");
const app = express();

//configure express app 
app.use(express.json());

//API
const notesController = require('./controllers/notesController');
const userController = require("./controllers/userController");

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// server start
app.listen(3001, (console.log('server is running on https://localhost:3001')));
