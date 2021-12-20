import axios from 'axios';

const Url = 'https://whatsappcloneapp.herokuapp.com/'

const addUser = async (data) => {
    try {
        return await axios.post(`${Url}/add`, data)
    } catch (error) {
        console.log(error)
    }
}

export default addUser;

export const getUser = async () => {
    try {
        let response = await axios.get(`${Url}/user`)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${Url}/conversation/add`, data)
    } catch (error) {
        console.log(error)
    }
}

export const getConversationId = async (data) => {
    try {
        var response = await axios.post(`${Url}/conversationId`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const newMessage = async (message) => {
    try {
        await axios.post(`${Url}/message/add`, message)
    } catch (error) {
        console.log(error)
    }
}

export const getConversation = async(id) => {
    try{
        var response = await axios.get(`${Url}/message/get/${id}`)
        return response.data;
    }catch(error){
        console.log(error)
    }
}
