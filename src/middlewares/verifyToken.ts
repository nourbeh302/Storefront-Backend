import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    verify(token, process.env.SECRET_TOKEN as string);
    next();
    return;
  } catch (error) {
    res.sendStatus(401);
  }
};