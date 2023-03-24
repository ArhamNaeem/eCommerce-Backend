export const getAllProducts = (req:any,res:any) => {
    res.send('get all products')
}
export const getProduct= (req: any, res: any)=>{
    res.send("get a product");
}
export const addProduct = (req: any, res: any) => {
    res.send("add a products"); 
}
export const updateProduct = (req: any, res: any) => {
    res.send('update product')
}
export const deleteProduct = (req: any, res: any) => {
    res.send('delete product')
}
