// import the express library from the npm 
import express from 'express';
// import the mongoose model used to interact with the Notes Collections
import Note from '../models/note.model.js'


// create an instance of the express application
const app = express();

// Use Middlewrre to parse the incoming Buffer(raw stream data) into js object
// populate the req with ".body" 
app.use(express.json());


// Define a GET route for root URL "/"
app.get("/api/health", (req, res)=>{
    // Send json respose back to the client
    res.json({message:"Hello User , Rex started learning backend!!"});
})

// POST API: add a note in the MongoDB collection
app.post("/api/notes", async (req,res)=>{
    // Extract the title & desc from client req body
    const {title, description} = req.body
    // Create new "note" document in mongoDB using the provided data
    const note = await Note.create({
        title:title,
        description:description
    })
    // Return the HTTP res-201(created) along with the message & note
    return res.status(201).json({
        message:"Note created successfully",
        data:{
            note
        }
    })
})

//Get API: Fetch all the notes
app.get("/api/notes",async (req,res)=>{
    // Retrive all the notes from the database
    const notes = await Note.find()
    // Return HTTP res-200(ok) , along with the message & list of notes
    return res.status(200).json({
        message:"Notes fetched successfully from the database",
        data:{
            notes
        }
    })
})

// Delete API: Delete a certain note by id
app.delete("/api/notes/:id",async (req,res)=>{
    // get the note id from the params in url
    const id = req.params.id
    // find the note by id and delete from the database collection
    await Note.findByIdAndDelete(id)
    // return HTTP res-204 along with message & data
    return res.status(204).json({
        message:"Note deleted successfully"
    })
})

// Patch API :Partially Update a certain note by id
app.patch("/api/notes/:id", async (req,res)=>{
    // get the id from the url 
    const id = req.params.id
    // get the new description needed to update in the existing note
    const description = req.body.description
    // find the note by id and update the description
    const note = await Note.findByIdAndUpdate(
        id,
        {description},
        {returnDocument:"after", runValidators:true} //returns the updated note after validating the defined schemas
    )
    // return HTTP status 200 with the updated note
    res.status(200).json({
        message:"Note updated succesfully",
        data:{
            note
        }
    })

})

// PUT API: To completely replace the existing note in the collection

// export the app to use in other applications
export default app;

