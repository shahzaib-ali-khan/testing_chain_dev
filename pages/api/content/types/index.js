import connectDbMongo from "../../../../utils/connectDbMongo";
import ContentType from "../../../../models/ContentTypes";

export default async(req,res)=>{

    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){
        try{
            const contents = await ContentType.find({}, {_id: 0, Name: 1});
            var type = [];

            contents.forEach(function(contents) {
                type.push(contents["Name"]);
            });
            res.status(200).json(type)
        } catch(error){
            res.status(400).json({success: false});
        }
    }
    else{
        try{
            const data = req.body
            const contentType = await ContentType.create({
                Name: data.Name
            });

            res.status(201).json({success: true, data: contentType})
        }catch(error){
            res.status(400).json({success: false});
        }
    }
}