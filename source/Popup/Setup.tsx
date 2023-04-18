import React from "react";
import { Link } from "react-router-dom";
import { browser, Tabs } from "webextension-polyfill-ts";
import CreatePassword from "./CreatePassword";
import Help from "./Help";
//import logo from '../assets/icons/chromescan.png';
//import web3icon from '../assets/web3.svg';
import web3icon from "../assets/web3icon.png";
import logo from "../assets/icons/logo.png";
import "./styles.scss";
import secureLocalStorage from "react-secure-storage";
import TopTitle from "./Components/TopTitle";

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url });
}

interface IState {
  redirect: string;
}

class Setup extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    console.log("Setup");
    console.log(this.props);
    this.state = { redirect: "" };
    this.goToPopUp = this.goToPopUp.bind(this);
    this.importWallet = this.importWallet.bind(this);
    this.goToHelp = this.goToHelp.bind(this);
  }

  componentDidMount(): void {
    secureLocalStorage.clear();
    window.localStorage.clear();
    this.populateRPCNode();
  }

  populateRPCNode() {
    let networklist = secureLocalStorage.getItem("networks")
      ? secureLocalStorage.getItem("networks")
      : "[]";

    if (networklist !== null && networklist !== undefined) {
      let networks = JSON.parse(networklist?.toString());
      let accountdata2 = {
        networkname: "ChromeCoin Testnet",
        rpcnode: "http://rpc.terceschat.com",
        networkid: 7777,
        currency: "CCC",
        explorer: "http://testnet.chromescan.org",
      };
      networks.push(accountdata2);

      let accountdata = {
        networkname: "ChromeCoin Mainnet",
        rpcnode: "https://rpc.chromescan.org",
        networkid: 7776,
        currency: "CCC",
        explorer: "https://chromescan.org",
      };
      networks.push(accountdata);
      console.log(networks);

      secureLocalStorage.setItem("networks", JSON.stringify(networks));

      secureLocalStorage.setItem("defaultnetwork", "ChromeCoin Testnet");
      secureLocalStorage.setItem("rpcnode", "http://rpc.terceschat.com");
      window.localStorage.setItem("rpcnode", "http://rpc.terceschat.com");
      window.localStorage.setItem("defaultnetwork", "ChromeCoin Testnet");
      secureLocalStorage.setItem("defaultcurrency", "CCC");
      window.localStorage.setItem("defaultcurrency", "CCC");
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
  }

  goToPopUp() {
    //const isfirstuse=false;
    console.log(window);
    //console.log(window.chrome);
    openWebPage("options.html");
    let value = false;

    browser.storage.local.set({ isNew: value }).then(() => {
      console.log("Value is set to " + value);
    });
  }

  importWallet(event: any) {
    console.log(event);

    this.setState({ redirect: "importwallet" });
    console.log(this.state);
  }

  goToHelp() {
    this.setState({ redirect: "help" });
    console.log(this.state);
  }

  render() {
    if (this.state.redirect == "importwallet") {
      return (
        <Link to="/createpassword">
          <CreatePassword />
        </Link>
      );
    }

    if (this.state.redirect == "help") {
      return (
        <Link to="/help">
          <Help />
        </Link>
      );
    }

    return (
      <div id="popup">
        <div className="container">
          {/**  <div className="row d-flex justify-content-center" style={{height:"100vh"}}> */}
          <div className="logo-img-div my-3">
            {/**<img src={logo} alt="Logo" width="50px" height="50px" />*/}
            <div className="row">
              <div className="col-3">
                <img src={logo} alt="Logo" className="topIcon" />
              </div>
              <div className="col-9">
                <div className="account-head title"> </div>
              </div>
            </div>
          </div>

          <div className="row d-flex">
            <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center">
              <div className="">
                <img src={web3icon} alt="Logo" width="200px" height="200px" />
              </div>
              <div className="welcome-head text-center">
                {/**<h4 style={{fontSize:"18px"}}>Welcome to Chromecoin</h4>*/}

                <TopTitle title={"Welcome to ChromeScan"} />

                <p className="lead grey-text">
                  Connecting you to ChromeScan and the Decentralized Web
                </p>
                <p className="grey-text">We're happy to see you</p>
              </div>
              <button
                className="button btn btn-primary my-3 w-25 small-btn gold-btn ms-1 py-2  rounded-pill"
                type="button"
                onClick={this.goToHelp}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setup;
