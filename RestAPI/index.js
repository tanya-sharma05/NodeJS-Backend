const express= require("express");
const users= require("./MOCK_DATA.json");
const app= express();
const fs= require("fs");
const port= 8000;

// middleware used as plugin
app.use(express.urlencoded({extended: false}));

/* This middleware is used to parse form data sent through HTML form tags. When this form is submitted, 
   the browser sends data in URL-encoded format.
   Express does NOT parse this automatically, so req.body would be undefined without this middleware.
   It converts URL-encoded request body → into a JavaScript object and puts it inside req.body.
*/

// ---------------------------------------------------------------------------------------------------
/* A hybrid server does 2 jobs:
   1. at "/users": render an html page (SSR), when it knows that surely a browser is a client
   2. at "/api/users": sends data as JSON, so that a mobile app and react can handle the client side
*/

app.get("/users",(req,res)=>{
    const html=`
    <ul>
       ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
// ---------------------------------------------------------------------------------------------------

// ------------------------------------- METHOD 1 --------------------------------------
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

// // ------------------------------------- METHOD 2 --------------------------------------
// // for same routes 
// app.route("/api/users/:id")
//    .get((req,res)=>{
//         const id= Number(req.params.id);
//         const user= users.find((user)=> user.id===id);
//         return res.json(user);
//    })
//    .put((req,res)=>{
//         return res.json({status:"pending"});   
//    })
//    .patch((req,res)=>{
//         return res.json({status:"pending"});
//    })
//    .delete((req,res)=>{
//         return res.json({status:"pending"});
//    });

app.listen(port, ()=>{console.log(`Server started at port ${port}`)});
