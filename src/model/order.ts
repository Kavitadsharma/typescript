import { Schema,model } from "mongoose";


interface order{
    userID: String,
    product: String, //[{prod_id: , quantity: }]
    address: String,
    date_of_purchase: Date

}
const orderSchema=new Schema<order>({
  userID:{
    type:String,
    required:true
  },
  product:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  date_of_purchase:{
    type:Date,
    required:true
  },



})
const orderModel=model <order>("order",orderSchema)


  
  export default orderModel;