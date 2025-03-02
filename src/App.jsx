import { useState } from 'react'
import './App.css'
import * as DisasterInfo from './Disasters.jsx'
import { DisasterPrompt } from './Disasters.jsx'
//import { Disaster } from './Disasters.jsx'
import { house } from './Locations.jsx'

function eqalert() {
  LocationInfo.tallBuilding;
  alert('An earthquake');
}

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

  console.log("1")
  function RandomizeDisaster() {
    setCurrentDisaster(DisasterInfo.SelectRandomDisaster());
  }
  console.log("2")

  function checkWin(location) {
    if (currentDisaster.want === 'basement' && location.hasBasement()) {
      setStatus(true);
      setText("You survived!");
    } else if (currentDisaster.want === 'open space' && location.isOpenArea()) {
      setStatus(true);
      setText("You survived!");
    } else if (currentDisaster.want === 'high ground' && location.isHighGround()) {
      setStatus(true);
      setText("You survived!");
    } else if (currentDisaster.want === 'low ground' && location.isLowGround()) {
      setStatus(true);
      setText("You survived!");
    } else {
      setStatus(true);
      setText("You died!");
    }
    console.log("help");
  }
console.log("3")
  
  console.log("test");
  return (
    <>
        <DisasterPrompt 
          disaster = {currentDisaster}
        />
      <div className="card">
      <button onClick={() => checkWin(house)}>
          House
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
    </>
  )
}

export default App;
