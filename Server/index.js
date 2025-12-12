// ------------------------------------------------------------------------------------------
// Simple server with http
const http= require("http");

const myServer0= http.createServer((req,res)=>{
    console.log(req);
    res.end("hello from server");
});

myServer0.listen(8000,()=> console.log("server started!!"));


// ------------------------------------------------------------------------------------------
// Server with few functionalities 
const http= require("http");
const fs= require("fs");

const myServer1= http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return res.end(); // don't print anything

    // creating a log message
    const log= `${Date.now()}: ${req.url} New request received\n`;
    // writes log message into log.txt and updating it after every callback and adding new text without
    // deleting previous text
    fs.appendFile("log.txt", log ,(err,data)=>{
        // handling routes using switch 
        switch (req.url){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("I'm Node JS");
                break;
            default:
                res.end("404");
        }
    })
});

myServer1.listen(8000,()=> console.log("Server started!!"));


// ------------------------------------------------------------------------------------------
// Server with query parameters & understading URL concepts
const http= require("http");
const fs= require("fs");
const url= require("url");

const myServer2= http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return res.end(); 
    const log= `${Date.now()}: ${req.url} New request received\n`;

    const myUrl= url.parse(req.url,true); // parse string query parameters by true 
    console.log(myUrl);

    fs.appendFile("log.txt", log ,(err,data)=>{
        switch (myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const userName= myUrl.query.name;
                res.end(`Hello, ${userName}`);
                break;
            case "/search":
                const searchRes= myUrl.query.search_query;
                res.end("Here are your results for " + searchRes);
                break;
            default:
                res.end("404");
        }
    })
});

myServer2.listen(8000,()=> console.log("Server started!!"));

// ------------------------------------------------------------------------------------------
// Understanding HTTP methods
const http= require("http");
const fs= require("fs");
const url= require("url");

const myServer= http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return res.end(); 
    const log= `${Date.now()}: ${req.method} ${req.url} New request received\n`;
    const myUrl= url.parse(req.url,true); 
    console.log(myUrl);
    fs.appendFile("log.txt", log ,(err,data)=>{
        switch (myUrl.pathname){
            case "/":
                if(req.method==="GET") res.end("HomePage");
                break;
            case "/about":
                const userName= myUrl.query.name;
                res.end(`Hello, ${userName}`);
                break;
            case "/search":
                const searchRes= myUrl.query.search_query;
                res.end("Here are your results for " + searchRes);
                break;
            case "/signup":
                if(req.method==="GET") res.end("This is a signup form");
                else if(req.method==="POST") res.end("Successfully created");
                break;
            default:
                res.end("404");
        }
    })
});

myServer.listen(8000,()=> console.log("Server started!!"));
