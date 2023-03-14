import React from 'react';
import Web3 from 'web3';
//import Home from './Home';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
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
  

class Send extends React.Component<{}, IState>{

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
        <button
         className="btn btn-primary my-3 w-25 me-1 hollow-btn py-2  rounded-pill gold-text hollow-btn" onClick={this.goBack}
          type="button">
         Cancel
        </button>
        <h2 className='spacer'>Send CCC</h2>
        <div className="mb-3">
        <div className="col text-center spacer">
        <h2>Balance:{this.state.balance}</h2>
        <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" onChange={this.handleAddress} value={this.state.address} />
        </div>
        <div className="form-group">
            <label>Amount</label>
            <input type="text" className="form-control" onChange={this.handleAmount} value={this.state.amount} />
        </div>
        
        <button
        className="btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill" onClick={this.sendCoin}
          type="button"
         
        >
         Send
        </button>

        {showtransactionview}
        </div>
        </div>
        
      </div>)
    }

}


export default Send;