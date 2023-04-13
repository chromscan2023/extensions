import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
//import Home from './Home';
import Dashboard from "./Dashboard";
//import logo from '../assets/icons/chromescan.png';
//import Form from 'react-bootstrap/Form';
//import logo from '../assets/icons/logo.png';
import secureLocalStorage from "react-secure-storage";
//import TopTitle from './Components/TopTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Blockchain from "./Blockchain";

interface IState {
  redirect: string;
  address: string;
  message: string;
  name: string;
  checked: boolean;
}

class CreateNewAccount extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    console.log("In CreateNewAccount");
    this.state = {
      redirect: "",
      address: "",
      name: "",
      message: "",
      checked: true,
    };
    this.createWallet = this.createWallet.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.setState({ redirect: "dashboard" });
  }

  handleCheck(e: any) {
    console.log(e);
    console.log("unchecked click");
    if (e.target.checked) {
      console.log("unchecked false");
      this.setState({ checked: false });
    } else {
      console.log("unchecked false");
      this.setState({ checked: false });
    }
    //return;
  }

  createWallet() {
    console.log("Create Wallet");
    if (this.state.name.length < 0) {
      this.setState({ message: "Please enter a valid name." });
      return;
    }
    if (this.state.name !== "") {
      var blockchain = new Blockchain();
      var accountinfo = blockchain.createAccount();
      console.log(accountinfo);

      try {
        //handle accounts
        let accountlist = secureLocalStorage.getItem("accounts")
          ? secureLocalStorage.getItem("accounts")
          : "[]";
        if (accountlist !== null && accountlist !== undefined) {
          let accounts = JSON.parse(accountlist?.toString());

          let accountname = this.state.name;
          let accountdata = {
            name: accountname,
            address: accountinfo.address,
            privateKey: accountinfo.privateKey,
          };
          accounts.push(accountdata);
          console.log(accounts);
          secureLocalStorage.setItem("accounts", JSON.stringify(accounts));
        }

        //show accounts

        let accountlist2 = secureLocalStorage.getItem("accounts")
          ? secureLocalStorage.getItem("accounts")
          : "[]";
        if (accountlist2 !== null && accountlist2 !== undefined) {
          console.log("show accounts");
          let accounts = JSON.parse(accountlist2?.toString());
          for (var i = 0; i <= accounts.length + 1; i++) {
            console.log(accounts[i]);
          }
        }
      } catch (e) {
        console.log(e);
      }

      secureLocalStorage.setItem("address", accountinfo.address);
      secureLocalStorage.setItem("privateKey", accountinfo.privateKey);
      this.setState({ redirect: "dashboard" });
    } else {
      console.log("Could not create wallet");
      this.setState({ message: "Please enter a valid account name" });
      console.log(this.state);
    }
  }

  handleName(event: any) {
    this.setState({ name: event.target.value });
    //console.log(this.state.password)
  }

  render() {
    //console.log(this.state)
    if (this.state.redirect == "dashboard") {
      //console.log("Go to home")
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
          <div className="logo-img-div my-3">
            <div className="row">
              <div className="col-3">
                <FontAwesomeIcon
                  onClick={this.goBack}
                  icon={faArrowAltCircleLeft}
                  size="2x"
                  className="topIcon"
                />
              </div>
              <div className="col-9">
                <div className="account-head title">Create New Account</div>
              </div>
            </div>
          </div>

          <div className="row d-flex">
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              {/** 
            <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center">
                */}

              <div className="col-md-7 my-2 py-2 login-form">
                <h4>{errormessage}</h4>
                <div className="form-head">
                  {/**<TopTitle title={"Create New Account"} />*/}
                </div>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Account Name</label>

                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      onChange={this.handleName}
                      value={this.state.name}
                    />
                  </div>

                  <div className="row">
                    <div className="col text-center">
                      <button
                        style={{ width: 300 }}
                        className="btn btn-primary my-3 gold-btn ms-1 py-2 rounded-pill"
                        onClick={this.createWallet}
                      >
                        Create Account
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

export default CreateNewAccount;
