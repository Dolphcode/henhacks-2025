import { useState } from 'react';
import './App.css';
import * as DisasterInfo from './Disasters.jsx';
import { DisasterPrompt } from './Disasters.jsx';
import { forest, hospital, house, lake, office, park, store, tallBuilding, townHall } from './Locations.jsx';

import { GoogleMap } from '@react-google-maps/api'
import axios from 'axios';

/**
 * ResponsePopUp Component: Displays a pop-up message.
 * @param {boolean} show - Determines if the pop-up should be visible.
 * @param {string} text - The text to display in the pop-up.
 */
function ResponsePopUp({ show, text }) {
  if (show) {
    return <p>{text}</p>;
  } else {
    return null;
  }
}

/**
 * App Component: Main component for the disaster survival game.
 */
function App() {
  // State variables
  const [status, setStatus] = useState(false); // Game status (win/lose)
  const [text, setText] = useState(''); // Text to display in the pop-up
  const [currentDisaster, setCurrentDisaster] = useState(DisasterInfo.earthquake); // Current disaster
  const [aiResponse, setAiResponse] = useState(''); // AI-generated response
  const [disastersEncountered, setDisastersEncountered] = useState([]); // List of encountered disasters

  // Google Maps Interface
  async function CheckBuildingType(buildingType, searchCriteria) {
    let searchFormatted = searchCriteria.replace(" ", "%20")
    axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=' + searchFormatted + '&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&key=AIzaSyCdAWSnRqLcd1wFUtdKuNkfgxA3cIYIQvQ')
    console.log(response);
    const data = await response.json();
    console.log("eyo");
    console.log(data);
    if (data.status === "OK") {
        let latitude = data.candidates[0].geometry.location.lat;
        let longitude = data.candidates[0].geometry.location.lng;
        console.log('%f, %f', latitude, longitude);

        const nearby = await fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + '%2C' + longitude + '&radius=8000&type=' + buildingType + '&key=AIzaSyCdAWSnRqLcd1wFUtdKuNkfgxA3cIYIQvQ')
        console.log(nearby);
        const nearby_data = await nearby.json();
        if (nearby_data.status === "OK") {
          console.log(nearby_data.results.length + " " + buildingType);
          return nearby_data.results.length
        }
    }
    console.log("Something failed");
    return 0;
  }



  /**
   * RandomizeDisaster: Selects a random disaster, ensuring no repeats until all are encountered.
   */
  function RandomizeDisaster() {
    let currDisaster = DisasterInfo.SelectRandomDisaster();

    // Ensure no repeat disasters until all are encountered
    while (disastersEncountered.includes(currDisaster)) {
      currDisaster = DisasterInfo.SelectRandomDisaster();
    }

    setCurrentDisaster(currDisaster);
    setDisastersEncountered([...disastersEncountered, currDisaster]);

    // Reset encountered disasters if all are used
    if (disastersEncountered.length + 1 === DisasterInfo.disaster_count) {
      setDisastersEncountered([]);
    }

    // Reset status and text
    setStatus(false);
    setText('');
  }

  /**
   * generateAIResponse: Generates an AI response based on the prompt and user input.
   * @param {string} a - Additional information to include in the prompt.
   */
  async function generateAIResponse(a) {
    const apiKey = 'AIzaSyBeuxA68t_OwWLiStg2jDOiJ2-Bqmozc-I'; // Replace with your API key
    const modelName = 'gemini-2.0-flash';
    const prompt = `the user thought that ${a} Explain how to survive a ${currentDisaster.name} in two sentences as well`;

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      setAiResponse(result.response.text());
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiResponse('Error getting response from AI');
    }
  }

  /**
   * checkWin: Checks if the selected location is suitable for the current disaster.
   * @param {object} location - The selected location object.
   */
  function checkWin(location) {
    const isWin =
      (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.hasBasement()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.OPEN_SPACE && location.isOpenArea()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.HIGH_GROUND && location.isHighGround()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.isLowGround()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.LOW_GROUND && location.isLowGround()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.ALONE && location.isSoliditary());

    setStatus(true);
    generateAIResponse(
      `They thought that ${location.getBuilding()} was a good idea during a ${currentDisaster.getName()} was a good idea. give one sentence why they were ${
        isWin ? 'correct' : 'wrong'
      }. If they chose house, assume that it has a sturdy basement and good air filtration system, but do not make a comment about it in your response.`
    );
  }


  return (
    <>
      <div>
        <img src="src\assets\The_Survival_Blueprint_-_Logo-removebg-preview.png" alt="The Survival Blueprint Logo" width="10%" height="10%"/>
      </div>

      <DisasterPrompt disaster={currentDisaster} />
      <button onClick={() => CheckBuildingType("hospital", "1 Whitehouse Ave")}>Test Button</button>
      <div className="options">
        <button onClick={() => checkWin(tallBuilding)}>Tall Building</button>
        <button onClick={() => checkWin(house)}>House</button>
        <button onClick={() => checkWin(hospital)}>Hospital</button>
        <button onClick={() => checkWin(park)}>Park</button>
        <button onClick={() => checkWin(store)}>Store</button>
        <button onClick={() => checkWin(lake)}>Lake</button>
        <button onClick={() => checkWin(forest)}>Forest</button>
        <button onClick={() => checkWin(office)}>Office</button>
        <button onClick={() => checkWin(townHall)}>Town Hall</button>
      </div>
      <div className="card">
        <button onClick={RandomizeDisaster}>Randomize Disaster</button>
        <div>
          <ResponsePopUp show={status} text={text} />
        </div>
      </div>
      
      {status && <p>{aiResponse}</p>}
      <div>
        <p>---</p>
        <p>
          <b>The Survival Blueprint</b>
        </p>
        <p>Bunker Buddies | HenHacks 2025</p>
      </div>
    </>
  );
}

export default App;