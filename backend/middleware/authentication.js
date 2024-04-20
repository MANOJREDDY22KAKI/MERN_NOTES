import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    try{
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({msg: "No authentication token, authorization denied"});
        jwt.verify(token,"SECRET_KEY",(err,user) =>{
            if (err) return res.status(401).json({msg: "Token is not valid"});
            req.user = user;
            next(); 
        })


    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

export default authenticate