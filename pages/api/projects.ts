import type { NextApiRequest, NextApiResponse } from 'next'

type Project = {title: String, description: String, tags?: String[]}

export default (req: NextApiRequest, res: NextApiResponse<Project[]>) => {
    res.status(200).json([
        {title: 'Portfolio website', description: 'You are looking at it!'},
    ]);
}