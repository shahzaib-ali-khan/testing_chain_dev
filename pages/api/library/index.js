import connectDbMongo from "../../../utils/connectDbMongo";
import Library from "../../../models/Library";

const response = async(req,res)=>{

    const {method}=req;
    await connectDbMongo();

    switch(method){
        case 'GET':
            try{
                const libraries = await Library.find({});
                res.status(200).json(libraries)
            } catch(error){
                res.status(400).json({success: false});
            }
            break;
            case 'POST':
                try{
                    const data = req.body
                    const library = await Library.create({
                        Title: data.Title,
                        Author: data.Author,
                        Description: data.Description,
                        ContentMarkdown: data.ContentMarkdown,
                        PlaylistTitle: data.PlaylistTitle,
                        PlaylistID: data.PlaylistID,
                        SK: data.SK,
                        ContentType: data.ContentType,
                        Url: data.Url,
                        Img: data.Img,
                        Tag: data.Tag,
                        Position: data.Position,
                        Promoted: data.Promoted,
                        Live: data.Live,
                        Vertical: data.Vertical,
                        Provider: data.Provider,
                        Lists: data.Lists,
                        SpecialTag: data.SpecialTag,
                        Expdate: data.Expdate

                    });

                    res.status(201).json({success: true, data: library})
                }catch(error){
                    res.status(400).json({success: false});
                }
                break;
                default:
                    res.status(400).json({success: false});
                    break;
    }
}

export default response;