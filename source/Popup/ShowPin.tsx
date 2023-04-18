import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
//import logo from '../assets/icons/chromescan.png';
import logo from "../assets/icons/logo.png";
import Dashboard from "./Dashboard";
import secureLocalStorage from "react-secure-storage";
import TopTitle from "./Components/TopTitle";
interface IState {
  redirect: string;
  message: string;
  password: string;
}

class ShowPin extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { redirect: "", password: "", message: "" };
    this.doAuth = this.doAuth.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  doAuth() {
    this.setState({ message: "" });
    if (secureLocalStorage.getItem("password") === this.state.password) {
      console.log("Redirecting to setup");
      this.setState({ redirect: "home" });
    } else {
      this.setState({ message: "Invalid password" });
    }
  }

  handlePassword(event: any) {
    this.setState({ password: event.target.value });
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

    var errormessage = <div></div>;
    if (this.state.message !== "") {
      errormessage = (
        <Alert severity="error">{this.state.message}</Alert>
      );
    }
    return (
      <div id="popup">
        <div className="container">
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
            {/**<div className="col-9 mx-auto mb-4">*/}
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              <div className="col-md-7 my-2 py-2 login-form">
                {/* <h1>{errormessage}</h1> */}
                <div className="form-head">
                  {/**<h2 className="lead gold-text">Welcome Back!</h2>*/}
                  <TopTitle title={"Welcome Back!"} />
                  <p className="lead gold-text" style={{ textAlign: "center" }}>
                    The decentralized web awaits
                  </p>
                </div>
                <br />
                <form>
                  <div className="mb-3">
                  
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control rounded-pill py-md-3 py-2"
                      style={{ color: "black" }}
                      onChange={this.handlePassword}
                      value={this.state.password}
                      placeholder="Enter the password"
                    />
                  </div>

                  <div className="row">
                  <h1>{errormessage}</h1>
                    <div className="col text-center">
                      <button
                        style={{ width: 300 }}
                        className="btn btn-primary my-3 gold-btn ms-1 py-2 rounded-pill"
                        onClick={this.doAuth}
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                </form>
                <br />
                {/* <footer> */}
                <h3 style={{ textAlign: "center" }}>
                  Need help? Contact{" "}
                  <a>
                    ChromeScan
                  </a>{" "}
                </h3>
                {/* </footer> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPin;
