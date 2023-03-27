import React from 'react';
import Sidebar from './Components/Sidebar';
//import Tab from 'react-bootstrap/Tab';
//import Tabs from 'react-bootstrap/Tabs';
import logo from '../assets/icons/logo.png';
import './styles.scss';


class Advance extends React.Component{

  constructor(props:any){
    super(props);
  }


  render(){
    return (
        <div className="main-container-wrapper">
    <div className="main-container">
        <div className="logo-img-div my-3">
       
                <div className="row">
                <div className="col-3">
                <img src={logo} alt="Logo" className='topIcon' />
                
                </div>
                <div className="col-9">
                <div className="account-head title"> </div>
                </div>
                </div>
      </div>
    <div className="row">
            <div className="col-md-2 col-3">
            <Sidebar />
            </div>
                <div className="col-md-10 col-9" style={{background:"#FAF9F4"}}>
                    
                    
                                
                                    
                            
                </div>



        
    </div>
       
   </div>
   </div>
    );
  }

}


export default Advance;
