import connectDbMongo from "../../../../utils/connectDbMongo";
import Tweet from "../../../../models/Tweet";

const response = async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){
        try{
            const tweets = await Tweet.find({Pinned: 1});

            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        }        
    }

}

export default response;