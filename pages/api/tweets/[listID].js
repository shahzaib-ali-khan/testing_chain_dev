import connectDbMongo from "../../../utils/connectDbMongo";
import Tweet from "../../../models/Tweet";

export default async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){
        try{
            const tweets = await Tweet.find({"PK": req.query.listID});

            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        }        
    }

}