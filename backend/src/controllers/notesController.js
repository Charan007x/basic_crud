import Note from '../models/Note.js';
export async function getNotes(req, res) {
    try{
        const notes=await Note.find();
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({error:'Failed to fetch notes'});
    }
};
export async function getNoteById(req, res){
    try{
        const note=await Note.findById(req.params.id);
        res.status(200).json(note);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Failed to fetch note'});
    }
}
export async function createNote(req, res) {
    try{
        const {title,content}=req.body;
        const newNote=new Note({title,content});
        await newNote.save();
        res.status(201).json(newNote);
    }catch(err){
        res.status(500).json({error:'Failed to create note'});
    }
};

export async function updateNote(req, res) {
    try{
    const {title,content}=req.body;
    const updatedNote= await Note.findByIdAndUpdate(req.params.id, {title,content}, {new:true});
    res.status(200).json(updatedNote);
    }catch(err){
        res.status(500).json({error:'Failed to update note'});
    }
};

export async function deleteNote(req, res) {
    try{
        const deletedNote= await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Note deleted successfully'});
    }catch(err){
        res.status(500).json({error:'Failed to delete note'});
    }
};

