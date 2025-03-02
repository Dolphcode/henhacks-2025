import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LandingPage()
{
 const [address, setAddress] = useState(""); // Game status (win/lose)
 const navigate = useNavigate();

 function OnEnter() {
  if (address === "") return;
  console.log("yo");
  navigate("/game/" + address.replace(" ", "%20"));
 }

 function OnAddressEnter(event) {
    setAddress(event.target.value);
    console.log(event.target.value);
 }
    return (
        <div>
        <h2>The Survival Blueprint</h2>
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