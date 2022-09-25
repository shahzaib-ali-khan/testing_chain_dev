import connectDbMongo from "../../../utils/connectDbMongo";
import Content from "../../../models/Content";


export default async(req, res)=>{
    const {method}=req;
    await connectDbMongo();

    try{
        const contents = await Content.find({ContentStatus: req.query.type}).sort({Position: 1});

        res.status(200).json(contents)
    } catch(error){
        res.status(400).json({success: false});
    }

}