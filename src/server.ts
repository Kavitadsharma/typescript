import express from 'express';
import userRouter from './route/user';
import productRouter from './route/product';
import forgetRoute from './controller/forget';
import connects from "./config/db"
import orderRouter from './controller/order';
import auth from './middleware/auth';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';




const app = express();
const port = 3000;
connects()
// Middleware to parse JSON bodies
app.use(express.json());
app.use((cors()))

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/forget', auth, forgetRoute);
app.use('/order',orderRouter)


// razorpay//

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret:process.env.key_secret

});


app.post('/createOrder', (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err: any, order: any) => {
      if (!err) {
        console.log(order.id);
        res.json(order);
      } else {
        res.send(err);
      }
    }
  );
});
app.post('/verifyOrder', (req, res) => {
  const { order_id, payment_id } = req.body;
  const razorpay_signature = req.headers['x-razorpay-signature'] as string;
  const key_secret = process.env.RAZORPAY_KEY_SECRET as string;
  let hmac = crypto.createHmac('sha256', key_secret);
  hmac.update(order_id + '|' + payment_id);
  const generated_signature = hmac.digest('hex');

  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: 'Payment has been verified' });
  } else {
    res.json({ success: false, message: 'Payment verification failed' });
  }
})



// razorpay end

// Start the server
app.listen(port,  () => {
//   try{
//     await connection
//     console.log("connected to db")
//   }catch(error){
// console.log("not able to connect with db")
// console.log(error)
//   }
  console.log(`Server running on port ${port}`);
});
