// Basic code to print JS
console.log("Hello world");
console.log(3+4);

// Error because add function is not defined 
console.log(add(2,3));
// Define mathematical functions in other file and import it (without exporting from math it'll not work)

// ------------------ TYPE 1 ---------------------
const math= require("./math");
// for single function
console.log(math(2,3));

// for multiple functions return object 
console.log(math.add(2,3));
console.log(math.sub(2,3));

console.log(math.addFun(2,3));
console.log(math.subFun(1,0));

console.log(math);
// for directly exporting functions (Type 3)
console.log(math.add(2,3));
console.log(math.sub(1,0));

// ------------------ TYPE 2 ---------------------
const {add,sub}= require("./math");
console.log(add(2,3));
console.log(sub(1,0));