import { useState } from 'react'
import './App.css'
import * as DisasterInfo from './Disasters.jsx'
import { DisasterPrompt } from './Disasters.jsx'
//import { Disaster } from './Disasters.jsx'
import { forest, hospital, house, lake, office, park, store, tallBuilding, townHall } from './Locations.jsx'



function ResponsePopUp({show, text}) {
  if (show) {
    return (
      <p>{text}</p>

    )
  } else {
    return null;
  }
}

function App() {
  const [ status, setStatus ] = useState(false);
  const [ text, setText ] = useState("");
  const [ currentDisaster, setCurrentDisaster ] = useState(DisasterInfo.earthquake);

  // A list of disasters that have been recently encountered
  // This list will clear once all disasters have been encountered
  const [ disastersEncountered, setDisastersEncountered ] = useState([])

  
  function RandomizeDisaster() {
    let currDisaster = DisasterInfo.SelectRandomDisaster();
    let tempDisastersEncountered = disastersEncountered;
    while (disastersEncountered.includes(currDisaster)) {
      currDisaster = DisasterInfo.SelectRandomDisaster();
    }
    setCurrentDisaster(currDisaster);
    
    // Set Disasters Encountered is the only way to modify this variable, so we re set it to an array
    // with the new item
    setDisastersEncountered([...disastersEncountered, currDisaster])
    tempDisastersEncountered.push(currDisaster);
    console.log(disastersEncountered);

    if (tempDisastersEncountered.length == DisasterInfo.disaster_count) {
      setDisastersEncountered([]);
    }

    setStatus(false);
    setText("");
  }
  

  function checkWin(location) {
    if (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.hasBasement()) {
      setStatus(true);
      setText("You survived!\n A building with a sturdy basement is a good place to be during a " + currentDisaster.name + ".");
    } else if (currentDisaster.want === DisasterInfo.DisasterWants.OPEN_SPACE && location.isOpenArea()) {
      setStatus(true);
      setText("You survived!\n An open area is a good place to be during a " + currentDisaster.name + ".");
    } else if (currentDisaster.want === DisasterInfo.DisasterWants.HIGH_GROUND && location.isHighGround()) {
      setStatus(true);
      setText("You survived!\n High ground is a good place to be during a " + currentDisaster.name + ".");
    } else {
      setStatus(true);
      setText("You died!");
    }
    
  }

  
  
  return (
    <>
        <DisasterPrompt 
          disaster = {currentDisaster}
        />
      <div className="options">
        <button onClick={() => checkWin(tallBuilding)}>
          Tall Building 
        </button>
      <button onClick={() => checkWin(house)}>
          House
        </button>
        <button onClick={() => checkWin(hospital)}>
          Hospital 
        </button>
        <button onClick={() => checkWin(park)}>
          Park 
        </button>
        <button onClick={() => checkWin(store)}>
          Store
        </button>
        <button onClick={() => checkWin(lake)}>
          Lake 
        </button>
        <button onClick={() => checkWin(forest)}>
          Forest 
        </button>
        <button onClick={() => checkWin(office)}>
          Office 
        </button>
        <button onClick={() => checkWin(townHall)}>
          Town Hall 
        </button>
        </div>


      <div className="card">
        <button onClick={RandomizeDisaster}>
          Randomize Disaster
        </button>
        <div>
          <ResponsePopUp
            show={status}
            text={text}
          />  
        </div>
      </div>
      <div>
        <p><b>Generic Team Name</b></p>
        <p>SafeHaven | HenHacks 2025</p>
      </div>
    </>
  )
}

export default App;
