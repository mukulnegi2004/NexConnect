require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts")

app.use(cors({
    origin: process.env.FRONT
}));
app.use(express.json());





app.use("/posts", postsRouter);





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










