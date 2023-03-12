const Note = require('../model/note');


const fetchNotes = async (req,res) => {
    const notes = await Note.find();

    res.send(notes);
}

const fetchNote = async(req,res) => {
    const id = req.params.id;
    const note = Note.findById(id);

    res.send(note);
}




const createNote = async (req,res) => {
    
    //get data from request body
    const title = req.body.title;
    const body = req.body.body;
    //create note with it

    const note = await Note.create({
        title: title,
        body:body
    })

    //respond with the new note
    res.send(note);
}




const updateNote = async(req, res) => {
    const id = req.params.id;

    const notes = await Note.findByIdAndUpdate(id,{
        title: req.body.title,
        body : req.body.body
    },{ new :true})

    res.send(notes);
}




const deleteNote = async(req, res) => {
    const id = req.params.id;
     const deletednote = await Note.findByIdAndDelete(id);
     
    //  if(deleteOne){
    //     res.send("removed")
    //  }

    if(deletednote){
        res.send(deletednote);
    }
}



module.exports = {
    fetchNotes:fetchNotes,
    fetchNote:fetchNote,
    createNote:createNote,
    updateNote:updateNote,
    deleteNote:deleteNote
}