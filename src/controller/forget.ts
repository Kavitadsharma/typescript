import express, { Request, Response } from 'express';
import userModel from '../model/user';
import { createTransport } from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const forgetRoute = express.Router();
let tempEmail = '';

forgetRoute.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const checkUser = await userModel.find({ email });
    if (checkUser.length > 0) {
      tempEmail = email;
      console.log(tempEmail);
      const transporter = createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user:"kavitadsharma899107@gmail.com",
          pass: "xsmtpsib-744136105ae18c9bbfb31faf68ba92bdddf4b3204cb38dcc469921edecf9eb8d-x35KWLPNUAhC0rOB",
        },
      });

      const mailOptions = {
        from: "kavitadsharma899107@gmail.com",
        to: email,
        subject: 'Reset Password Link',
        text: 'Here is the link to reset your password',
        html: "Here is the link to reset your password: <a href='http://localhost:3000/forget/update'>Click to Reset</a>",
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({
            msg: "err.message",
          });
        } else {
          return res.status(200).send({
            msg: 'Email sent successfully',
          });
        }
      });
    } else {
      return res.status(400).send({
        msg: 'User not found',
      });
    }
  } catch (error) {
    res.status(404).send({
      msg: "error.message",
    });
  }
});
forgetRoute.patch("/update", async (req, res) => {
  try {
    const id = req.body.userID
    const { password } = req.body;

    const emailCheck = await userModel.findOne({ _id: id });
    console.log(emailCheck);
    if (emailCheck) {
      const hash = bcrypt.hashSync(password, 5);
      const passUpdate = await userModel.findByIdAndUpdate(emailCheck._id, { password: hash });
      return res.status(200).send({
        msg:"Password updated successfully"
      })
    } else {
      return res.status(400).send({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg:" error.message",
    });
  }
});

export default forgetRoute;
