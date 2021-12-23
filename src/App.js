import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PublicEvent from "./components/PublicEvent";

function App() {
  const history = useNavigate();

  const routeChange = (route) => {
    history(route);
  };
  //const commonProps = {name: 'ORFest 2019',location: 'Bilkent Sports International', time: "21:00"};
  return (
    <div>
      <nav
        style={{
          paddingTop:"0.5rem",
          position: "absolute",
          right: "10px",
        }}
      >
        <Button variant="info" onClick={() => routeChange("login")}>
          Login
        </Button>
        <Button variant="info" onClick={() => routeChange("contact")}>
          Contact Us
        </Button>
      </nav>
      <h1>Public Events Page</h1>
      <PublicEvent
        name="ORFest 2019"
        location="Bilkent"
        time="21:00"
        eventKey="0"
      />
      <PublicEvent
        name="Pizza Party"
        location="B Building"
        time="19:00"
        eventKey="1"
      />
      <PublicEvent
        name="OR Fest 2021"
        location="Mithat Coruh"
        time="10:00"
        eventKey="2"
      />
    </div>
  );
}

export default App;
