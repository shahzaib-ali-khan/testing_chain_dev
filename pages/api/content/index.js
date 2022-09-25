import connectDbMongo from "../../../utils/connectDbMongo";
import Content from "../../../models/Content";
import random_sk from "../../../utils/generate-random-sk";
import calculatePositionNo from "../../../utils/calculate-position-no";


export default async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    switch(method){
        case 'GET':
            try{
                const contents = await Content.find({ContentStatus: "active"}).sort({Position: 1});

                res.status(200).json({success:true, data: contents})
            } catch(error){
                res.status(400).json({success: false});
            }
            break;
            case 'POST':
                try{
                    const get_random_sk = await random_sk()
                    const data = JSON.parse(req.body)
                    const position = await calculatePositionNo(data.ContentType)
                    const content = await Content.create({
                        Title: data.Title,
                        Author: data.Author,
                        Description: data.Description,
                        SK: get_random_sk,
                        ContentType: data.ContentType,
                        ContentStatus: "inactive",
                        ContentMarkdown: '',
                        Position: position,
                        List: data.List,
                        Url: data.Url,
                        Tags: data.Tags,
                        Vertical: data.Vertical,
                        SpecialTag: data.SpecialTag
                    });

                    res.status(201).json({success: true, data: content})
                }catch(error){
                    res.status(400).json({success: false, error: error});
                }
                break;
            case 'PUT':
                try{
                    const data = JSON.parse(req.body)[0]
                    await Content.updateMany({ ContentType: data.ContentType }, { $set: { SpecialTag: "0" } });
                    data["SpecialTag"] = data["SpecialTag"] != "" ? data["SpecialTag"]: "0"
                    const content = await Content.findOneAndUpdate({SK: data.SK}, data, {
                        returnOriginal: false
                    });

                    res.status(200).json(content)
                }catch(error){
                    res.status(400).json({success: false, error: error});
                }
                break;

                default:
                    res.status(400).json({success: false, error: "Something went wrong"});
                    break;
    }
}