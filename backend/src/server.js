import express from 'express'
const app = express();
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path';
import { dbConnection } from '../config/dbConnection.js';

// files
import userRouter from './routes/auth.routes.js';
import addressRouter from './routes/address.routes.js'
import categoryRouter from './routes/category.routes.js';
import brandRouter from './routes/brand.routes.js';
import variantRouter from './routes/variant.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/Cart.routes.js';
import orderRouter from './routes/Order.routes.js';
import wishRouter from './routes/Wishlist.routes.js';
import uploadRouter from './routes/Upload.routes.js'


// dotenv configeration
dotenv.config();
const PORT = process.env.PORT || 1800;

// DB Connection
dbConnection(process.env.MONGO_URL).then(()=> {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err);
});

const _dirname = path.resolve();

// middlewares
app.use(cors({
    origin: "https://cartzone-jobq.onrender.com",
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


// endpoint
app.use("/api/v1/user", userRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/variant", variantRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/wish", wishRouter);
app.use('/api/upload', uploadRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});

// listen
app.listen(PORT, () => console.log(`server [STARTED] ~ http://localhost:${PORT}`));