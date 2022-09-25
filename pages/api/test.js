import connectDbMongo  from "../../utils/connectDbMongo";

connectDbMongo();

export default async(req,res)=>{
    res.json({test:'test'});
}