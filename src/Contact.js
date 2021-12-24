import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Contact from "./components/Contact";

function ContactUs() {
  const history = useNavigate();

  const routeChange = (route) => {
    history(route);
  };

  return (
    (<h1>Contact</h1>),
    (
      <div className="contact-us-collapsible">
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            position: "absolute",
            right: "10px",
          }}
        >
          <Button variant="primary" className="public-event-page-button" onClick={() => routeChange("/")}>
            Public Event List
          </Button>
        </nav>
        <div className="display-5 contact-us-page-title">Contact Us Page</div>
        <Contact
          name="Contact Us"
          mail='<a href=“mailto:mailadresi@mailservisi.com">Bize mail göndermek için tıklayın</a>'
        />
      </div>
    )
  );
}
export default ContactUs;
