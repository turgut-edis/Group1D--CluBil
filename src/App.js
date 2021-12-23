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
        <Button variant="info" className="login-page-button" onClick={() => routeChange("login")}>
          Login
        </Button>
        <Button variant="info"  className="contact-us-page-button" onClick={() => routeChange("contact")}>
          Contact Us
        </Button>
      </nav>
      <h1 className="public-events-title">Public Events Page</h1>
      <div className="public-events">
        <PublicEvent
          name="ORFest 2019 🎊"
          location="Bilkent"
          time="21:00"
          description="Littest party of 2019"
          eventKey="0"
        />
        <PublicEvent
          name="Pizza Party🍕"
          location="B Building"
          time="19:00"
          description="Let's eat some pizza!!!"
          eventKey="1"
        />
        <PublicEvent
          name="CodeCamp 2021💻"
          location="Mithat Coruh"
          time="10:00"
          description="Littest code party of 2021"
          eventKey="2"
        />
      </div>
    </div>
  );
}



export default App;
