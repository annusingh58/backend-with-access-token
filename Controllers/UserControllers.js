import encrypt from "encryptjs";
import User from "../modals/user.js";
import { idGenerator } from "generate-custom-id";

export const register =async(req,res)=>{
    try{

        const { name,email ,password,accesstoken}=req.body;
        if(!name)return res.send("name is required");
        if(!email)return res.send("email is required");
        if(!password)return res.send("password is required");
        

        const response =await User.find({email}).exec();

        if(response.length) return res.send("email already exist enter new email id");

        var secretkey="pin";
        var encryptkey=encrypt.encrypt(password,secretkey,256);

        const id =idGenerator("example",2)

        const data=new User({
            name,
            email,
            password:encryptkey,
            accesstoken:id
        });

        await data.save();

        setTimeout(async()=>{
            await User.updateOne({email},{$unset:{accesstoken:1}});
        },2*60*1000);
        return res.send("registeration done")

    } 
    catch(error){
        return res.send(error);
    }

}



export const regeneratekey =async(req,res)=>{
    try{

        const{email,_id}=req.body;
        if(!email)return res.send("email is required");
        if(!_id)return res.send("_id is required")

        const response =await User.find({email}).exec();
        (!response.length)return res.send("user not found");

    }
    catch(error){
        return res.send(error);
    }
}
