import { Link } from 'react-router-dom';

function LandingPage()
{
    return (
        <div>
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <h2>The Survival Blueprint</h2>
      </div>
    );
}

export default LandingPage;