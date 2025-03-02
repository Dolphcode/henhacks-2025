import { useState } from 'react';
import './App.css';
import * as DisasterInfo from './Disasters.jsx';
import { DisasterPrompt } from './Disasters.jsx';
import { forest, hospital, house, lake, office, park, store, tallBuilding, townHall } from './Locations.jsx';


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
      (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.isLowGround());

    setStatus(true);
    generateAIResponse(
      `They thought that ${location.getBuilding()} was a good idea during a ${currentDisaster.getName()} was a good idea. give one sentence why they were ${
        isWin ? 'correct' : 'wrong'
      }.`
    );
  }

  return (
    <>
      <div>
        <img src="src\assets\The_Survival_Blueprint_-_Logo-removebg-preview.png" alt="The Survival Blueprint Logo" width="10%" height="10%"/>
      </div>

      <DisasterPrompt disaster={currentDisaster} />
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
          <b>Survival Blueprint</b>
        </p>
        <p>The Bunker Buddies | HenHacks 2025</p>
      </div>
    </>
  );
}

export default App;