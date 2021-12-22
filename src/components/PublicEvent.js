import Collapsible from 'react-collapsible';
import styled from 'styled-components';


function PublicEvent(props) {
console.log(props)
  return (
    <div>
      <Event>
        <Collapsible trigger={props.name}>
          <p>
            Location📍: {props.location}
          </p>
          <p>
            Time⏰:     {props.time}
          </p>
          <p>
            Description✏️:     {props.time}
          </p>
          </Collapsible>
      </Event>
      </div>
  );
}

const Event = styled.div`
 border: 1px solid black;
 cursor: pointer;
 padding: 5;
`

export default PublicEvent;
