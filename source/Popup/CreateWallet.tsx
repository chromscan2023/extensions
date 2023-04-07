import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
//import Home from './Home';
//import Dashboard from './Dashboard';
//import logo from '../assets/icons/chromescan.png';
import Form from 'react-bootstrap/Form';
import logo from '../assets/icons/logo.png';

import ImportPrivateKey from './ImportPrivateKey';
import  secureLocalStorage  from  "react-secure-storage";
import TopTitle from './Components/TopTitle';
import Blockchain from './Blockchain';
import MnemonicsView from './MnemonicsView';

interface IState {
    redirect: string,
    address:string,
    message:string,
    password:string,
    checked:boolean,
    password2:string;
}
  

class CreateWallet extends React.Component<{}, IState>{
    //public  accounts=[];
    constructor(props:any){
        super(props);
        console.log("In Create Wallet")
        this.state={redirect:"",address:"",password:"",password2:"",message:"",checked:true}
        this.generateWallet = this.generateWallet.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.importWallet = this.importWallet.bind(this);
        this.handleCheck= this.handleCheck.bind(this)
      }


      handleCheck(e:any){
        console.log(e)
        console.log("unchecked click")
        if(e.target.checked){
            console.log("unchecked false")
            this.setState({checked:false})
        }else{
            console.log("unchecked false")
            this.setState({checked:false})
        }
        //return;
      }

      generateWallet(){
        const myaccounts=secureLocalStorage.getItem("accounts");
        console.log(myaccounts)
        if(myaccounts!==null){
            this.setState({redirect:"home"})
        }else{
            this.createWallet();
        }

        
      }

      createWallet(){
        console.log("Create Wallet")
        if(this.state.password.length<8){
            this.setState({message:"Password too short.Minimum length is 8 characters."});
            return;
        }
        if(this.state.password === this.state.password2){

            var wallet = Blockchain.createWallet();
           
            console.log(wallet)

            try{
            //handle accounts
            let accountlist = secureLocalStorage.getItem("accounts")?secureLocalStorage.getItem("accounts"):"[]";
            if(accountlist !==null && accountlist !==undefined){
                let accounts=JSON.parse(accountlist?.toString());
                let totalaccounts = accounts.length;
                let lastaccount = totalaccounts+1;
                
                let accountname="Account "+lastaccount;
                let accountdata={"name":accountname,"address":wallet.address,"privateKey":wallet.privateKey};
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
            secureLocalStorage.setItem("address",wallet.address);
            secureLocalStorage.setItem("mnemonic",wallet.mnemonic?.phrase);
            secureLocalStorage.setItem("privateKey",wallet.privateKey);
            this.setState({redirect:"viewmnemonic"})

        }else{
            console.log("Could not create wallet")
            this.setState({message:"Password do not match"});
            console.log(this.state)
        }
       
      }

      importWallet(){
        this.setState({redirect:"importwallet"})
      }


      handlePassword(event:any){
        this.setState({password:event.target.value});
        //console.log(this.state.password)
      }

      handlePassword2(event:any){
        this.setState({password2:event.target.value});
        //console.log(this.state.password2)
      }

    render(){
        //console.log(this.state)
        if(this.state.redirect == "viewmnemonic"){
            //console.log("Go to home")
            return (<Link to="/viewmnemonic"><MnemonicsView/></Link>);
        }

        if(this.state.redirect == "importwallet"){
            //console.log("Go to importwallet")
            return (<Link to="/importwallet"><ImportPrivateKey/></Link>);
        }

        

        var errormessage=<div></div>
        if(this.state.message !==""){
            errormessage=<div className="alert alert-danger" role="alert">{this.state.message}</div>
        }
       var inputcheckedview= <input type="checkbox" name="check" id="check" className="form-check-input" onChange={this.handleCheck} checked={false} />
        if(this.state.checked){
            inputcheckedview= <input type="checkbox" name="check" id="check" className="form-check-input" onChange={this.handleCheck} checked={true} />
        }

        console.log(inputcheckedview)
        return(<div id="popup">


<div className="container">
    {/**  <div className="row d-flex justify-content-center" style={{height:"100vh"}}> */} 
            <div className="logo-img-div my-3">
            <div className="row">
            <div className="col-3">
            <img src={logo} alt="Logo" className='topIcon' />

            </div>

            </div>
        
      </div>
        <div className="row d-flex">
            {/**<div className="col-9 mx-auto mb-4">*/}
            <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center">
                
                

                <div className="col-md-7 my-2 py-2 login-form">
                  <h4>{errormessage}</h4>
                    <div className="form-head">
                    <TopTitle title={"Create password"} />
                      {/**   <p className="lead gold-text">Create password</p>*/}
                    </div>
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">New password (8 characters)</label>
                            <input type="password" className="form-control rounded-pill py-md-3 py-2" onChange={this.handlePassword} value={this.state.password} />

                        </div>
                        <div className="mb-3">
                            <div className="forgot d-flex justify-content-between">
                                <label  className="form-label">Confirm password</label>
                                
                            </div>
                            <input type="password" className="form-control rounded-pill py-md-3 py-2" onChange={this.handlePassword2} value={this.state.password2}  />
                        </div>
                        <div className="mt-3 form-check d-flex justify-content-between">
                            <div>
                               {inputcheckedview}
                                <label className="form-check-label" >I have read and agree to the<span className="purple-text link"> Terms of use </span>
                                </label>
                            </div>
                            

                        </div>    
                        <div className="btns-div d-flex ">
                                        <button 
                                      className="button btn btn-primary my-3 w-100 me-1 hollow-btn py-2 small-btn  rounded-pill" onClick={this.generateWallet}>
                                      Create a Wallet
                                      </button> 
                    
                                     
                                      <button 
                                      className="button btn btn-primary my-3 gold-btn w-100 ms-1 py-2 small-btn rounded-pill" onClick={this.importWallet}>
                                      Import Wallet
                                      </button> 

                        </div>
                        
                           
                    </Form>
                </div>
                           
            </div>
        </div>
    </div>
  




      </div>)
    }

}


export default CreateWallet;