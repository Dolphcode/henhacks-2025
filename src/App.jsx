import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as DisasterInfo from './Disasters.jsx'
import { DisasterPrompt } from './Disasters.jsx'
import * as LocationInfo from './Location.jsx'

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
  const [count, setCount] = useState(0);
  const [ currentDisaster, setCurrentDisaster ] = useState(DisasterInfo.earthquake);

  function RandomizeDisaster() {
    setCurrentDisaster(DisasterInfo.SelectRandomDisaster())
  }

  function OnEarthquake() {
    setStatus(true);
    setText("An earthquake occurred");
  }

  function Reset() {
    setStatus(false);
    setText("");
  }
  console.log("test");
  return (
    <>
      
      <DisasterPrompt 
        disaster={currentDisaster}
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={OnEarthquake}>
          Earthquake
        </button>
        <button onClick={Reset}>
          Reset
        </button>
        <button onClick={RandomizeDisaster}>
          Randomize Disaster
        </button>
        <div>
          <ResponsePopUp
            show={status}
            text={text}
          />
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App;
