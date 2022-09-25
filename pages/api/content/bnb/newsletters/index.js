import connectDbMongo from "../../../../../utils/connectDbMongo";
import Content from "../../../../../models/Content";
import validateToken from "../../../../../utils/validate-token";
import calculatePositionNo from "../../../../../utils/calculate-position-no";

const response = async(req,res)=>{
    const {method}=req;
    await connectDbMongo();


    switch(method){
        case 'GET':
            try{
                const contents = await Content.find({ContentType: "newsletters", ContentStatus: "active"}, {}).sort({Position: -1});
                //const contents = await Content.find({}, { _id: 0}).sort({ CreatedAt: -1, ContentType: "newsletter"});
                res.status(200).json(contents)

            } catch(error){
                res.status(400).json({success: false});
            }
            break;
            case 'POST':
                const token = req.headers['authorization']
                const isTokenValid = await validateToken(token)
                const position = await calculatePositionNo("newsletters")
                if(isTokenValid === true){
                    try{
                        const data = req.body
                        const content = await Content.create({
                            Title: data.Title,
                            Url: process.env.HOME_URL + '/newsletters/' + data.Title.replaceAll(' ', '-'),
                            SK: data.Title.replaceAll(' ', '-'),
                            Author: data.Author,
                            Position: position,
                            ContentStatus: "active",
                            ContentType: "newsletters",
                            ContentMarkdown: data.ContentMarkdown,
                            Description: data.Description,
                            Img: data.Img,
                            CreatedBy: data.CreatedBy,
                        });
                        res.status(201).json({success: true, data: content})
                    }catch(error){
                        res.status(400).json({success: false, error: error});
                    }
                }
                else{
                    res.status(403).json({success: false, data: "You do not have permission to add newsletter"})
                    break;
                }
                break;
                default:
                    res.status(400).json({success: false});
                    break;
    }
}

export default response;