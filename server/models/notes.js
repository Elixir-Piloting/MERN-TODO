const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(

    {user_id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true

    },
    content:{
        type: String,
        required: true

    },
    noteStatus:{
        type: String,
        required: true,
        default: "pending"
    },
    isDeleted:{
        type: Boolean,
        required: true,
        default: false
    }



},
{timestamps: true}

);


const Note = mongoose.model("Notes", notesSchema);

module.exports = Note;