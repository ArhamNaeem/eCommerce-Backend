import express from 'express'
import productRouter from './routes/products'
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hi')
})
app.use('/api/v1/products',productRouter)


app.listen(5000, () => {
    console.log('LISTENING ON PORT 5000');
    
})