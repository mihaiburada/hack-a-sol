// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PythonShell } from 'python-shell'
import { execSync, spawn } from 'child_process'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            execSync('cd /Users/silviumanzur/Documents/work/hacktm/rooftop-detection-python/ && python3 rooftop.py');

            res.status(200).json({})
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}