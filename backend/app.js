import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user-routes"
import blogRouter from './routes/blog-routes';

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
mongoose.connect(
    "mongodb+srv://admin:hqkWngNq4XrmEhZT@cluster0.ldmpry5.mongodb.net/?retryWrites=true&w=majority"
)
    .then(() => app.listen(5000))
    .then(() => console.log("Database has connected and app is listenning at localhost:5000"))
    .catch((err) => console.log(err));

// pass: hqkWngNq4XrmEhZT