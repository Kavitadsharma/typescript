import { Schema,model } from "mongoose";


interface user{
  name:string;
  email:string;
  password:string;
  mobilenumber:number;
  validation:boolean
}
const userSchema=new Schema<user>({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  mobilenumber:{
    type:Number,
    required:true
  },
  validation : Boolean


})
const userModel=model <user>("user",userSchema)

// class User {
//     public id: number=0;
//     public name !:string;
//     public username !: string;
//     public email !:string;
//     public password !: string;
//   }
  
  export default userModel;
  