import connectDbMongo from "../../../utils/connectDbMongo";
import User from "../../../models/User";

export default async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){
        try{
            const user = await User.findOne({"PublicKey": req.query.publicKey});
            
            res.status(200).json(user)
        } catch(error){
            res.status(400).json({success: false});
        }        
    }

}