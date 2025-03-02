const DisasterWants = Object.freeze({
    BASEMENT: 0,
    OPEN_SPACE: 1,
    HIGH_GROUND: 1
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

const earthquake = new Disaster('earthquake', DisasterWants.BASEMENT);
const fire = new Disaster('fire', DisasterWants.OPEN_SPACE);
const tornado = new Disaster('tornado', DisasterWants.BASEMENT);
const flood = new Disaster('flood', DisasterWants.HIGH_GROUND);

function SelectRandomDisaster() {
    var disasters = [earthquake, fire, tornado, flood];
    return disasters[Math.floor(Math.random() * disasters.length)];
}

function DisasterPrompt( { disaster } ) {
    return (
        <p>A {disaster.name} is happening. What do you do?</p>
    )
}

export {earthquake, fire, tornado, flood, DisasterPrompt, SelectRandomDisaster, Disaster, DisasterWants};