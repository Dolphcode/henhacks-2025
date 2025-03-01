class Disaster{
    constructor(name, want){
        this.name = name;
        this.want = want;
    }
}

const earthquake = new Disaster('earthquake', 'basement');
const fire = new Disaster('fire', 'open space');
const tornado = new Disaster('tornado', 'basement');
const flood = new Disaster('flood', 'high ground');

export {earthquake, fire, tornado, flood};
