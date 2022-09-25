import connectDbMongo from "../../../../utils/connectDbMongo";
import Content from "../../../../models/Content";
import Playlist from "../../../../models/Playlist";
import ContentTypes from "../../../../utils/content-types"
import tags from "../../../../utils/tags";
import SelectedTags from "../../../../utils/selected-tags";

export default async(req, res)=>{

    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){

        if((req.query.type.length == 1) && ((ContentTypes.includes(req.query.type[0])) && (!tags["badge"].includes(req.query.specialTags) && (!SelectedTags["allTags"].includes(req.query.tags))))){
            let contents, multipleExist;
            try{
                contents = await Content.find({ContentType: req.query.type[0], ContentStatus: "active"}).sort({Position: -1});

                if("tags" in req.query && req.query.tags.length > 1){
                    multipleExist = req.query.tags.every(value => {
                        return SelectedTags["allTags"].includes(value);
                    });
    
                }
                if(multipleExist){
                    contents = await Content.find({ContentType: req.query.type[0], Tags: { $in : req.query.tags}, ContentStatus: "active"}).sort({Position: -1});
                }


                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }
        }
        else if((req.query.type.length == 1) && (SelectedTags["allTags"].includes(req.query.tags)) ){
            try{
                const contents = await Content.find({Tags: { $in : req.query.tags}, ContentStatus: "active", ContentType: req.query.type[0]}).sort({Position: -1});

                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }
        }
        else if((req.query.type.length == 1) && (tags["badge"].includes(req.query.specialTags))){
            try{
                const contents = await Content.find({SpecialTag: req.query.specialTags, ContentStatus: "active", ContentType: req.query.type[0]}).sort({Position: -1});

                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }
        }
        else if(req.query.type.length == 2 && ContentTypes.includes(req.query.type[0])){
            try{
                const contents = await Content.find({ContentType: req.query.type[0], SK: req.query.type[1], ContentStatus: "active"}).sort({Position: -1});

                res.status(200).json(contents[0])
            } catch(error){
                res.status(400).json({success: false});
            }
        }
        else if(req.query.type.length == 2){
            try{
                const contents = await Content.find({PlaylistID: req.query.type[0], SK: req.query.type[1], ContentStatus: "active"}).sort({Position: -1});

                res.status(200).json(contents[0])
            } catch(error){
                res.status(400).json({success: false});
            }
        }
        else{
            try{
                const contents = await Content.find({"PlaylistID": req.query.type});

                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }
        }
    }
}