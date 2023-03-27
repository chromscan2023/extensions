import { faAddressBook, faBox, faLock, faNetworkWired, faNewspaper, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Nav from 'react-bootstrap/Nav';

class Sidebar extends React.Component{

    render(){

        return(
        <div id="sidebar">
        
        <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link eventKey="General"><span><FontAwesomeIcon icon={faBox} /></span> General</Nav.Link>
        <Nav.Link eventKey="Contacts"> <span><FontAwesomeIcon icon={faAddressBook} /></span> Contacts</Nav.Link>
        <Nav.Link eventKey="Security"> <span><FontAwesomeIcon icon={faLock} /></span> Security and Privacy</Nav.Link>
        <Nav.Link eventKey="Advanced"> <span><FontAwesomeIcon icon={faSearchPlus} /></span> Advanced</Nav.Link>
        <Nav.Link eventKey="Networks"><span><FontAwesomeIcon icon={faNetworkWired} /></span> Networks</Nav.Link>
        <Nav.Link eventKey="About"><span><FontAwesomeIcon icon={faNewspaper} /></span> About</Nav.Link>

        </Nav>
       
      </div>
);
    }
}


export default Sidebar;
