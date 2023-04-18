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
                <form>
                  <div className="mb-3">
                    {/* <div className="forgot d-flex justify-content-between">
                      <label className="form-label" placeholder="Network Name">Network Name</label>
                    </div> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="Network Name"
                    />
                  </div>
                  <div className="mb-3">
                    {/* <label className="form-label">RPC Node</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="RPC Node"
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label className="form-label">Network ID</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
                      placeholder="Network ID"
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label className="form-label">Currency Symbol</label> */}
                    <input
                      type="text"
                      className="form-control rounded-pill py-md-3 py-2"
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
                      <button className="button btn btn-primary my-3 w-25 gold-btn ms-1 py-2  rounded-pill">
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

export default Swap;
