import { Accordion } from "react-bootstrap";

function PublicEvent(props) {
  console.log(props);
  return (
    <Accordion>
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.name}</Accordion.Header>
        <Accordion.Body>
          <p>Location📍: {props.location}</p>
          <p>Time⏰: {props.time}</p>
          <p>Description✏️: {props.description}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PublicEvent;
