const adminAuth = (req,res, next) => {
    console.log("admin authorisation is getting checked ");
    const token = "xyz";
    const isAdminAuthrozed = token === "xyz";
    if(!isAdminAuthrozed){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

const userAuth = (req,res, next) => {
    console.log("user authorisation is getting checked ");
    const token = "xyz";
    const isAdminAuthrozed = token === "xyz";
    if(!isAdminAuthrozed){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}


module.exports = {
    adminAuth,
    userAuth
    
}