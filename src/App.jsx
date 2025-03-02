import { useState } from 'react';
import './App.css';
import * as DisasterInfo from './Disasters.jsx';
import { DisasterPrompt } from './Disasters.jsx';
import { house } from './Locations.jsx';

function ResponsePopUp({ show, text }) {
  if (show) {
    return <p>{text}</p>;
  } else {
    return null;
  }
}

function App() {
  const [status, setStatus] = useState(false);
  const [text, setText] = useState('');
  const [currentDisaster, setCurrentDisaster] = useState(DisasterInfo.earthquake);
  const [aiResponse, setAiResponse] = useState("");

  function RandomizeDisaster() {
    setCurrentDisaster(DisasterInfo.SelectRandomDisaster());
  }

  async function generateAIResponse(a) {
    const apiKey = 'AIzaSyBeuxA68t_OwWLiStg2jDOiJ2-Bqmozc-I'; // Replace with your API key
    const modelName = 'gemini-2.0-flash';
    const prompt = 'the user though that'+ a +'Explain how to survive a ' + currentDisaster.name  + ' in two sentences as well';

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      setAiResponse(result.response.text());
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiResponse("Error getting response from AI");
    }
  }

  function checkWin(location) {
    if (
      (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.hasBasement()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.OPEN_SPACE && location.isOpenArea()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.HIGH_GROUND && location.isHighGround()) ||
      (currentDisaster.want === DisasterInfo.DisasterWants.BASEMENT && location.isLowGround())
    ) {
      setStatus(true);
      generateAIResponse("They thought that " + location.getBuilding() + "was a good idea during a " +currentDisaster.getName() +" was a good idea. give one sentence why they were correct." );
    } else {
      setStatus(true);
      generateAIResponse("They thought that " + location.getBuilding() + "was a good idea during a " +currentDisaster.getName() +" was a good idea. give one sentence why they were wrong." );
    }
  }

  return (
    <>
      <DisasterPrompt disaster={currentDisaster} />
      <div className="card">
        <button onClick={() => checkWin(house)}>House</button>
      </div>
      <div className="card">
        <button onClick={RandomizeDisaster}>Randomize Disaster</button>
        <div>
          <ResponsePopUp show={status} text={text} />
          {status && <p>{aiResponse}</p>}
        </div>
      </div>
    </>
  );
}

export default App;