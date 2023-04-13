import React from "react";
import axios from "axios";
import Config from "./Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
//import logo from '../assets/icons/chromescan.png';
import secureLocalStorage from "react-secure-storage";
interface IState {
  data: any;
  address: string;
  addressShort: string;
  reload: boolean;
  showmore: boolean;
  redirect: string;
}

type MyProps = {
  // using `interface` is also ok
  currentprice: number;
};

const API_URL = Config.rooturl;
//const style1={backgroundColor:"#A5753D",color:"#FFFFFF",width:"300",borderRadius:"40"}
//const style2={backgroundColor:"#A5753D",color:"#FFFFFF",width:"150",borderRadius:"10"}
//const style3={backgroundColor:"#FFFFFF",borderColor:"#A5753D",color:"#A5753D",width:"150",borderRadius:"10"}
class Transactions extends React.Component<MyProps, IState> {
  constructor(props: any) {
    super(props);
    console.log(props);
    console.log("In Transactions");
    console.log(this.props);

    this.state = {
      redirect: "",
      data: [],
      address: "",
      addressShort: "",
      reload: props.reload !== null ? props.reload : false,
      showmore: false,
    };
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount(): void {
    this.getTransactions();
  }

  showMore() {
    console.log("Now in show more");
    let defnetwork = secureLocalStorage.getItem("defaultnetwork");
    let defaultnetwork = defnetwork?.toString();
    console.log(defaultnetwork);
    let explorer = null;
    let networklist = secureLocalStorage.getItem("networks")
      ? secureLocalStorage.getItem("networks")
      : "[]";
    if (networklist !== null && networklist !== undefined) {
      let networks = JSON.parse(networklist?.toString());
      for (var i = 0; i <= networks.length - 1; i++) {
        console.log(networks[i]);
        if (networks[i].networkname === defaultnetwork) {
          explorer = networks[i].explorer;
        }
      }
    }
    console.log(explorer);
    if (explorer !== undefined && explorer !== null) {
      console.log("Show more");
      var url = explorer + "/address/" + this.state.address;
      console.log(url);
      window.open(url);
    }
  }

  getTransactions(): void {
    let dbaddress = secureLocalStorage.getItem("address");
    let myaddress = dbaddress?.toString();
    if (myaddress !== null && myaddress !== undefined) {
      this.setState({ address: myaddress?.toLowerCase() });
      this.generateAddressShort(myaddress?.toLowerCase());
      var data = { address: myaddress?.toLowerCase(), number: 10 };
      let transactionurl = API_URL + "/dbAddressTxs?page=&number=10";
      console.log(transactionurl);
      //console.log(data)
      axios.post(transactionurl, data).then((response) => {
        //console.log(response.data)
        if (response.data.length >= 10) {
          this.setState({ showmore: true });
        }
        this.setState({ data: response.data });
      });
    }
  }

  formatDate(date: any) {
    //var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var now = new Date(date);
    //console.log(days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear()); //Tuesday February 12 2013

    return months[now.getMonth()] + " " + now.getDate();
  }

  generateAddressShort(address: string) {
    var addressshort =
      address.substring(0, 5) + "....." + address.substring(-1, 4);
    //console.log(addressshort)
    this.setState({ addressShort: addressshort });
  }

  shortenAddress(address: string) {
    var addressshort =
      address.substring(0, 5) + "....." + address.substring(-1, 4);
    //console.log(addressshort)
    return addressshort;
  }

  render() {
    if (this.state.reload) {
      this.getTransactions();
    }

    var showmorebutton = <div></div>;
    if (this.state.showmore) {
      showmorebutton = (
        <button
          className="btn btn-primary my-3 gold-btn w-100 ms-1 py-2 small-btn rounded-pill"
          onClick={this.showMore}
        >
          More...
        </button>
      );
    }

    return (
      <div id="popup" style={{ height: "fit-content" }}>
        {this.state.data.map(
          (
            object: { blocknumber: React.Key | null | undefined },
            i: string | number
          ) => (
            <div className="activities d-flex" key={object.blocknumber}>
              <div className="col-lg-1 col-2 p-2 d-flex justify-content-center align-items-center">
                {this.state.data[i].fromaddress == this.state.address ? (
                  <FontAwesomeIcon icon={faArrowCircleUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowCircleDown} />
                )}
              </div>
              <div className="col-lg-9 col-7 p-3">
                <div className="upper-content">
                  <b style={{ color: "#A5753D" }}>
                    {this.state.data[i].fromaddress == this.state.address
                      ? "Send"
                      : "Receive"}
                  </b>
                </div>
                <div className="lower-content">
                  <span>
                    {" "}
                    <b>{this.formatDate(this.state.data[i].time_stamp)}</b>
                  </span>{" "}
                  - <br />
                  {this.state.data[i].fromaddress == this.state.address
                    ? "To"
                    : "From"}{" "}
                  - {this.shortenAddress(this.state.data[i].toaddress)}
                </div>
              </div>
              <div className="col-lg-2 col-3 text-end p-3">
                <div className="upper-content">
                  {parseInt(this.state.data[i].value, 16) / 10 ** 18} CCC
                </div>
                <div className="lower-content">
                  - $
                  {(
                    (this.props.currentprice *
                      parseInt(this.state.data[i].value, 16)) /
                    10 ** 18
                  ).toFixed(2)}{" "}
                  USD
                </div>
              </div>
            </div>
          )
        )}

        <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center">
          <div className="col-6">{showmorebutton}</div>
        </div>
      </div>
    );
  }
}

export default Transactions;
