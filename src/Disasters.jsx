class Disaster{
    constructor(name, want){
        this.name = name;
        this.want = want;
    }
}

const earthquake = new Disaster('Earthquake', 'basement');
const fire = new Disaster('Fire', 'open space');
const tornado = new Disaster('Tornado', 'basement');
const flood = new Disaster('Flood', 'high ground');

function SelectRandomDisaster() {
    var disasters = [earthquake, fire, tornado, flood];
    return disasters[Math.floor(Math.random() * disasters.length)];
}

function DisasterPrompt( { disaster } ) {
    return (
        <p>{disaster.name} is happening. What do you do?</p>
    )
}

export {earthquake, fire, tornado, flood, DisasterPrompt, SelectRandomDisaster, Disaster};
