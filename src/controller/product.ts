import { Request, Response } from 'express';
import productModel from '../model/product';



class ProductController {
  public static async getproduct(req: Request, res: Response): Promise<void> {
    const product  = await productModel.find()
    try {
        res.send(product)
        console.log("All product")
    } catch (error) {
        console.log(error)
    }
  }


  public static async createProduct(req: Request, res: Response): Promise< void> {
    const payload=req.body
    try{
    const new_product=new productModel(payload)
    await new_product.save()
    res.status(400).send({msg:"product created"})
    }catch(error){
      res.status(400).send({msg:"something went wrong"})
    }
   
  }

  public static async updateProduct(req: Request, res: Response): Promise< void> {
   const prodid=req.params.id
   const payload=req.body
   try{
    console.log(prodid)
         await productModel.findByIdAndUpdate({_id:prodid},payload)
res.status(200).json({ message: 'Product updated successfully' });
   }catch(error){
    res.send("something went wrong")
    console.log({ message: 'something went wrong' });
   }

  
  }

  public static async deleteProduct(req: Request, res: Response):Promise<void> {
    const productid=req.params.id
    const payload=req.body
    try{
 const query= await productModel.findByIdAndDelete({_id:productid},payload)
 res.status(200).json({ message: 'Product deleted successfully' });
    }catch(error){
     res.send("something went wrong")
     console.log({ message: 'something went wrong' });
    }

  }
}

export default ProductController;
