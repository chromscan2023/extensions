import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import DropDown from "./Components/DropDown";
import SwapToToken from "./Components/SwapToToken";
//import logo from '../assets/icons/logo.png';
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

interface IState {
  redirect: string;
  message: string;
  password: string;
  option: boolean;
}

class Swap extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { redirect: "", password: "", message: "", option: false };
    this.goBack = this.goBack.bind(this);
    this.advanceOption = this.advanceOption.bind(this);
  }

  advanceOption() {
    this.setState({ option: true });
  }
  goBack() {
    this.setState({ redirect: "dashboard" });
  }

  render() {
    if (this.state.redirect == "dashboard") {
      console.log("Go to home");
      return (
        <Link to="/dashboard">
          <Dashboard />
        </Link>
      );
    }

    return (
      <div id="popup">
        <div className="container">
          <div style={{ height: "4rem" }}>
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
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              Swap
            </div>
          </div>
          <div className="row d-flex" style={{ backgroundColor: "#fff" }}>
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              {/** <div className="col-md-7 my-5 py-4 login-form">*/}
              <div className="col-md-7 my-2 py-2 login-form">
                <div>
                  Swap From
                  <DropDown />
                </div>
                <br />
                <div>
                  Swap To
                  <SwapToToken />
                </div>
                <br />
                {/* <p
                  style={{ color: "blue", textAlign: "center" }}
                  onClick={this.advanceOption}
                >
                  Advance Option v
                </p>
                {this.state.option && (
                  <p>
                    Slippage <FontAwesomeIcon icon={faCircleInfo} style={{marginLeft:"4rem"}}/>
                    <br />
                    tolerance
                  </p>
                )}
                <br /> */}
                <div>
                  <button
                    className="button btn btn-primary my-3 gold-btn  ms-1 py-2 small-btn rounded-pill"
                    style={{ width: "22rem", marginLeft: "25px" }}
                  >
                    Swap
                  </button>
                  <p style={{ color: "blue", textAlign: "center" }}>
                    Terms of services
                  </p>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Swap;
