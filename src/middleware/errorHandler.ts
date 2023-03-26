export const errorHandler = (err:any,req:any,res:any,next:any) => {
    console.log('here')
   return res.status(400).send({ success: 'false', msg: `error ${err}` })
}