require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts")
const userRouter = require("./routes/user");

app.use(cors({
    origin: process.env.FRONT
}));
app.use(express.json());





app.use("/posts", postsRouter);
app.use("/users", userRouter);



app.use((err, req, res) => {
    let {status = 500, message = "internal server error"} = err;
    res.status(status).json({message: message});
})



async function main() {
    try {
        let url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("connection succesfull");

        const port = process.env.PORT || 3002;
        app.listen(port, () => {
            console.log(`app is listening at ${port}`);
        })

    } catch (err) {
        console.log(err);
    }
}
main();










