import express from 'express';

import  mongoose from 'mongoose';

import cors from 'cors';

import { PORT, MONGODB_URL } from './config.js';

import userRoutes from './routes/userRoutes.js';

import notesRoutes from './routes/notesRoutes.js';

import path from 'path';


const app = express()

app.use(express.json())
app.use(cors())

app.use('/notes',notesRoutes);

app.use('/users',userRoutes);


app.get('/',(req,res)=>{
    res.send('hello world');
})


mongoose.connect(MONGODB_URL)
    .then(() =>{
        console.log('Mongodb connected')
        app.listen(PORT, () =>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) =>{
        console.log(err)
    })

