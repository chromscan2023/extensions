import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

//import logo from '../assets/icons/logo.png';
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

interface IState {
  redirect: string;
  message: string;
  password: string;
}

class Swap extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { redirect: "", password: "", message: "" };
    this.goBack = this.goBack.bind(this);
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
          <div className="row d-flex">
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              {/** <div className="col-md-7 my-5 py-4 login-form">*/}
              <div className="col-md-7 my-2 py-2 login-form">
                <h1>Comming Soon</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Swap;
