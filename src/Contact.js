import React from 'react';
import {Link} from 'react-router-dom'
//import styled from 'styled-components';
import Contact from './components/Contact';

function ContactUs() {
    //const commonPropsMail = {name: 'Contact Us', mail:'mailto: example@example.com'};

    return (
    
        <h1>Contact</h1>,
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
      <h1>Contact Us Page</h1>
      <Contact name='Contact Us' mail='<a href=“mailto:mailadresi@mailservisi.com">Bize mail göndermek için tıklayın</a>'/>
    </div>
    )
}
export default ContactUs;
