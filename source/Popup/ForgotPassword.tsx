import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import ShowPin from "./ShowPin";

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
    this.setState({ redirect: "showpin" });
  }

  render() {
    if (this.state.redirect == "showpin") {
      console.log("Go to home");

      return (
        <Link to="showpin">
          <ShowPin/>
        </Link>
      );
    }
    
    

    return (
      <div id="popup">
        <div className="container">
          <FontAwesomeIcon
            onClick={this.goBack}
            icon={faArrowAltCircleLeft}
            style={{
              height: "35px",
              width: "35px",
              position: "absolute",
              top: "1rem",
            }}
          />
          <div
            className="title"
            style={{ textAlign: "center", position: "relative", top: "2rem" }}
          >
            Import Token
          </div>
          <div
            className="row d-flex"
            style={{ position: "relative", top: "3rem" }}
          >
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              <div className="col-md-7 my-2 py-2 login-form">
                
                <br />
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="Last Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="Re-Enter New Password"
                    />
                  </div>

                  

                  <div className="row">
                    <div className="col text-center">
                   
                      <button className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill">
                        Reset
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
