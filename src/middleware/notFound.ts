import express from 'express'
export const notFound = (req: express.Request, res: express.Response) => {
    res.status(404).send('404 not found!')
}