import {Link} from 'react-router-dom'
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
      <PublicEvent name='Pizza Party' location='B Building' time='19:00' />
      <PublicEvent name='ORgy Fest 2021' location='Mithat Coruh' time='10:00' />
    </div>
  );
}

const Event = styled.div`
 border: 1px solid black;
 cursor: pointer;
 padding: 5;
`

export default App;
