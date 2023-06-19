import encrypt from "encryptjs";
import User from "../modals/user.js";
import { idGenerator } from "generate-custom-id";
import axios from "axios";

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

        const{email,password}=req.body;
        if(!email) return res.send("email is required");
        if(!password) return res.send("password is required")

        const response = await User.find({email}).exec();
        if(!response.length) return res.send ("User not found");
        
        var secretkey="pin";

        var decipherkey =encrypt.decrypt(response[0].password,secretkey,256);
        if(decipherkey==password){
            const id = idGenerator("example",2);

            if(response[0].accesstoken){
                return res.send("token already generated")
            }
            else{
                await User.findOneAndUpdate({email},{accesstoken:id});
                setTimeout(async()=>{
                    await User.updateOne({email},{$unset:{accesstoken:1}});
                },60*1000);
                return res.send("key creates")
            }

            }
            else{
                return res.send("password not matched")
            }

        } 
    catch(error){
        return res.send(error);
    }
}

