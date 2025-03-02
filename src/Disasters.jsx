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

function SelectRandomDisaster() {
    var disasters = [earthquake, fire, tornado, flood];
    return disasters[Math.floor(Math.random() * disasters.length)];
}

function DisasterPrompt( { disaster } ) {
    return (
        <p>A {disaster.name} is happening. What do you do?</p>
    )
}

export {earthquake, fire, tornado, flood, DisasterPrompt, SelectRandomDisaster};
