// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { invertors } from "../../../invertors";
enum InvertorPowerType {
    THREEPHASE = 'threephase',
    MONO = 'mono'
}
enum InvertorType {
    HYBRID = 'hybrid',
    OFFGRID= 'offgrid',
    ONGRID= 'ongrid'
}
type Data = {
    name: string,
    producer:string,
    pmax: number,
    width:number,
    height:number,
    depth:number,
    weight:number
    powerType:InvertorPowerType
    type: InvertorType
    price: number
}


export default (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req;
    const { query: { id } } = req;
    switch (method) {
        case 'GET':
            const record = invertors.find(el=>el.id===+id)
            if (record == undefined) {
                return res.status(404)
            }
            return res.status(200).json(record)
            break;
        case 'POST':
            res.json({ method: 'POST', endpoint: 'invertors' , id:id});
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}