import React from "react";
import secureLocalStorage from "react-secure-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
interface IState {
  redirect: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  text8: string;
  text9: string;
  text10: string;
  text11: string;
  text12: string;
  message: string;
  mnemonicarr: any;
}

class MnemonicsConfirm extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: "",
      message: "",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: "",
      text8: "",
      text9: "",
      text10: "",
      text11: "",
      text12: "",

      mnemonicarr: [],
    };
    this.goBack = this.goBack.bind(this);
    this.handleText1 = this.handleText1.bind(this);
    this.handleText7 = this.handleText7.bind(this);
    this.handleText10 = this.handleText10.bind(this);
    this.confirmMnemonic = this.confirmMnemonic.bind(this);
  }

  componentDidMount() {
    this.loadMnemonics();
  }

  confirmMnemonic() {
    if (this.state.text1.length <= 0) {
      this.setState({ message: "Please enter a valid value" });
      return;
    }
    if (this.state.text7.length <= 0) {
      this.setState({ message: "Please enter a valid value" });
      return;
    }
    if (this.state.text10.length <= 0) {
      this.setState({ message: "Please enter a valid value" });
      return;
    }
    if (this.state.mnemonicarr[0] !== this.state.text1) {
      this.setState({ message: "Recovery phase does not match" });
      return;
    }
    if (this.state.mnemonicarr[6] !== this.state.text7) {
      this.setState({ message: "Recovery phase does not match" });
      return;
    }
    if (this.state.mnemonicarr[9] !== this.state.text10) {
      this.setState({ message: "Recovery phase does not match" });
      return;
    }

    try {
      console.log("Setting up loggedin");
      secureLocalStorage.setItem("isloggedin", "true");
    } catch (e) {
      console.log(e);
    }

    this.setState({ redirect: "dashboard" });
  }

  handleText1(event: any) {
    this.setState({ text1: event?.target.value });
  }
  handleText7(event: any) {
    this.setState({ text7: event?.target.value });
  }
  handleText10(event: any) {
    this.setState({ text10: event?.target.value });
  }

  loadMnemonics() {
    const mnemonic = secureLocalStorage.getItem("mnemonic");

    const mnemonicarr = mnemonic?.toString().split(" ");

    this.setState({ mnemonicarr: mnemonicarr });
  }

  goBack() {
    this.setState({ redirect: "createwallet" });
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
                <div className="account-head title">Recovery Phase</div>
              </div>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-lg-8 flex-column justify-content-center align-items-center">
              <div className="col-11">
                <div className="form-head">
                  <h4>{errormessage}</h4>
                </div>

                <p className="size-18"></p>

                <div className="multi-inputs col-12 my-2 mt-3 d-flex flex-wrap">
                  <div className="row">
                    <div className="col-4 py-3 d-flex align-items-center">
                      1.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.text1}
                        onChange={this.handleText1}
                      />
                    </div>
                    <div className="col-4  py-3 d-flex align-items-center">
                      2.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[1]}
                        readOnly
                      />
                    </div>
                    <div className="col-4  py-3 d-flex  align-items-center">
                      3.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[2]}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 py-3 d-flex align-items-center">
                      4.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[3]}
                        readOnly
                      />
                    </div>
                    <div className="col-4 py-3 d-flex align-items-center">
                      5.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[4]}
                        readOnly
                      />
                    </div>
                    <div className="col-4 py-3 d-flex align-items-center">
                      6.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[5]}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 d-flex my-2 align-items-center">
                      7.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.text7}
                        onChange={this.handleText7}
                      />
                    </div>
                    <div className="col-4  d-flex my-2 align-items-center">
                      8.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[7]}
                        readOnly
                      />
                    </div>
                    <div className="col-4 d-flex my-2 align-items-center">
                      9.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[8]}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 py-3 d-flex my-2 align-items-center">
                      10.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.text10}
                        onChange={this.handleText10}
                      />
                    </div>
                    <div className="col-4 py-3 d-flex my-2 align-items-center">
                      11.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[10]}
                        readOnly
                      />
                    </div>
                    <div className="col-4 py-3 d-flex my-2 align-items-center">
                      12.
                      <input
                        type="text"
                        className="form-control py-2"
                        value={this.state.mnemonicarr[11]}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col text-center">
                <button
                  type="submit"
                  className="btn w-100 gold-btn ms-1 py-2"
                  onClick={this.confirmMnemonic}
                >
                  Create Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MnemonicsConfirm;
