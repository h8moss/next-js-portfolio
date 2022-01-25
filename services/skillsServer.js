class Skill {
    constructor({ title, description }) {
        this.title = title;
        this.id = title.toLowerCase().replace(/\W/, '_');
        this.description = description;
    }
}

const skills = [
    new Skill({
        title: 'Flutter',
        description: 'I have been using flutter to build android and web applications with material design for a couple of years, I am very skilled with it',
    })
];

export { skills };