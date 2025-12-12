// Defining mathematical functions
function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

// ------------------ TYPE 1 ---------------------
module.exports= add;
// overriden the add function 
module.exports= sub;

// ------------------ TYPE 2 ---------------------
// to avoid overriding return object 
module.exports= {
    add,
    sub
}

module.exports= {
    addFun: add,
    subFun: sub
}

// ------------------ TYPE 3 ---------------------
exports.add= (a,b) => a+b;
exports.sub= (a,b) => a-b;
