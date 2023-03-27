import React from 'react';
import '../styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
class HeaderWithTitle extends React.Component{

    constructor(props:any){
        super(props);
      }

      goBack(){

      }

    render(){
        

        return(<div className="col-md-9 col-12 mx-auto d-flex mt-2 mb-1">
        <div onClick={this.goBack} style={{width:"50px",height:"50px"}}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
        </div>
        <div className="account-head title">
          Add Blockchain
        </div>
     </div>)
    }

}


export default HeaderWithTitle;