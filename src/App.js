import {Link, Route, Routes} from 'react-router-dom'
import Contact from './Contact'
import LogIn from './LogIn'
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import PublicEvent from './components/PublicEvent';

function App() {
  const commonProps = {name: 'ORFest 2019',location: 'Bilkent Sports International', time: "21:00"};
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          position: "absolute",
          right: '10px'
          
        }}
      >
        <Link to="/login">LogIn</Link> |{" "}
        <Link to="/contact">Contact Us</Link>
      </nav>
      <h1>Public Events Page</h1>
      <PublicEvent name='ORFest 2019' location='Bilkent' time='21:00' />
      <PublicEvent name='Ebenin Ami' location='Ananin Aminda' time='31:69' />
      <PublicEvent name='ORFest 2019' location='Bilkent' time='21:00' />
    </div>
  );
}

const Event = styled.div`
 border: 1px solid black;
 cursor: pointer;
 padding: 5;
`

export default App;
