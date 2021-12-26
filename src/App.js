import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PublicEvent from "./components/PublicEvent";
import Manage from "./managers/ManagerFacade";


function App() {
  const history = useNavigate();
  const [data, setData] = useState();

  const fetchAllEventData = async () => {
    var b = await Manage("event").getAllEvents()
    setData(b)
  }

  useEffect(async () => {
    await fetchAllEventData()
  }, []);

  if (data == null) {
    return <div>loading...</div>
  }
  if (data != null)
    console.log("data")

  const routeChange = (route) => {
    history(route);
  }

  return(
    <>
    <div>
      <nav className="button-holder">
        <Button variant="primary" className="btn btn-primary login-page-button" onClick={() => routeChange("login")}>
          Login
        </Button>
        <Button variant="secondary"  className="contact-us-page-button" onClick={() => routeChange("contact")}>
          Contact Us
        </Button>
      </nav>
      <div className="display-5 public-events-title">Open Access Events</div>
      </div>


      {data.map((elementInArray, index) => {
        console.log(elementInArray, index)
        return (
      <div className="public-events">
        <PublicEvent
          name={data[index].getName()}
          location={data[index].getLocation()}
          time={data[index].getTimeRequested()}
          description={data[index].getDescription()}
          eventKey={data[index].getIsOpen()}
        />
      </div>
        );
      })}
    
    
    
    
    
    
    
    </>
  );

}
export default App;
