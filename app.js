

const express = require("express")
const app = express ()

app.use (express.static("public"))  /

app.listen (3000, () =>{          
    console.log("servidor corriendo en puerto 3000")
})


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/index", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/login", (req,res)=>{
    res.sendFile(__dirname + "/views/login.html")
})

app.get("/productCart", (req,res)=>{
    res.sendFile(__dirname + "/views/productCart.html")
})

app.get("/productDetail", (req,res)=>{
    res.sendFile(__dirname + "/views/productDetail.html")
})

app.get("/register", (req,res)=>{
    res.sendFile(__dirname + "/views/register.html")
})