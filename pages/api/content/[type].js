import connectDbMongo from "../../../utils/connectDbMongo";
import Content from "../../../models/Content";


const response = async(req,res)=>{
    const {method}=req;
    await connectDbMongo();
    var contents;
    try{
        if("url" in req.query){
            contents = await Content.findOne({Url: req.query.url});
        }else{
            contents = await Content.find({ContentStatus: req.query.type});
        }

        res.status(200).json(contents);
    } catch(error){
        res.status(400).json({success: false});
    }
}

export default response;