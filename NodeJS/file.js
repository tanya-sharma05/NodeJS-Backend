const fs= require("fs"); // file system 

// ------------------ WRITE OPERATION ---------------------
// synchronous file creation
fs.writeFileSync("./test.txt","Hello world");
// override previous content 
fs.writeFileSync("./test.txt","Hello world, I'm Node JS");

// asynchronous file creation
// asyn function expects a callback and have void return type
// ------------------ TYPE 1 ---------------------
fs.writeFile("./test.txt","Hello world async",(err)=>{});
// ------------------ TYPE 2 ---------------------
const data= "Hello world";
fs.writeFile("./test.txt",data,(err)=>{});   


// ------------------ READ OPERATION ---------------------
// synchronous file reading
const resSync= fs.readFileSync("./contact.txt","utf-8");
console.log(res);

// asynchronous file reading
const resAsycn= fs.readFile("./contact.txt","utf-8",(err,res)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log(res);
    }
});


// ------------------ OTHER OPERATIONS ---------------------
console.log(fs.statSync("./test.txt"));
fs.mkdirSync("my-docs/a",{recursive:true});

// Blocking 
console.log("1");
const readS= fs.readFileSync("./contact.txt","utf-8");
console.log(read);
console.log("2");
console.log("3");
console.log("4");
console.log("5");
console.log("Hello");

// Non Blocking
console.log("1");
const read= fs.readFile("./contact.txt","utf-8",(err,res)=>{
    if(err) console.log("error");
    else console.log(res);
});
console.log("2");
console.log("3");
console.log("4");
console.log("5");
console.log("Hello");
