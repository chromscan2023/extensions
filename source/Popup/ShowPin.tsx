import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
//import logo from '../assets/icons/chromescan.png';
import logo from '../assets/icons/logo.png';
import Dashboard from './Dashboard';
import  secureLocalStorage  from  "react-secure-storage";
interface IState {
  redirect: string,
  message:string,
  password:string;
}


class ShowPin extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        this.state={redirect:"",password:"",message:""}
        this.doAuth = this.doAuth.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

      }

      doAuth(){
        this.setState({message:""})
        if(secureLocalStorage.getItem("password")===this.state.password){
          console.log("Redirecting to setup")
            this.setState({redirect:"home"});
          }else{
            this.setState({message:"Invalid password"})
          }
      }


      handlePassword(event:any){
        this.setState({password:event.target.value});
      
      }


    render(){
        
      if(this.state.redirect == "home"){
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
                  <div className="row d-flex">
                    <div className="col-9 mx-auto mb-4">
                        <div className="logo-img-div my-3"><img src={logo} alt="Logo" width="50px" height="50px" />
                        </div>
                        
        
                        <div className="col-md-7 my-5 py-4 login-form">
                          <h1>{errormessage}</h1>
                            <div className="form-head">
                                <h2 className="lead gold-text">Welcome Back!</h2>
                                <p className="lead gold-text">Unlock the power of the ChromeNetwork</p>
                            </div>
                            <form>
                                <div className="mb-3">
                                    <div className="forgot d-flex justify-content-between">
                                        <label  className="form-label">Password</label>
                                        
                                    </div>
                                    <input type="password" className="form-control py-md-3 py-2" style={{width:300,borderBottom:"2px #A5753D",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} onChange={this.handlePassword} value={this.state.password}  />
                                </div>
                                
                                
                                <button style={{width:300}} className="btn btn-primary my-3 gold-btn ms-1 py-2 rounded-pill" onClick={this.doAuth}>
                                              Unlock
                                              </button> 
                                
                                   
                            </form>
                        </div>
                                   
                    </div>
                </div>
            </div>
          
        
        
        
        
              </div>)
    }

}


export default ShowPin;