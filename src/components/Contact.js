import Collapsible from 'react-collapsible';
import styled from 'styled-components';


function Contact(props) {
console.log(props)
  return (
    <div>
      <Contacts>
        <Collapsible trigger={props.name}>
        <a>Mail ✉️:</a>
        <a href="mailto:example@example.com">Click here if you have any trouble</a>
          </Collapsible>
      </Contacts>
      </div>
  );
}

const Contacts = styled.div`
 border: 1px solid black;
 cursor: pointer;
 padding: 5;
`

export default Contact;
