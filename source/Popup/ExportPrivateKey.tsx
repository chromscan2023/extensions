import React from 'react';
import './styles.scss';
//import logo from '../assets/icons/chromescan.png';
//import logo from '../assets/icons/logo.png';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import  secureLocalStorage  from  "react-secure-storage";

interface IState {
  redirect: string,
  message:string,
  password:string,
  privatekey:string;
}

class ExportPrivateKey extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        this.state={redirect:"",privatekey:"",password:"",message:""}
        this.handlePassword = this.handlePassword.bind(this);
        this.doExportPrivateKey= this.doExportPrivateKey.bind(this);
        this.goBack= this.goBack.bind(this);
      }

      handlePassword(event:any){
        this.setState({password:event.target.value});
        //console.log(this.state.password)
      }



      handlePrivateKey(event:any){
        this.setState({privatekey:event.target.value});
      
      }


      doExportPrivateKey(){
        this.setState({message:""})
        if(secureLocalStorage.getItem("password")===this.state.password){
            let pkey = secureLocalStorage.getItem("privateKey");
            let privatekey = pkey?.toString();
            if(privatekey!==null && privatekey!==undefined){
            this.setState({privatekey:privatekey});
            }

          }else{
            this.setState({message:"Invalid password"})
          }
          
         
      }
      goBack(){
        this.setState({redirect:"dashboard"})
      }

    render(){
      if(this.state.redirect == "home"){
        console.log("Go to home")
        return (<Link to="/dashboard"><Dashboard/></Link>);
    }
    if(this.state.redirect == "dashboard"){
        console.log("Go to home")
        
        return (<Link to="/dashboard"><Dashboard/></Link>);
    }

    var errormessage=<div></div>
    if(this.state.message !==""){
        errormessage=<div className="alert alert-danger" role="alert">{this.state.message}</div>
    }

        return(<div id="popup">


        <div className="container">
                {/**  <div className="row d-flex justify-content-center" style={{height:"100vh"}}> */} 
                  <div className="row d-flex" style={{width:"400px"}}>
                  
                  <div className="col-md-9 col-12 mx-auto d-flex mt-2 mb-4">
                      <div onClick={this.goBack} style={{width:"50px",height:"50px"}}>
                          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                      </div>
                      <div className="account-head title">Export Private Key</div>
                      </div>
                    <div className="col-9 mx-auto mb-4">
                       
                        
        
                        <div className="col-md-7 my-5 py-4 login-form">
                          <h1>{errormessage}</h1>
                            <div className="form-head">
                                <p className="lead gold-text">Export Private Key</p>
                            </div>
                            <form>
                                <div className="mb-3">
                                    <div className="forgot d-flex justify-content-between">
                                        <label  className="form-label">Password</label>
                                        
                                    </div>
                                    <input type="password" className="form-control rounded-pill py-md-3 py-2" onChange={this.handlePassword} value={this.state.password}  />
                                </div>

                                <div className="mb-3">
                                    <div className="forgot d-flex justify-content-between">
                                        <label  className="form-label">Private Key</label>
                                        
                                    </div>
                                    <input type="text" className="form-control rounded-pill py-md-3 py-2" value={this.state.privatekey}  />
                                </div>
                                
                                
                                <button 
                                              className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill" onClick={this.doExportPrivateKey}>
                                              Export Private Key
                                              </button> 
                                
                                   
                            </form>
                        </div>
                                   
                    </div>
                </div>
            </div>
          
        
        
        
        
              </div>)
    }

}


export default ExportPrivateKey;