import express from "express";
const setHeader = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

export default setHeader
