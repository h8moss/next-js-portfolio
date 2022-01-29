import type { NextApiRequest, NextApiResponse } from 'next'


class Project {

    constructor({ title, description, tags=[]}) {
        this.title = title;
        this.description = description;
        this.tags = tags;
    }

    title: String;
    description: String;
    tags: String[];
}

export default (req: NextApiRequest, res: NextApiResponse<Project[]>) => {
    res.status(200).json([
        new Project({title: 'Portfolio website', description: 'You are looking at it!'}),
    ]);
}