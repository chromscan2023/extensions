import React from "react";
import Sidebar from "./Components/Sidebar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import logo from "../assets/icons/logo.png";
import "./styles.scss";

class Settings extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="main-container-wrapper">
        <div className="main-container">
          <div className="logo-img-div my-3">
            <div className="row">
              <div className="col-3">
                <img src={logo} alt="Logo" className="topIcon" />
              </div>
              <div className="col-9">
                <div className="account-head title"> </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-3">
              <Sidebar />
            </div>
            <div className="col-md-10 col-9" style={{ background: "#FAF9F4" }}>
              <Tabs
                defaultActiveKey="general"
                id="settings-tab"
                className="mb-3"
                fill
              >
                <Tab eventKey="general" title="General">
                  <div className="tab-head size-18 fw-bold my-2">
                    Currency Conversion
                  </div>
                  <p className="grey-text my-2">
                    Base Currency for market value
                  </p>
                  <div
                    className="place dropdown active-account my-3"
                    style={{ width: "fit-content" }}
                  >
                    <button
                      className="btn dropdown-toggle d-flex align-items-center pe-4 grey-text rounded-pill mx-1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div>USD-us Dollar</div>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="theme-toggle-btn my-5">
                    <div className="size-18 fw-bold mb-2">Theme</div>
                    <input type="checkbox" />
                  </div>
                  <div className="col-md-6 mb-5 pb-3">
                    <div className="tab-head size-18 fw-bold my-2">
                      Currency Conversion
                    </div>
                    <p className="grey-text my-2">
                      Base Currency for market value
                    </p>
                    <div className="curruncy-input">
                      <input
                        type="text"
                        className="form-control rounded-pill mt-4 py-2"
                        id="exampleInput"
                        placeholder=""
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="security" title="Security & Privacy">
                  <div className="tab-head size-18 fw-bold my-2">
                    Participate in ChromeScan
                  </div>
                  <p className="grey-text my-2">
                    Participate in Chromescan to help us make Chromescan better
                  </p>
                  <div className="theme-toggle-btn my-2">
                    <input type="checkbox" />
                  </div>

                  <div className="tab-head size-18 fw-bold my-2">
                    Participate in Error Tracing
                  </div>
                  <p className="grey-text my-2">
                    Participate in Error Tracing to help us make Chromescan
                    better by seeing bugs on your application
                  </p>
                  <div className="theme-toggle-btn my-2">
                    <input type="checkbox" />
                  </div>
                </Tab>
                <Tab eventKey="about" title="About & Support">
                  <div className="tab-head size-18 fw-bold my-2">
                    Portfolio dApp
                  </div>
                  <p className="grey-text">2.10.3</p>
                  <p className="grey-text my-3">
                    The Portfolio dApp is your portal to web3, allowing you to
                    connect your multiple wallets and see your entire portfolio.
                    We’re excited for you to try it out!
                  </p>

                  <ul className="my-4 p-0" style={{ listStyleType: "none" }}>
                    <li className="my-3 gold-text">
                      <a href="" className="">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="my-3 gold-text">
                      <a href="">Support Center</a>
                    </li>
                    <li className="my-3 gold-text">
                      <a href="">Contact Us</a>
                    </li>
                  </ul>
                </Tab>
                <Tab eventKey="hidden" title="Hidden tokens">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Token</th>
                        <th scope="col">Price</th>
                        <th scope="col">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                      <tr></tr>
                      <tr></tr>
                    </tbody>
                  </table>
                  <div>
                    <div className="size-18 fw-bold my-2 text-center">
                      No Hidden Tokens
                    </div>
                    <p className="my-2 text-center">
                      You have not hidden any tokens yet.
                    </p>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
