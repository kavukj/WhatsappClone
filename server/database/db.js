import mongoose from 'mongoose';

const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@devconnector-shard-00-00.fankf.mongodb.net:27017,devconnector-shard-00-01.fankf.mongodb.net:27017,devconnector-shard-00-02.fankf.mongodb.net:27017/WhatAppClone?ssl=true&replicaSet=atlas-73e04r-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

export default Connection;