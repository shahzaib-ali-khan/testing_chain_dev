import connectDbMongo from "../../../../utils/connectDbMongo";
import Playlist from "../../../../models/Playlist";
import validateToken from "../../../../utils/validate-token";


export default async(req,res)=>{
    const {method}=req;
    await connectDbMongo();

    switch(method){
        case 'GET':
            try{
                const playlists = await Playlist.find({});

                res.status(200).json(playlists)
            } catch(error){
                res.status(400).json({success: false});
            }
            break;
            case 'POST':
                const token = req.headers['authorization']
                const isTokenValid = await validateToken(token)
                if(isTokenValid === true){

                    try{
                        const data = req.body
                        const playlist = await Playlist.create({
                            Title: data.Title,
                            Author: data.Author,
                            Description: data.Description,
                            Tags: data.Tags,
                            Provider: data.Provider
                        });

                        res.status(201).json({success: true, data: playlist})
                    }catch(error){
                        res.status(400).json({success: false, error: error});
                    }
                }else{
                    res.status(403).json({success: false, data: "You do not have permission to add playlist"})
                    break;
                }
                break;
                default:
                    res.status(400).json({success: false, error: "Sorry, try again with different method"});
                    break;
    }
}