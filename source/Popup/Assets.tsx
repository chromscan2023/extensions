import React from "react";
import axios from "axios";
import Config from "./Config";
import logo from "../assets/icons/logo.png";
import logo1 from "../assets/icons/bnb.png";
import { getCCCPricing } from "../utils";
//import logo from '../assets/icons/chromescan.png';
import secureLocalStorage from "react-secure-storage";
//import Web3 from 'web3';
import Blockchain from "./Blockchain";
//const web3 = new Web3('http://rpc.terceschat.com');

const style = {
  style1: {
    backgroundColor: "#A5753D",
    color: "#FFFFFF",
    width: "300",
    borderRadius: "40",
  },
  font16: { fontSize: "16px" },
  font18: { fontSize: "18px" },
  font20: { fontSize: "20px" },
  borderBottom: { borderBottom: "1px solid #E9E9E9" },
  backgroundWhite: { background: "white" },
};

interface IState {
  redirect: string;
  priceusd: string;
  defaultnetwork:string,
  defaultcurrency: string;
  reload: boolean;
  balance: number;
}

type MyProps={
  defaultnetwork?:string;
}

const API_URL = Config.rooturl;
//const style1={backgroundColor:"#A5753D",color:"#FFFFFF",width:"300",borderRadius:"40"}
//const style2={backgroundColor:"#A5753D",color:"#FFFFFF",width:"150",borderRadius:"10"}
//const style3={backgroundColor:"#FFFFFF",borderColor:"#A5753D",color:"#A5753D",width:"150",borderRadius:"10"}
class Assets extends React.Component<MyProps,IState,{}> {
  constructor(props: any) {
    super(props);
    console.log("In Assets");
    console.log(props);
    //this.props = props;
    this.state = {
      defaultnetwork:"ChromeCoin Testnet",
      redirect: "",
      balance: 0,
      defaultcurrency: "CCC",
      priceusd: "0.0",
      reload: props.reload !== null ? props.reload : false,
    };
  }

  fetchPrice() {
    getCCCPricing().then((res) => {
      const recentprice = parseFloat(res.rows[1].valueInUSD);
      const totalbalanceusd = this.state.balance * recentprice;
      this.setState({ priceusd: totalbalanceusd.toFixed(2) });
    });
  }

  componentDidMount(): void {
    this.getTransactions();
    try {
      let defcurrency = secureLocalStorage.getItem("defaultcurrency");
      let defaultcurrency = defcurrency?.toString();
      if (defaultcurrency !== null && defaultcurrency !== undefined) {
        this.setState({ defaultcurrency: defaultcurrency });
      }
    } catch (e) {
      console.log(e);
    }
  }

  getTransactions(): void {
    const dbaddress = secureLocalStorage.getItem("address");
    const myaddress = dbaddress?.toString();
    if (myaddress !== null && myaddress !== undefined) {
      var data = { address: myaddress?.toLowerCase() };
      let blockchain = new Blockchain();
      blockchain.getBalance(myaddress?.toLowerCase()).then((value: number) => {
        console.log(value);
        this.setState({ balance: value });
        this.fetchPrice();
        setInterval(() => {
          let dbaddress = secureLocalStorage.getItem("address");
          let myaddress = dbaddress?.toString();
          if (myaddress !== null && myaddress !== undefined) {
            this.fetchPrice();
          }
        }, 60000);
      });

      /**  web3.eth.getBalance(myaddress?.toLowerCase()).then((res: string)=>{
            const balance:number = parseFloat(res) / 1000000000000000000;
            console.log(balance);
           this.setState({balance:balance})
        });*/
      axios.post(API_URL + "/dbAddressTxs", data).then((response) => {
        console.log(response.data);
      });
    }
  }

  render() {
    if (this.state.reload) {
      this.getTransactions();
    }

    return (
      <div id="popup" style={{ height: "fit-content",width:"100%" }}>
        <div
          className="col-12 d-flex align-items-center px-3 py-4 tab-pane"
          id="1a"
          style={{ background: "#F1EFE5" }}
        >
          <div className="col-1  diamond-img mx-1">
            {(this.props.defaultnetwork === "ChromeCoin Testnet" ||
              this.props.defaultnetwork === "ChromeCoin Mainnet") && (
              <img src={logo} alt="img"  style={{marginLeft:"5px"}} width="30px" height="30px" />
            )}
            {this.props.defaultnetwork === "Smart Chain" && (
              <img
                className="icon"
                src={logo1}
                alt="img"
                style={{marginLeft:"5px",backgroundColor: "#F1EFE5"}}
                width="30px"
                height="30px"
              />
            )}{" "}
          </div>
          <div className="col-11 d-flex justify-content-between align-items-center px-sm-0 px-3 mx-1">
            <div className="amount-div">
              <div className="upper-div" style={style.font20}>
                {this.state.balance} {this.state.defaultcurrency}
              </div>
              <div className="lower-div">${this.state.priceusd}</div>
            </div>
            <div className="chevron mx-1">
              <i className="fa-solid fa-chevron-right me-2"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Assets;
