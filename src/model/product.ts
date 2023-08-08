
import { Schema,model } from "mongoose";

interface product{
  title:string;
  category:string;
  description:string;
  price:number
}
const productSchema=new Schema<product>({
  title:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  }


})



const productModel=model <product>("product",productSchema)




export default productModel;