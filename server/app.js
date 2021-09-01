const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const usersRoutes = require("./api/users");
const postsRoutes = require("./api/posts");
const mongoose = require("mongoose");
const deprecatedErrors = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
const PORT = process.env.PORT || 5000;
const app = express();

// App Config

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.databaseUrl, deprecatedErrors, (err)=>{  
    if(err) {
        console.log(err)
        console.log("Cannot connect to database");
    }else {
        app.listen(PORT, () => console.log("The server is running and db is connected"))
    }
});

app.get('/', (req,res)=>{
    res.send("Welcome to random-app api");
})

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);