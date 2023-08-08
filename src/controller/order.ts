import express, { Request, Response } from 'express';
import orderModel from '../model/order';
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth';

const orderRouter = express.Router();

orderRouter.post('/add',auth, async (req: Request, res: Response) => {
  const payload= req.body;
  try {
    const data = new orderModel(payload);
    await data.save();
    res.status(200).send({ msg: "New order added" });
  } catch (err: any) {
    res.status(400).send({ msg: err.message });
  }
});

orderRouter.get('/', async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    console.log(token)
    if (token) {
      try {
        const decoded: any = jwt.verify(token, "kavita");
        if (decoded) {
          const orderData = await orderModel.find({ userID: decoded.userID }).sort({ date_of_purchase: -1 });
          res.status(200).send(orderData);
        } else {
          res.status(400).send({ msg: "Invalid Token !!" });
        }
      } catch (err: any) {
        res.status(400).send({ msg: "Invalid Token !!" });
      }
    } else {
      res.status(400).send({ msg: "Authentication failed" });
    }
  });

  export default orderRouter;