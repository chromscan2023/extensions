import React from 'react';
import './styles.scss';
//import logo from '../assets/icons/chromescan.png';
//import logo from '../assets/icons/logo.png';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import  secureLocalStorage  from  "react-secure-storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3';
//import TopTitle from './Components/TopTitle';
const web3 = new Web3('http://rpc.terceschat.com');
interface IState {
  redirect: string,
  message:string,
  password:string,
  privatekey:string;
}

class ImportPrivateKey extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        this.state={redirect:"",privatekey:"",password:"",message:""}
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePrivateKey = this.handlePrivateKey.bind(this);
        this.doImportPrivateKey= this.doImportPrivateKey.bind(this);
        this.goBack= this.goBack.bind(this);
      }

      

      handlePassword(event:any){
        this.setState({password:event.target.value});
        //console.log(this.state.password)
      }



      handlePrivateKey(event:any){
        this.setState({privatekey:event.target.value});
      
      }


      doImportPrivateKey(){
        this.setState({message:""})
        if(this.state.privatekey.length<32){
          this.setState({message:"Private key too short"});
          return ;
        }
        if(this.state.password.length>=8){
            
            var accountinfo = web3.eth.accounts.privateKeyToAccount(this.state.privatekey);
            console.log(accountinfo)

            try{
              //handle accounts
              let accountlist = secureLocalStorage.getItem("accounts")?secureLocalStorage.getItem("accounts"):"[]";
              if(accountlist !==null && accountlist !==undefined){
                  let accounts=JSON.parse(accountlist?.toString());
                  let totalaccounts = accounts.length;
                  let lastaccount = totalaccounts+1;
                  
                  let accountname="Account "+lastaccount;
                  let accountdata={"name":accountname,"address":accountinfo.address,"privateKey":accountinfo.privateKey};
                  accounts.push(accountdata);
                  console.log(accounts)
                  secureLocalStorage.setItem("accounts",JSON.stringify(accounts));
              }
  
              //show accounts
              
              let accountlist2 = secureLocalStorage.getItem("accounts")?secureLocalStorage.getItem("accounts"):"[]";
              if(accountlist2 !==null && accountlist2 !==undefined){
                  console.log("show accounts")
                  let accounts=JSON.parse(accountlist2?.toString());
                  for(var i=0;i<=accounts.length+1;i++){
                      console.log(accounts[i]);
                  }
                  
              }
  
              }catch(e){
                  console.log(e)
              }

              

            secureLocalStorage.setItem("isfirstuse","true");
            secureLocalStorage.setItem("password",this.state.password);
            secureLocalStorage.setItem("isloggedin","true");
            secureLocalStorage.setItem("address",accountinfo.address);
            secureLocalStorage.setItem("privateKey",accountinfo.privateKey);
            this.setState({redirect:"home"});
          }else{
            this.setState({message:"Invalid password"})
          }
      }


      goBack(){
        this.setState({redirect:"dashboard"})
      }


    render(){

      
    if(this.state.redirect == "dashboard"){
        console.log("Go to home")
        
        return (<Link to="/dashboard"><Dashboard/></Link>);
    }

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
                
                
                    <div className="logo-img-div my-3">
                          <div className="row">
                            <div className="col-3">
                            <FontAwesomeIcon onClick={this.goBack} icon={faArrowAltCircleLeft} size="2x"  className='topIcon' />
                          
                            </div>
                           <div className="col-9">
                            <div className="account-head title">Import Private Key</div>
                            </div>
                          </div>
                          
                         
                        
                    </div>
                  <div className="row d-flex">
                      
                  <div className="col-lg-8 flex-column justify-content-center align-items-center"> 
                      

                            
                                    <div className="col-md-7 my-2 py-2 login-form">
                                    <h4>{errormessage}</h4>
                                    <div className="form-head">
                                  {/**<TopTitle title={"Import Private Key"} />*/}
                                   
                                    </div>
                                            <form>
                                            <div className="mb-3">
                                            <div className="forgot d-flex justify-content-between">
                                            <label  className="form-label">Private Key</label>

                                            </div>
                                            <input type="password" className="form-control rounded-pill py-md-3 py-2" onChange={this.handlePrivateKey} value={this.state.privatekey}  />
                                            </div>
                                            <div className="mb-3">
                                            <label className="form-label">New password (8 characters)</label>
                                            <input type="password" className="form-control rounded-pill py-md-3 py-2" onChange={this.handlePassword} value={this.state.password} />

                                            </div>

                                            <div className='row'>
                                              <div className='col text-center'>
                                            <button 
                                            className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill" onClick={this.doImportPrivateKey}>
                                            Import Private Key
                                            </button> 
                                            </div>
                                            </div>


                                            </form>
                                    </div>
                                          
                              </div>

                    </div>
                  </div>
              
              </div>)
    }

}


export default ImportPrivateKey;