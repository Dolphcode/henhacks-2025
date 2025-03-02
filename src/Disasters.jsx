const DisasterWants = Object.freeze({
    BASEMENT: 0,
    OPEN_SPACE: 1,
    HIGH_GROUND: 2,
    LOW_GROUND: 3,
    ALONE: 4
})

class Disaster{
    constructor(name, want){
        this.name = name;
        this.want = want;
    }
    getName(){
        return this.name;
    }
}

const disaster_count = 6;
const earthquake = new Disaster('Earthquake', DisasterWants.BASEMENT);
const fire = new Disaster('Fire', DisasterWants.OPEN_SPACE);
const tornado = new Disaster('Tornado', DisasterWants.BASEMENT);
const flood = new Disaster('Flood', DisasterWants.HIGH_GROUND);
const smokestorm = new Disaster('Smoke Storm', DisasterWants.LOW_GROUND);
const pandemic = new Disaster('Pandemic', DisasterWants.ALONE);

function SelectRandomDisaster() {
    var disasters = [earthquake, fire, tornado, flood, smokestorm, pandemic];
    return disasters[Math.floor(Math.random() * disasters.length)];
}

function DisasterPrompt( { disaster } ) {
    return (
        <h2>{disaster.name} is happening. Where do you go?</h2>
    )
}

export {disaster_count, earthquake, fire, tornado, flood, smokestorm, pandemic, DisasterPrompt, SelectRandomDisaster, Disaster, DisasterWants};