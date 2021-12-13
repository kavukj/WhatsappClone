import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import route from './routes/Router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
//Cannot use import statement outside a module. We get this error for this type of import.
//We need to write "type":"module" in package.json to resolve this.
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({extended: true }))

app.use('/', route);

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
Connection(username, password);

const PORT = 8000;
app.listen(PORT || process.env.PORT, () => {
    console.log(`Server connected on port ${PORT}`)
})
