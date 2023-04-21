import React from "react";
//import Web3 from 'web3';
//import Home from './Home';
import Dashboard from "./Dashboard";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getCCCPricing } from "../utils";
import logo from "../assets/icons/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import Blockchain from "./Blockchain";

//import { BlockHeader, Block } from 'web3-eth' // ex. package types
//const web3 = new Web3('http://rpc.terceschat.com');

interface IState {
  redirect: string;
  balance: number;
  amount: number;
  gas: number;
  priceusd: number;
  gaslimit: number;
  showtransactionreceipt: boolean;
  hash: any;
  defaultcurrency: string;
  iserror: boolean;
  message: string;
  errormessage: string;
  address: string;
}
const blockchain = new Blockchain();

class Send extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: "",
      hash: "",
      gas: 2000000,
      gaslimit: 21000,
      iserror: false,
      showtransactionreceipt: false,
      amount: 0.0,
      balance: 0.0,
      address: "",
      message: "",
      errormessage: "",
      priceusd: 0.0,
      defaultcurrency: "",
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleGas = this.handleGas.bind(this);
    this.handleGasLimit = this.handleGasLimit.bind(this);
    this.sendCoin = this.sendCoin.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setMax = this.setMax.bind(this);
    this.openWindow = this.openWindow.bind(this);
  }

  fetchPrice() {
    getCCCPricing().then((res) => {
      const recentprice = parseFloat(res.rows[1].valueInUSD);
      const totalbalanceusd = this.state.balance * recentprice;
      this.setState({ priceusd: Number(totalbalanceusd.toFixed(2)) });
    });
  }

  componentDidMount(): void {
    console.log("web3");
    try {
      let defcurrency = secureLocalStorage.getItem("defaultcurrency");
      let defaultcurrency = defcurrency?.toString();
      if (defaultcurrency !== null && defaultcurrency !== undefined) {
        this.setState({ defaultcurrency: defaultcurrency });
      }
    } catch (e) {
      console.log(e);
    }

    let dbaddress = secureLocalStorage.getItem("address");
    let myaddress = dbaddress?.toString();
    if (myaddress !== null && myaddress !== undefined) {
      //this.setState({address:myaddress})
      let blockchain = new Blockchain();
      blockchain.getBalance(myaddress?.toLowerCase()).then((value: number) => {
        console.log(value);
        this.setState({ balance: value });
        this.fetchPrice();
        setInterval(() => {
          let dbaddress = secureLocalStorage.getItem("address");
          let myaddress = dbaddress?.toString();
          if (myaddress !== null && myaddress !== undefined) {
            this.fetchPrice();
          }
        }, 60000);
      });

      /**web3.eth.getBalance(myaddress?.toLowerCase()).then(res=>{
                const balance:number = parseFloat(res) / 1000000000000000000;
                console.log(balance);
               this.setState({balance:balance})
            });*/
    }
  }

  setMax() {
    this.setState({ amount: this.state.balance });
  }

  async sendCoin() {
    this.setState({ message: "" });
    console.log("Sending coin");

    //const gas:number= this.state.gas;
    console.log(this.state.amount);
    let privateKey: string =
      secureLocalStorage.getItem("privateKey")?.toString() || "";
    this.state.amount < 1
      ? this.setState({ message: "Enter Valid Amount!" })
      : this.state.address.length > 3
      ? this.setState({ message: "Sending coins..." })
      : this.setState({ message: "Enter Address" });
    console.log("Sending coins...");
    blockchain
      .sendCoins(
        this.state.amount,
        this.state.address,
        this.state.gas,
        privateKey
      )
      .then((value) => {
        console.log(value);
        this.setState({ hash: value });
        this.setState({ showtransactionreceipt: true });
        this.setState({ redirect: "dashboard" });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ errormessage: "Unable to send coins" });
      });
    /**const amount = this.state.amount*1000000000000000000;
        console.log(amount)
       
        //const nonce = await web3.eth.getTransactionCount(myaddress, 'latest'); // nonce starts counting from 0

        const transaction = {
        'to': this.state.address, // faucet address to return eth
        'value': amount,
        'gas': 2000000

        };
       
        
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey.toString()) || "";
        const Tx=signedTx.rawTransaction || "";
        console.log(Tx)
        web3.eth.sendSignedTransaction(Tx, (error, hash) => {
        if (!error) {
          this.setState({hash:hash});
          this.setState({showtransactionreceipt:true});
          console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
          this.setState({redirect:"dashboard"});
        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
       });
       */
  }

  openWindow() {
    window.open("http://testnet.chromescan.org/tx/" + this.state.hash);
  }

  handleAddress(event: any) {
    this.setState({ address: event.target.value });
  }
  handleAmount(event: any) {
    this.setState({ amount: event.target.value });
    blockchain
      .estimateGas(this.state.address, this.state.amount)
      .then((gasEstimate) => {
        this.setState({ gas: gasEstimate });
      });
  }

  handleGas(event: any) {
    this.setState({ gas: event.target.value });
  }

  handleGasLimit(event: any) {
    this.setState({ gaslimit: event.target.value });
  }

  goBack() {
    this.setState({ redirect: "dashboard" });
  }

  render() {
    if (this.state.redirect === "dashboard") {
      console.log("Using navigate");
      return (
        <Link to="/dashboard">
          <Dashboard />
        </Link>
      );
    }
    var noticemessage = <div></div>;
    if (this.state.message !== "") {
      noticemessage = <Alert severity="error">{this.state.message}</Alert>;
    } else [(noticemessage = <div></div>)];
    if (this.state.errormessage !== "") {
      noticemessage = <Alert severity="error">{this.state.message}</Alert>;
    } else {
      noticemessage = <div></div>;
    }

    var showerror = <div></div>;
    if (this.state.iserror) {
      showerror = (
        <div className="col-12 my-3 funds-error rounded p-3">
          Insufficient funds for gas
        </div>
      );
    } else {
      showerror = <div></div>;
    }
    let price = this.state.priceusd;
    let max = this.state.balance;
    let val = this.state.amount;
    var price1 = (price / max) * val;

    return (
      <div id="popup" style={{ overflowY: "scroll" }}>
        <div className="container" style={{ width: "100%" }}>
          <FontAwesomeIcon
            onClick={this.goBack}
            className="backArrow"
            icon={faArrowAltCircleLeft}
          />
          <div className="title" style={{ textAlign: "center" }}>
            Send To
          </div>
          {/* <div className="logo-img-div my-3">
            <div className="row">
              <div className="col-3">
                <FontAwesomeIcon
                  onClick={this.goBack}
                  icon={faArrowAltCircleLeft}
                  size="2x"
                  style={{ height: "45px", width: "45px" }}
                  className="topIcon"
                />
              </div>
              <div className="col-9">
                <div className="account-head title">Send</div>
              </div>
            </div>
          </div> */}
          <div className="row d-flex justify-content-center">
            <div
              className="col-lg-5 col-md-7 p-0 rounded"
              style={{ boxShadow: "0px 2px 4px 0px #00000024" }}
            >
              <div className="">
                <div className="col-12 ">
                  <div className="d-flex align-items-center px-3">
                    <div
                      className="col-12 d-flex align-items-center metamask-address rounded p-3"
                      style={{
                        fontSize: "1.4rem",
                        background: "#f3f3f3",
                      }}
                    >
                      <TextField
                        id="filled-basic"
                        type="text"
                        label="Reciver Address"
                        variant="filled"
                        sx={{ width: "25ch" }}
                        onChange={this.handleAddress}
                        value={this.state.address}
                      />
                      {/* <div
                        className="address-div"
                        style={{ wordBreak: "break-all", fontSize: "20px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          style={{ fontSize: "19px", width: "300px" }}
                          onChange={this.handleAddress}
                          value={this.state.address}
                          placeholder="Enter receiver address"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 " style={{ background: "white" }}>
                  <div className="body p-3">
                    {noticemessage}
                    {/*<div className="col-12 my-3 new-detection rounded p-3" style={{cursor:"pointer"}}>
                        New address detected! Click here to add to your address book.
                        
                        </div>*/}
                    <div className="assets d-flex align-items-center my-3">
                      <div className="col-3 d-inline">
                        <label
                          className="col-form-label"
                          style={{ fontSize: "1rem" }}
                        >
                          Asset:
                        </label>
                      </div>
                      <div className="col-9 d-inline">
                        <div
                          className="p-3 d-flex rounded"
                          style={{ border: "1px solid #d6d9dc" }}
                        >
                          <div className="img-div mx-1">
                            <img
                              src={logo}
                              alt="img"
                              width="30px"
                              height="30px"
                            />
                          </div>
                          <div className="balances mx-1">
                            <div className="upper">ChromeScan</div>
                            <div className="lower">
                              Balance : {this.state.balance.toFixed(2)} CCC
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="amounts d-flex align-items-center my-3">
                      <div className="col-3 d-inline">
                        <label
                          className="col-form-label d-block"
                          style={{ fontSize: "1rem" }}
                        >
                          Amount:
                        </label>
                        <button
                          className="btn btn-tiny gold-btn"
                          onClick={this.setMax}
                          style={{ borderRadius: "20px" }}
                        >
                          Max
                        </button>
                      </div>
                      <div className="col-9 d-inline">
                        <div
                          className="p-3 d-flex rounded"
                          style={{ border: "1px solid #d6d9dc" }}
                        >
                          <div className="balances mx-1">
                            <div className="upper">
                              <TextField
                                id="standard-basic"
                                type="number"
                                variant="standard"
                                value={this.state.amount}
                                onChange={this.handleAmount}
                                sx={{ width: "20ch" }}
                              />
                              {/* <input
                                type="text"
                                style={{ border: "1px solid #d6d9dc" }}
                                onChange={this.handleAmount}
                                value={this.state.amount}
                              />{" "} */}
                              CCC
                            </div>
                            <div className="lower">
                              {price1 > 0 ? `$${price1.toFixed(2)}` : "$ 0.00"}
                            </div>
                          </div>
                        </div>
                        {showerror}
                      </div>
                    </div>

                    <div className="amounts d-flex align-items-center my-3">
                      <div className="col-3 d-inline"></div>
                      <div className="col-4 d-inline">
                        <div
                          className="p-3 d-flex rounded"
                          style={{ border: "1px solid #d6d9dc" }}
                        >
                          <div className="balances mx-1">
                            <div className="upper">
                              <TextField
                                id="standard-basic"
                                type="number"
                                variant="standard"
                                value={this.state.gas}
                                onChange={this.handleGas}
                                sx={{ overflow: "hidden" }}
                              />
                              {/* <input
                                type="text"
                                onChange={this.handleGas}
                                value={this.state.gas}
                                style={{
                                  border: "1px solid #d6d9dc",
                                  width: "95px",
                                  borderRadius: "10px",
                                }}
                              /> */}{" "}
                              Gas
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-4 d-inline"
                        style={{ marginLeft: "30px" }}
                      >
                        <div
                          className="p-3 d-flex rounded"
                          style={{ border: "1px solid #d6d9dc" }}
                        >
                          <div className="balances mx-1">
                            <div className="upper">
                              <TextField
                                id="standard-basic"
                                type="number"
                                variant="standard"
                                value={this.state.gaslimit}
                                onChange={this.handleGasLimit}
                              />
                              {/* <input
                                type="text"
                                onChange={this.handleGasLimit}
                                value={this.state.gaslimit}
                                style={{
                                  border: "1px solid #d6d9dc",
                                  width: "95px",
                                  borderRadius: "10px",
                                }}
                              /> */}{" "}
                              Gas Price
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="footer d-flex p-3 mt-2"
                    style={{ borderTop: "1px solid #d6d9dc" }}
                  >
                    <div className="col-6">
                      <button
                        className="button btn btn-primary my-3 w-100 me-1 hollow-btn py-2 small-btn  rounded-pill"
                        onClick={this.goBack}
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="col-6">
                      <button
                        className="button btn btn-primary my-3 gold-btn w-100 ms-1 py-2 small-btn rounded-pill"
                        onClick={this.sendCoin}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Send;
