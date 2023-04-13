import React from "react";
import CreateWallet from "./CreateWallet";
//import logo from '../assets/icons/chromescan.png';
import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";
import Setup from "./Setup";
import TopTitle from "./Components/TopTitle";
//import "../assets/css/common.css";
//import "../assets/css/welcome.css";
interface IState {
  redirect: string;
}

//const style1={backgroundColor:"#A5753D",color:"#FFFFFF",width:"300",borderRadius:"40"}
//const style2={backgroundColor:"#A5753D",color:"#FFFFFF",width:"150",borderRadius:"10"}
//const style3={backgroundColor:"#FFFFFF",borderColor:"#A5753D",color:"#A5753D",width:"150",borderRadius:"10"}
class Help extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    console.log("In Help");
    this.state = { redirect: "" };
    this.goToCreateWallet = this.goToCreateWallet.bind(this);
    this.noThanks = this.noThanks.bind(this);
  }

  noThanks() {
    this.setState({ redirect: "nothanks" });
  }

  goToCreateWallet() {
    this.setState({ redirect: "createwallet" });
  }

  render() {
    if (this.state.redirect == "createwallet") {
      return (
        <Link to="/createwallet">
          <CreateWallet />
        </Link>
      );
    }

    if (this.state.redirect == "nothanks") {
      return (
        <Link to="/">
          <Setup />
        </Link>
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
            {/**  <div className="col-9 mx-auto mb-4">*/}
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              <div>
                {/**<h4>Help us improve ChromeScan</h4>*/}
                <TopTitle title={"Help us improve ChromeScan"} />
                <p className="">
                  ChromeScan would like to gather usage data to better
                  understand how our users interact with the extension. This
                  data will be used to continually improve the usability and
                  user experience of our product and the Chromescan ecosystem.
                </p>

                {/**<p className="my-4">
                                    ChromeScan will..
                                </p>
                                
                                  <div className="do-list">
                                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                              <li className="nav-item">
                                               Always allow you to opt-out via Settings
                                              </li>
                                              <li className="nav-item">
                                                Send anonymized click & pageview events
                                              </li>
                                              <li className="nav-item">
                                                Never collect keys, addresses, transactions, balances, hashes, or any personal information
                                              </li>
                                              <li className="nav-item">
                                               Never collect your full IP address
                                              </li>
                                              <li className="nav-item">
                                               Never sell data for profit. Ever!
                                              </li>
                                      </ul>
                                  </div>
    */}
              </div>
              <div className="btns-div d-flex ">
                <button
                  className="btn btn-primary my-3 w-100 me-1 hollow-btn py-2 small-btn  rounded-pill"
                  onClick={this.noThanks}
                >
                  No Thanks
                </button>

                <button
                  className="btn btn-primary my-3 gold-btn w-100 ms-1 py-2 small-btn rounded-pill"
                  onClick={this.goToCreateWallet}
                >
                  I Agree
                </button>
              </div>

              <span>
                <p className="pb-4">
                  This data is aggregated and is therefore anonymous for the
                  purposes of General Data Protection Regulation (EU) 2016/679.
                  For more information in relation to our privacy practices,
                  please see our{" "}
                  <span className="gold-text"> Privacy policy here. </span>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
