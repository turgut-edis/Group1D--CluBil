import { Accordion } from "react-bootstrap";

function Contact(props) {
  console.log(props);
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.name}</Accordion.Header>
        <Accordion.Body>
          <p>
            Mail ✉️:
            <a href="mailto:example@example.com">
              Click here if you have any trouble
            </a>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Contact;
