import connectDbMongo from "../../../utils/connectDbMongo";
import User from "../../../models/User";
import jwt from "jsonwebtoken"

const KEY = "ghjsgdagfzdugfdhfljdshfidsufsd"

const response = async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    if(method === "POST"){
      try{
        const data = JSON.parse(JSON.stringify(req.body))
        const username = data.Username

        const token = jwt.sign({
          "Username": username, "CreatedAt": new Date()
        }, KEY)

        const user = await User.findOneAndUpdate({Username: data.Username, Password: data.Password}, { "Token" : "Token " + token, "TokenUpdatedAt": new Date()}, {new:true});

        res.status(201).json({Token: user["Token"]})
    }catch(error){
        res.status(400).json({success: false, error: error});
    }
  }
}

export default response;