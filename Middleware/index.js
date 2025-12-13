const express= require("express");
const users= require("./MOCK_DATA.json");
const app= express();
const fs= require("fs");
const port= 8000;

// ----------------------------------------------------------------------------------------------
// Middlewares 
app.use((req,res,next)=>{
    console.log("Hello middleware 1");
    // return res.json({msg:"Hello middle"}); // stop cycle by this msg
    next(); // forward to routes 
})

app.use((req,res,next)=>{
    console.log("Hello middleware 2");
    // return res.end("HEY");
    next();
})

// change to request and response object
app.use((req,res,next)=>{
    console.log("Hello middleware 1");
    req.myUserName= "aman"; // this will carry out through whole process
    next();
})

app.use((req,res,next)=>{
    console.log("Hello middleware 2",req.myUserName);
    next();
})

// Creating log file 
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.ip} ${req.method} ${req.path}`,(err,data)=>{
        next();
    })
});

// ----------------------------------------------------------------------------------------------
// Routes 
app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user= users.find((user)=> user.id===id);
    return res.json(user);
});

app.post("/api/users",(req,res)=>{
    const body= req.body;
    users.push({...body, id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success", id:users.length});
    })
});

app.patch("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const body= req.body;
    const index= users.findIndex((user)=>user.id===id);

    users[index]= {...users[index],...body};
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",user: users[index]});
    })
});

app.delete("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user= users.filter((user)=>user.id!==id);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(user),(err,data)=>{
        users.length=0;
        users.push(...user);
        return res.json({status:"success"});
    })
});

app.listen(port, ()=>{console.log(`Server started at port ${port}`)});
