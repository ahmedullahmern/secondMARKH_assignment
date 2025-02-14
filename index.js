import express from "express"
import mongoose from "mongoose";
import 'dotenv/config';
import cors from 'cors';
import contactRoutes from './routes/contact.js'
const app = express()
const PORT = 3000;

mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log("DB Connected")
}).catch((e) => {
    console.log("error in DB ==>", e)
})

app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

console.log("MONGO DB URL==>", process.env.MONGODBURL)

app.listen(PORT, () => console.log("servere is running PORT" + PORT))