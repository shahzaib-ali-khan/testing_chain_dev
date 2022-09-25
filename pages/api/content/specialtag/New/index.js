import connectDbMongo from "../../../../../utils/connectDbMongo";
import Content from "../../../../../models/Content";

const response = async(req,res)=>{

    const {method}=req;
    await connectDbMongo();

    if(method === 'GET'){
        try{
            const contents = await Content.find({"SpecialTag": "New"});

            res.status(200).json(contents)
        } catch(error){
            res.status(400).json({success: false});
        }
    }
}

export default response;