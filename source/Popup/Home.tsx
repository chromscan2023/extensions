import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Receive from './Receive';
import Send from './Send';
import Setup from './Setup';
import send from '../assets/icons/send.png';
import receive from '../assets/icons/receive.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Transactions from './Transactions';
import Assets from './Assets';

//import { BlockHeader, Block } from 'web3-eth' // ex. package types
const web3 = new Web3('http://rpc.terceschat.com');

interface IState {
    redirect: string,
    isLoggedIn: boolean,
    balance:number,
    addressShort:string,
    currentprice:number,
    address:string;
  }

class Home extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        console.log(this.props)
        this.state={redirect:"",currentprice:0.0,isLoggedIn:false,address:"",addressShort:"",balance:0.0};
        this.goToSend= this.goToSend.bind(this);
        this.goToReceive= this.goToReceive.bind(this);

      }


      generateAddressShort(address:string){

        var addressshort=address.substring(0,5)+"....."+address.substring(-1,4);
        console.log(addressshort)
        this.setState({addressShort:addressshort})

      }


      componentDidMount(): void {
        console.log("componentDidMount...")
        console.log(window.localStorage.getItem("isfirstuse"));
        if(window.localStorage.getItem("isfirstuse")!=="true"){
          console.log("Redirecting to setup")
            this.setState({redirect:"setup"});
          }else{

          
        const myaddress=window.localStorage.getItem("address");
        if(myaddress!==null){
            this.setState({address:myaddress})
            this.generateAddressShort(myaddress);
            web3.eth.getBalance(myaddress).then(res=>{
                const balance:number = parseFloat(res) / 1000000000000000000;
                console.log(balance);
               this.setState({balance:balance})
            });
        }

    }
        
      }

      goToReceive(){
        this.setState({redirect:"receive"})
      }

      goToSend(){
        this.setState({redirect:"send"})
      }

    render(){
       if(this.state.redirect === "setup"){
            console.log("Using navigate")
           return (<Link to="/setup"><Setup/></Link>);
           
        }

        if(this.state.redirect === "send"){
            console.log("Using navigate")
           return (<Link to="/send"><Send/></Link>);
           
        }

        if(this.state.redirect === "receive"){
            console.log("Using navigate")
           return (<Link to="/receive"><Receive/></Link>);
           
        }
        
    

        return(<div id="popup" className="app-content">
        
        <div className="menu-bar">
  <button className="connected-status-indicator">
  <div className="color-indicator color-indicator--color-icon-default color-indicator--size-sm" data-testid="color-icon-icon-default">
  <span className="color-indicator__inner-circle"></span>
  </div>
  <div className="connected-status-indicator__text">Not connected</div>
  </button>
  <div className="selected-account">
  <div className="selected-account__tooltip-wrapper">
  <div data-original-title="Copy to clipboard" style={{display: "inline"}}>
    <button className="selected-account__clickable" data-testid="selected-account-click">
    {/**<div className="selected-account__name">Account 1</div> */}
    <div className="selected-account__address">{this.state.addressShort}
    <div className="selected-account__copy">
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H1H9V1H1V9H0V0ZM2 2H11V11H2V2ZM3 3H10V10H3V3Z" fill="var(--color-icon-alternative)"></path></svg>
    </div>
    </div>
    </button>
  </div>
  </div>
  </div>
<button className="fas fa-ellipsis-v menu-bar__account-options" data-testid="account-options-menu-button" title="Account options">
</button>
</div>

        <div className="wallet-overview">
                <div className="wallet-overview__balance">
                  <div className="identicon__image-border" style={{height: "32px",width: "32px", borderRadius: "16px"}}>
                  </div>
                  <div>
                      <div title="" className="" style={{display: "inline"}}>
                          <div className="eth-overview__balance">
                              <div className="eth-overview__primary-container">
                                  <div className="currency-display-component eth-overview__primary-balance" data-testid="eth-overview__primary-currency">
                                        <span className="currency-display-component__prefix"></span>
                                        <span className="currency-display-component__text">{this.state.balance} </span>
                                        <span className="currency-display-component__suffix">CCC</span>
                                  </div>
                              </div>
                              <div className="currency-display-component eth-overview__secondary-balance" data-testid="eth-overview__secondary-currency">
                                    <span className="currency-display-component__prefix"></span>
                                    <span className="currency-display-component__text">0</span>
                                    <span className="currency-display-component__suffix">USD</span>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              


                <div className="wallet-overview__buttons">
                        <div className="icon-button__circle">
                        <img src={receive} className="rounded float-right" onClick={this.goToReceive} /> 
                        </div>
                        <div className="icon-button__circle">
                        <img src={send} className="rounded float-left" onClick={this.goToSend} /> 
                        </div>
                        
                        
                </div>
          </div>


          <Tabs
      defaultActiveKey="activity"
      id="transactions"
      className="mb-3"
      fill
    >
      <Tab eventKey="assets" title="Assets">
      <Assets />
      </Tab>
      <Tab eventKey="activity" title="Activity">
      <Transactions currentprice={this.state.currentprice} />
      </Tab>
      
    </Tabs>

       
          


{/*
        <div className="wallet-overview spacer">
          
        <h2>Address:{this.state.address}</h2>
        <h2>Balance:{this.state.balance}</h2>
        
        

        <div className="row">
            <div className="col-sm">
                <button className="rounded float-left spacer" onClick={this.goToSend} style={style1}>Send</button>
            <img src={send} className="rounded float-left" onClick={this.goToSend} /> 
            </div>
            <div className="col-sm">
            <button className="rounded float-right spacer" onClick={this.goToReceive} style={style1}>Receive</button>
           <img src={receive} className="rounded float-right" onClick={this.goToReceive} /> 
            </div>
        </div>
        
        
        </div>
        **/}
        
      </div>);

    }

}


export default Home;