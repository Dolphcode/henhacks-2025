import { useState } from 'react'
import './App.css'
import * as DisasterInfo from './Disasters.jsx'
import { DisasterPrompt } from './Disasters.jsx'
import { Disaster } from './Disasters.jsx'
import { house } from './Locations.jsx'


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

  function RandomizeDisaster() {
    setCurrentDisaster(DisasterInfo.SelectRandomDisaster());
  }


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
  }

  
  console.log("test");
  return (
    <>
      <DisasterPrompt 
        disaster ={currentDisaster}
      />
      <div className="card">
        <button onClick={checkWin(house)}>
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
