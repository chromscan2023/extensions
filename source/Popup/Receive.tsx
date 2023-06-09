import React from "react";
import QRCode from "react-qr-code";
//import Home from './Home';
import { Link } from "react-router-dom";
import Web3 from "web3";
//import Toast from 'react-bootstrap/Toast';
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import { Alert } from "@mui/material";
//import { BlockHeader, Block } from 'web3-eth' // ex. package types
const web3 = new Web3("http://rpc.terceschat.com");

interface IState {
  redirect: string;
  copied: boolean;
  showToast: boolean;
  message: string;
  address: string;
}

class Receive extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: "",
      address: "",
      showToast: false,
      message: "",
      copied: false,
    };
    this.refreshWallet = this.refreshWallet.bind(this);
    this.goBack = this.goBack.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.copyTextToClipboard = this.copyTextToClipboard.bind(this);
  }

  generateAddressShort(address: string) {
    var addressshort =
      address.substring(0, 24) + "....." + address.substring(-1, 4);
    return addressshort;
  }

  componentDidMount(): void {
    setInterval(() => {
      this.setState({ copied: false });
    }, 2000);
    console.log("web3");
    let dbaddress = secureLocalStorage.getItem("address");
    let myaddress = dbaddress?.toString();
    if (myaddress !== null && myaddress !== undefined) {
      this.setState({ address: myaddress?.toLowerCase() });
    } else {
      this.refreshWallet();
    }
  }

  toggleShow() {
    if (this.state.showToast) {
      this.setState({ showToast: false });
    } else {
      this.setState({ showToast: true });
    }
  }

  async copyTextToClipboard() {
    console.log("copied to clipboard");
    this.setState({ copied: true });
    this.setState({ message: "copied to clipboard" });
    this.setState({ showToast: true });
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(this.state.address);
    } else {
      return document.execCommand("copy", true, this.state.address);
    }
  }

  refreshWallet() {
    web3.eth.getAccounts().then((res) => {
      //console.log(res[0])
      secureLocalStorage.setItem("address", res[0]);
      this.setState({ address: res[0] });
    });
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
    if (this.state.copied) {
      noticemessage = (
        <Alert
          style={{
            position: "absolute",
            top: "5rem",
            left: "6.5rem",
            zIndex: "99999",
          }}
          severity="success"
        >
          {this.state.message}
        </Alert>
      );
    }

    return (
      <div id="popup">
        <div className="container" style={{ width: "100%" }}>
          <FontAwesomeIcon
            onClick={this.goBack}
            className="backArrow"
            icon={faArrowAltCircleLeft}
          />
          <div
            className="title"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Send To
          </div>
          <div
            className="row d-flex justify-content-center"
            style={{ backgroundColor: "#fff" }}
          >
            {/*<div className="col-md-9 col-12 mx-auto d-flex mt-2 mb-4">
                <div onClick={this.goBack} style={{width:"50px",height:"50px"}}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                </div>
                <div className="account-head title">Receive</div>

                

                           
        </div>*/}
            <div className="mb-3">
              <div className="col text-center">
                <br />
                <div
                  className="spacer"
                  style={{ background: "white", padding: "16px" }}
                >
                  <QRCode
                    value={this.state.address}
                    onClick={this.copyTextToClipboard}
                  />
                </div>
                <div className="spacer">
                  <b onClick={this.copyTextToClipboard}>
                    {this.generateAddressShort(this.state.address)}
                  </b>
                </div>

                {noticemessage}

                <button
                  className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill"
                  type="button"
                  onClick={this.copyTextToClipboard}
                >
                  Copy to clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receive;
