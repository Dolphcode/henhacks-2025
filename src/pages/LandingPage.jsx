import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LandingPage()
{
 const [address, setAddress] = useState(""); // Game status (win/lose)
 const navigate = useNavigate();

 function OnEnter() {
  if (address === "") return;
  navigate("/game/" + address.replace(" ", "%20"));
 }

 function OnAddressEnter(event) {
    setAddress(event.target.value);
    console.log(event.target.value);
 }
    return (
        <div>
        <h1>The Survival Blueprint</h1>
        <h3>Click <a href="https://cors-anywhere.herokuapp.com/">this link</a></h3>
        
        <h3>then press the "Request temporary access to the demo server" button. This must be done in order for this app to work</h3>
        <h3>Enter an address</h3>
        <form>
          <input type="text" name="Address" onChange={OnAddressEnter}></input>
        </form>
        <button onClick={OnEnter}>
          Enter
        </button>
      </div>
      
    );
}

export default LandingPage;