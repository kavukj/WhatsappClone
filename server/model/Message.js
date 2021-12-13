import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const message = mongoose.model('message', MessageSchema);

export default message;