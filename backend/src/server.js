import express from 'express'
const app = express();
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { dbConnection } from '../config/dbConnection.js';

// files
import userRouter from './routes/auth.routes.js'

// dotenv configeration
dotenv.config();
const PORT = process.env.PORT || 1800;

// DB Connection
dbConnection(process.env.MONGO_URL).then(()=> {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err);
})

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


// endpoint
app.use("/api/v1/user", userRouter);

// listen
app.listen(PORT, () => console.log(`Server started at ${PORT}`));