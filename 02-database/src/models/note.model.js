import mongoose from "mongoose"

// Define Structure for the collection in database
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:100,
        minlenth:5
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

// Create "note" collection in the database 
const Note = mongoose.model("Note",noteSchema);

// Export the Model to use in other files
export default Note;


