import React from "react";
import "./styles.scss";
//import logo from '../assets/icons/logo.png';
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
//import TopTitle from './Components/TopTitle';
//import logo from '../assets/icons/chromescan.png';
//import  secureLocalStorage  from  "react-secure-storage";
//import Web3 from 'web3';
//const web3 = new Web3('http://rpc.terceschat.com');

interface IState {
  redirect: string;
  message: string;
  password: string;
  currency: string;
  networkname: string;
  rpcnode: string;
  explorer: string;
  networkid: number;
  privatekey: string;
}
class AddNewBlockchain extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: "",
      privatekey: "",
      password: "",
      currency: "",
      explorer: "",
      networkname: "",
      rpcnode: "",
      networkid: 0,
      message: "",
    };
    this.handleExplorer = this.handleExplorer.bind(this);
    this.handleRPC = this.handleRPC.bind(this);
    this.handleNetworkName = this.handleNetworkName.bind(this);
    this.handleNetworkID = this.handleNetworkID.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleExplorer = this.handleExplorer.bind(this);
    this.doAddChain = this.doAddChain.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  doAddChain() {
    let networklist = secureLocalStorage.getItem("networks")
      ? secureLocalStorage.getItem("networks")
      : "[]";
    if (this.state.rpcnode === "" || this.state.rpcnode.length < 6) {
      this.setState({ message: "Please enter a valid rpc node url" });
      return;
    }
    if (this.state.networkname === "" || this.state.networkname.length <= 0) {
      this.setState({ message: "Please enter a valid network name" });
      return;
    }
    if (this.state.networkid === 0) {
      this.setState({ message: "Please enter a valid network name" });
      return;
    }
    if (networklist !== null && networklist !== undefined) {
      let networks = JSON.parse(networklist?.toString());
      let accountdata = {
        networkname: this.state.networkname,
        rpcnode: this.state.rpcnode,
        networkid: this.state.networkid,
        currency: this.state.currency,
        explorer: this.state.explorer,
      };
      networks.push(accountdata);
      console.log(networks);
      secureLocalStorage.setItem("networks", JSON.stringify(networks));
      secureLocalStorage.setItem("defaultnetwork", this.state.networkname);
      secureLocalStorage.setItem("rpcnode", this.state.rpcnode);
      window.localStorage.setItem("rpcnode", this.state.rpcnode);
      window.localStorage.setItem("defaultnetwork", this.state.networkname);
      secureLocalStorage.setItem("defaultcurrency", this.state.currency);
      window.localStorage.setItem("defaultcurrency", this.state.currency);
    }

    let networklist2 = secureLocalStorage.getItem("networks")
      ? secureLocalStorage.getItem("networks")
      : "[]";
    if (networklist2 !== null && networklist2 !== undefined) {
      console.log("show networks");
      let networks = JSON.parse(networklist2?.toString());
      for (var i = 0; i <= networks.length + 1; i++) {
        console.log(networks[i]);
      }
    }

    this.goBack();
  }

  handleRPC(event: any) {
    this.setState({ rpcnode: event?.target.value });
  }

  handleNetworkName(event: any) {
    this.setState({ networkname: event?.target.value });
  }

  handleNetworkID(event: any) {
    this.setState({ networkid: event?.target.value });
  }

  handleCurrency(event: any) {
    this.setState({ currency: event?.target.value });
  }

  handleExplorer(event: any) {
    this.setState({ explorer: event?.target.value });
  }

  goBack() {
    this.setState({ redirect: "dashboard" });
  }

  render() {
    if (this.state.redirect == "home") {
      console.log("Go to home");

      return (
        <Link to="/dashboard">
          <Dashboard />
        </Link>
      );
    }
    if (this.state.redirect == "dashboard") {
      console.log("Go to home");

      return (
        <Link to="/dashboard">
          <Dashboard />
        </Link>
      );
    }

    var errormessage = <div></div>;
    if (this.state.message !== "") {
      errormessage = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }

    return (
      <div id="popup">
        <div className="container">
          <FontAwesomeIcon
                  onClick={this.goBack}
                  icon={faArrowAltCircleLeft}
                  style={{height:"35px",width:"35px",position:"absolute",top:"1rem"}}
                />
          <div className='title' style={{textAlign:"center", marginTop:"25px"}}>Add New Network</div>
          <div className="row d-flex" style={{ position:"relative", top:"3rem"}}>
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              <div className="col-md-7 my-2 py-2 login-form">
                <h4>{errormessage}</h4>
                <div className="form-head">
                  {/**<TopTitle title={"Add New Blockchain"} />*/}
                </div>
                <form>
                  <div className="mb-3">
                    {/* <div className="forgot d-flex justify-content-between">
                      <label className="form-label" placeholder="Network Name">Network Name</label>
                    </div> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleNetworkName}
                      value={this.state.networkname}
                      placeholder="Network Name"
                    />
                  </div>
                  <div className="mb-3">
                    {/* <label className="form-label">RPC Node</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleRPC}
                      value={this.state.rpcnode}
                      placeholder="RPC Node"
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label className="form-label">Network ID</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleNetworkID}
                      // value={this.state.networkid}
                      placeholder="Network ID"
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label className="form-label">Currency Symbol</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleCurrency}
                      value={this.state.currency}
                      placeholder="Currency Symbol"
                    />
                  </div>
                  <div className="mb-3">
                    {/* <label className="form-label">
                      Block Explorer(optional)
                    </label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleExplorer}
                      value={this.state.explorer}
                      placeholder="Block Explorer"
                    />
                  </div>

                  <div className="row">
                    <div className="col text-center">
                      {/* <button
                        className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill"
                        onClick={this.goBack}
                      >
                        Cancel
                      </button> */}
                      <button
                        className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill"
                        onClick={this.doAddChain}
                      >
                        Add New Chain
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNewBlockchain;
