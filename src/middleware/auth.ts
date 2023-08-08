import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      jwt.verify(token, "kavita", (err: any, decoded: any) => {
        if (err) {
          res.status(400).send({
            msg: 'Invalid token. Please login',
          });
        } else {
          req.body.userID = decoded.userID;
          next();
        }
      });
    } else {
      return res.status(401).send({
        msg: 'Access Denied/Not Authorized. Please login',
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "error.message",
    });
  }
};

export default auth;

