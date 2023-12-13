import mongoose,{connect} from "mongoose";


function connects(){
    return connect("mongodb+srv://kavitadsharma899107:<password>@cluster0.junbtiy.mongodb.net/typescript?retryWrites=true&w=majority")
    .then(()=>{
        console.log("db connected")
    }).catch((error:any)=>{
        console.log(error)
    })
}


export default connects
