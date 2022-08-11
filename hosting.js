const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const fs = require("fs");

app.use("/static/styles", express.static(__dirname + "/static/styles"))
app.use("/static/scripts", express.static(__dirname + "/static/scripts"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/html/index.html"))
})

app.get("/file", (req, res) => {
    if (req.query.type == "text"){
        fs.readFile(__dirname + req.query.file, "utf-8", function(err, data) {
            res.send(data)
        })
    }
    else if (req.query.type == "file"){
        res.sendFile(__dirname + req.query.file,)
    }
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));