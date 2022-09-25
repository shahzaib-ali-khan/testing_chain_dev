import connectDbMongo from "../../../../utils/connectDbMongo";
import Tweet from "../../../../models/Tweet";

export default async(req, res)=>{
    const {method}=req;
    await connectDbMongo();

    if(method === 'PATCH'){
        try{
            const updateAllTweets = await Tweet.updateMany({}, {"Pinned": 0})
            const tweets = await Tweet.findOneAndUpdate({id: req.query.tweetID}, {"Pinned": 1});

            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        }        
    }

}