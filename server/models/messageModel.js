import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{},
    reciverId:{},
    text:{},
    seen:{},
    createdAt:{},
})

const 