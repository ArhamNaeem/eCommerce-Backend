import express from 'express'
export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return (res).status(400).send({ success: "false", msg: `error ${err}` });
};
