import React from 'react';
import Web3 from 'web3';
//import Home from './Home';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.png';

//import { BlockHeader, Block } from 'web3-eth' // ex. package types
const web3 = new Web3('http://rpc.terceschat.com');

interface IState {
    redirect:string,
    balance:number,
    amount:number,
    showtransactionreceipt:boolean,
    hash:string,
    address: string;
}
  

class SendResult extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        this.state={redirect:"",hash:"",showtransactionreceipt:false,amount:0.0,balance:0.0,address:""}
        this.handleAddress= this.handleAddress.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.sendCoin = this.sendCoin.bind(this);
        this.goBack = this.goBack.bind(this);
        this.openWindow = this.openWindow.bind(this);
      }

      componentDidMount(): void {
        console.log("web3")
        const myaddress=window.localStorage.getItem("address");
        if(myaddress!==null){
            //this.setState({address:myaddress})
            web3.eth.getBalance(myaddress).then(res=>{
                const balance:number = parseFloat(res) / 1000000000000000000;
                console.log(balance);
               this.setState({balance:balance})
            });
        }
      }

      async sendCoin(){
        console.log("Sending coin")
               const amount = this.state.amount*1000000000000000000;
        console.log(amount)
        const privateKey:string = window.localStorage.getItem("privateKey") ||  "";
        //const nonce = await web3.eth.getTransactionCount(myaddress, 'latest'); // nonce starts counting from 0

        const transaction = {
        'to': this.state.address, // faucet address to return eth
        'value': amount,
        'gas': 2000000

        };
       
        
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey) || "";
        const Tx=signedTx.rawTransaction || "";
        console.log(Tx)
        web3.eth.sendSignedTransaction(Tx, (error, hash) => {
        if (!error) {
          this.setState({hash:hash});
          this.setState({showtransactionreceipt:true});
          console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
       });

    
       
      }

      openWindow(){
        window.open("http://testnet.chromescan.org/tx/"+this.state.hash);
      }

      handleAddress(event:any){
        this.setState({address:event.target.value})
      }
      handleAmount(event:any){
        this.setState({amount:event.target.value})
      }

      goBack(){
        this.setState({redirect:"home"})
      }

    render(){
        if(this.state.redirect === "dashboard"){
            console.log("Using navigate")
           return (<Link to="/dashboard"><Dashboard/></Link>);
           
        }
        var showtransactionview=<div></div>;
        if(this.state.showtransactionreceipt){
          showtransactionview=<div>Hash:<b onClick={this.openWindow} style={{textDecoration:"underline"}}>{"http://testnet.chromescan.org/tx/"+this.state.hash}</b></div>
        }

        return(<div id="popup">
        <div className="container">
        
        <div className="row d-flex justify-content-center">
            <div className="col-md-9 col-12 mx-auto d-md-flex justify-content-between mb-4">
                <div className="logo-img-div text-center my-3"><img src={logo} alt="Logo" width="50px" />
                </div>

                <div className="d-flex align-items-center justify-content-center ">
                    <div className="d-flex align-items-center">
                       
                        <div className="dropdown active-account">
                              <button className="btn dropdown-toggle d-flex align-items-center grey-text rounded-pill mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 <i className="fa-solid fa-circle mx-2"></i>
                                Chrome Mainnet
                              </button>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                  </ul>
                        </div>
                    </div>
                    <div className="user-icon mx-1">
                        
                        <i className="fa-regular fa-circle"></i>
                    </div>
                </div>

                

                           
            </div>

            <div className="col-lg-5 col-md-7 p-0 rounded" style={{boxShadow:"0px 2px 4px 0px #00000024"}}>
           

                     
                     <div className="">
                         
                   
                     <div className="col-12 mt-2 text-center" style={{fontSize:"20px"}}>
                        Send
                         
                     </div>
                <div className="col-12 ">
                    <div className="d-flex align-items-center px-3" >
                       
                            
                        <div className="col-12 my-3 d-flex align-items-center metamask-address rounded p-3" style={{border:"1px solid #037dd6", fontSize:"1.4rem", background:"white"}}>
                            <i className="fa-solid fa-circle-check mx-2 text-success"></i>
                            <div className="address-div" style={{wordBreak: "break-all", fontSize: "20px"}}>
                                
                        {{showtransactionview}}
                            </div>
                        <i className="fa-solid fa-x mx-2 " style={{color:"#24272a",cursor:"pointer"}}></i>
                    </div>                       
                     
                   </div>

                </div>


               
                    
                    
                
             </div>
            </div>
           
        </div>
    </div>
      </div>)
    }

}


export default SendResult;