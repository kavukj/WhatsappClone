import express from 'express';
import conversation from '../model/Conversation.js';
import message from '../model/Message.js';
import user from '../model/User.js';

const route = express.Router();

route.post('/add', async (request, response) => {
    try {
        let exist = await user.findOne({ googleId: request.body.googleId })
        if (exist) {
            response.status(200).json("User already exists")
            return
        }
        const newUser = new user(request.body)
        await newUser.save();
        response.status(200).json('User Saved Successfully')
    } catch (error) {
        response.status(500).json(error)
    }
})

route.get('/user', async (request, response) => {
    try {
        const users = await user.find({})
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json("Cannot find users")
        console.log(error)
    }
})

route.post('/conversation/add', async (request, response) => {
    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;
    try {
        const exist = await conversation.findOne({ members: { $all: [senderId, receiverId] } })
        if (exist) {
            response.status(200).json("Converstaion already exists")
            return
        }
        const newConversation = new conversation({
            members: [senderId, receiverId]
        })
        await newConversation.save();
        response.status(200).json("Converstaion Connected")
    } catch (error) {
        console.log(error)
        response.status(500).json("Can't find the conversation")
    }
})

route.post('/conversationId', async (request, response) => {
    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;
    try {
        const conversationDetail = await conversation.findOne({ members: { $all: [senderId, receiverId] } })
        response.status(200).json(conversationDetail)
    } catch (error) {
        console.log(error)
        response.status(500).json("Unable to find conversation between two members")
    }
})

route.post('/message/add', async (request, response) => {
    const newMessage = message(request.body);
    try {
        await newMessage.save();
        await conversation.findByIdAndUpdate(request.body.conversationId,{message:request.body.text})
        response.status(200).json("Message Sent")
    } catch (error) {
        console.log(error)
        response.status(500).json("Message cannot be sent")
    }
})

route.get('/message/get/:id',async (request,response)=>{
    try{
        var messages = await message.find({conversationId:request.params.id})
        response.status(200).json(messages)
    }catch(error){
        console.log(error)
        response.status(500).json("No messages found for this id")
    }
})

export default route;


