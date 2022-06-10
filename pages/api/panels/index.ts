// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from "../../../data";
type Data = {
    name: string
}


export default (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            //res.json({ method: 'GET', endpoint: 'panels' });
            res.status(200).json(data)
            break;
        case 'POST':
            res.json({ method: 'POST', endpoint: 'panels' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}