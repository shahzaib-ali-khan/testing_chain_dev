import connectDbMongo  from "../../utils/connectDbMongo";

connectDbMongo();

const response = async(req,res)=>{
    res.json({test:'test'});
}

export default response;