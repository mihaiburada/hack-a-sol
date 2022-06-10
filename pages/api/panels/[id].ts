// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
enum PanelType {
    POLY = 'poly',
    MONO = 'mono'
}
type Data = {
    name: string,
    producer:string,
    pmax: number,
    width:number,
    height:number,
    depth:number,
    weight:number
    type: PanelType
    price: number
}


export default (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req;
    const { query: { id } } = req;
    switch (method) {
        case 'GET':
            res.json({ method: 'GET', endpoint: 'panels' , id: id});
            break;
        case 'POST':
            res.json({ method: 'POST', endpoint: 'panels' , id:id});
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}