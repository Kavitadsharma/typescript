import { Request, Response } from 'express';
import userModel from '../model/user';
import bcrypt from 'bcrypt';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
dotenv.config();
let str = ""
let k =generateOTP()

class UserController {
  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, mobilenumber } = req.body;
      str = email
      const userCheck = await userModel.findOne({ email });
      if (userCheck) {
        res.status(401).json({ msg: 'User Already Registered, Please Login!' });
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          const newUser = new userModel({ name, email, password: hash, mobilenumber, validation: false });
          await newUser.save();

          const transporter = createTransport({
            host: "smtp-relay.sendinblue.com",
            port:587,
            auth: {
              user: "kavitadsharma899107@gmail.com",
              pass: "xsmtpsib-744136105ae18c9bbfb31faf68ba92bdddf4b3204cb38dcc469921edecf9eb8d-x35KWLPNUAhC0rOB",
            },
          });

          const mailOptions = {
            from: "kavitadsharma899107@gmail.com",
            to: email,
            subject: 'Welcome Message',
            html: `Congratulations! Your account registration has been successfully completed. Please proceed to login. your otp is ${k},..Verify your email by clikcing here <a href='http://localhost:3000/users/'>Click to Verify</a>`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(err);
              res.status(500).send({ msg: 'Email sending failed' });
            } else {
              res.status(200).send({ msg: 'User Successfully Registered' });
            }
          });
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: 'Error occurred while signing up user' });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const {email, password} = req.body
      const userCheck = await userModel.findOne({email})
      if(userCheck?.validation){

        if(userCheck ){
          bcrypt.compare(password, userCheck.password, (err, result)=>{
            if(result){
                const token = jwt.sign({userID: userCheck._id}, "kavita", {expiresIn:"7d"})
                return res.status(200).send({
                    msg:"Login Success",
                    token: token
                })
            }else{
                return res.status(401).send({
                    msg:"Invalid password"
                })
            }
          })
    }else{
         res.status(401).send({
            msg:"No User Found, Please Register First!"
        })
    }

      }else{
         res.status(401).send({
          msg:"Email Not Verified"
         })
      }
 
  } catch (error) {
       res.status(401).send({
          msg:"error.message"
      })
  }
  }

  public static async getproduct(req: Request, res: Response): Promise<void> {
    try {
      const userCheck = await userModel.findOne({ email: str });
      if (!userCheck) {
        res.status(401).json({ msg: 'User not found' });
        return;
      }
      userCheck.validation = true;
      await userCheck.save();
      res.status(200).json({ msg: 'User validation updated successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
}






function generateOTP(): string {
  const digits = '0123';
  let otp = '';
  for (let i = 0; i < digits.length; i++) {
    otp += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return otp;
}


export default UserController;
