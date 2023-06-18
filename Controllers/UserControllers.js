import encrypt from "encryptjs";

export const register =async(req,res)=>{
    try{

        const { name,email ,password}=req.body;
        if(!name)return res.send("name is required");
        if(!email)return res.send("email is required");
        if(!password)return res.send("password is required");

        const response =await UserActivation.find({email}).exec();

        if(response.length) return res.send("email already exist enter new email id");

        var secretkey="pin";
        var encryptkey=encrypt.encrypt(password,secretkey,256);

        const data=new user({
            name,
            email,
            password:encryptkey
        });
        await data.save();

    } 

}
