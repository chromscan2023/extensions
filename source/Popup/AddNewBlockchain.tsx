import React from 'react';
import './styles.scss';
//import logo from '../assets/icons/logo.png';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import secureLocalStorage from 'react-secure-storage';
//import logo from '../assets/icons/chromescan.png';
//import  secureLocalStorage  from  "react-secure-storage";
//import Web3 from 'web3';
//const web3 = new Web3('http://rpc.terceschat.com');

interface IState {
    redirect: string,
    message:string,
    password:string,
    currency:string,
    networkname:string,
    rpcnode:string,
    explorer:string,
    networkid:number,
    privatekey:string;
  }
class AddNewBlockchain extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        this.state={
        redirect:"",
        privatekey:"",
        password:"",
        currency:"",
        explorer:"",
        networkname:"",
        rpcnode:"",
        networkid:0,
        message:""};
        this.handleExplorer = this.handleExplorer.bind(this);
        this.handleRPC = this.handleRPC.bind(this);
        this.handleNetworkName = this.handleNetworkName.bind(this);
        this.handleNetworkID = this.handleNetworkID.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleExplorer = this.handleExplorer.bind(this);
        this.doAddChain = this.doAddChain.bind(this);
        this.goBack= this.goBack.bind(this);
      }


      doAddChain(){
        let networklist = secureLocalStorage.getItem("networks")?secureLocalStorage.getItem("networks"):"[]";
        if(this.state.rpcnode===""  || this.state.rpcnode.length<6){
          this.setState({message:"Please enter a valid rpc node url"})
          return;
        }
        if(this.state.networkname===""  || this.state.networkname.length<=0){
          this.setState({message:"Please enter a valid network name"});
          return;
        }
        if(this.state.networkid===0){
          this.setState({message:"Please enter a valid network name"});
          return;
        }
        if(networklist !==null && networklist !==undefined){
          let networks=JSON.parse(networklist?.toString());
          let accountdata={
            "networkname":this.state.networkname,
            "rpcnode":this.state.rpcnode,
            "networkid":this.state.networkid,
            "currency":this.state.currency,
            "explorer":this.state.explorer
        };
          networks.push(accountdata);
          console.log(networks)
          secureLocalStorage.setItem("networks",JSON.stringify(networks));
          secureLocalStorage.setItem("defaultnetwork",this.state.networkname);
          secureLocalStorage.setItem("rpcnode",this.state.rpcnode)
          window.localStorage.setItem("rpcnode",this.state.rpcnode);
          window.localStorage.setItem("defaultnetwork",this.state.networkname)
          secureLocalStorage.setItem("defaultcurrency",this.state.currency)
          window.localStorage.setItem("defaultcurrency",this.state.currency);
         
        }

        let networklist2 = secureLocalStorage.getItem("networks")?secureLocalStorage.getItem("networks"):"[]";
            if(networklist2 !==null && networklist2 !==undefined){
                console.log("show networks")
                let networks=JSON.parse(networklist2?.toString());
                for(var i=0;i<=networks.length+1;i++){
                    console.log(networks[i]);
                }
                
            }

            this.goBack();
      }

      handleRPC(event:any){
        this.setState({rpcnode:event?.target.value})
      }

      handleNetworkName(event:any){
        this.setState({networkname:event?.target.value})
      }

      handleNetworkID(event:any){
        this.setState({networkid:event?.target.value})
      }

      handleCurrency(event:any){
        this.setState({currency:event?.target.value})
      }


      handleExplorer(event:any){
        this.setState({explorer:event?.target.value})
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
                   
                    <div className="col-md-9 col-12 mx-auto d-flex mt-2 mb-1">
                      <div onClick={this.goBack} style={{width:"50px",height:"50px"}}>
                          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                      </div>
                      <div className="account-head title">Add Blockchain</div>
                      </div>
                    <div className="col-9 mx-auto mb-4">
                        
                        
        
                        <div className="col-md-7 my-5 py-4 login-form">
                          <h4>{errormessage}</h4>
                            <div className="form-head">
                                <p className="lead gold-text">Add New Blockchain</p>
                            </div>
                            <form>
                                <div className="mb-3">
                                    <div className="forgot d-flex justify-content-between">
                                        <label  className="form-label">Network Name</label>
                                        
                                    </div>
                                    <input type="text" className="form-control rounded-pill py-md-3 py-2" onChange={this.handleNetworkName} value={this.state.networkname}  />
                                </div>
                                <div className="mb-3">
                                        <label className="form-label">RPC Node</label>
                                        <input type="text" className="form-control rounded-pill py-md-3 py-2" onChange={this.handleRPC} value={this.state.rpcnode} />

                                </div>

                                <div className="mb-3">
                                        <label className="form-label">Network ID</label>
                                        <input type="text" className="form-control rounded-pill py-md-3 py-2" onChange={this.handleNetworkID} value={this.state.networkid} />

                                </div>

                                <div className="mb-3">
                                        <label className="form-label">Currency Symbol</label>
                                        <input type="text" className="form-control rounded-pill py-md-3 py-2" onChange={this.handleCurrency} value={this.state.currency} />

                                </div>
                                <div className="mb-3">
                                        <label className="form-label">Block Explorer(optional)</label>
                                        <input type="text" className="form-control rounded-pill py-md-3 py-2" onChange={this.handleExplorer} value={this.state.explorer} />

                                </div>
                                
                                
                                <button 
                                              className="btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill" onClick={this.doAddChain}>
                                              Add New Chain
                                              </button> 
                                
                                   
                            </form>
                        </div>
                                   
                    </div>
                </div>
            </div>
        
      </div>)
    }

}


export default AddNewBlockchain;