import React from 'react';
import { Link } from 'react-router-dom';
import Receive from './Receive';
import Send from './Send';
import Setup from './Setup';
import logo from '../assets/icons/logo.png';
import swap from '../assets/icons/swap.png';
import send from '../assets/icons/send.png';
import receive from '../assets/icons/receive.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Transactions from './Transactions';
import Assets from './Assets';
import Dropdown from 'react-bootstrap/Dropdown';
import ShowPin from './ShowPin';
import  secureLocalStorage  from  "react-secure-storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEllipsisV, faGear, faMessage, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
//import Avatar from 'react-avatar';
import CreateWallet from './CreateWallet';
import ImportPrivateKey from './ImportPrivateKey';
import ExportPrivateKey from './ExportPrivateKey';
import AddNewBlockchain from './AddNewBlockchain';
import AddNewPrivateKey from './AddNewPrivateKey';
import Blockchain from './Blockchain';
import { getCCCPricing, openWebPage } from '../utils';
import CreateNewAccount from './CreateAccount';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
//import { BlockHeader, Block } from 'web3-eth' // ex. package types
import "./Dashboard.scss";
import Swap from './Swap';

const style={
    style1:{backgroundColor:"#A5753D",color:"#FFFFFF",width:"300",borderRadius:"40"},
    font16:{fontSize:"16px"},
    font18:{fontSize:"18px"},
    font20:{fontSize:"20px"},
    borderBottom:{borderBottom: "1px solid #E9E9E9"},
    backgroundWhite:{background:"white"}

}


interface IState {
    redirect: string,
    isLoggedIn: boolean,
    balance:number,
    currentprice:number,
    pricechange:string,
    priceusd:string,
    addressShort:string,
    defaultnetwork:string,
    defaultaccount:string,
    defaultcurrency:string,
    openaccount:boolean,
    modalshow:boolean,
    myaccountview:[],
    accountsmenu:any,
    networksmenu:any,
    reload:boolean,
    address:string;
  }


class Dashboard extends React.Component<{}, IState>{
    public accountsmenu:any;
    constructor(props:any){
        super(props);
        console.log(this.props)
        this.state={
          redirect:"",
          isLoggedIn:false,
          reload:false,
          defaultnetwork:"ChromeCoin Testnet",
          defaultaccount:"Account 1",
          defaultcurrency:"CCC",
          address:"",
          addressShort:"",
          balance:0.0,
          openaccount:false,
          modalshow:false,
          myaccountview:[],
          networksmenu:[],
          currentprice:0.0,
          pricechange:"0.0",
          priceusd:"0.0",
          accountsmenu:[]};
        this.goToSend= this.goToSend.bind(this);
        this.goToReceive= this.goToReceive.bind(this);
        this.defaultAccountPicked = this.defaultAccountPicked.bind(this);
        this.goToAddNewBlockchain= this.goToAddNewBlockchain.bind(this);
        this.networkChanged = this.networkChanged.bind(this);
        this.openAccountView = this.openAccountView.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.goToCreate = this.goToCreate.bind(this);
        this.goToImport = this.goToImport.bind(this);
        this.goToAddNewPrivateKey = this.goToAddNewPrivateKey.bind(this);
        this.goToCreateNewAccount= this.goToCreateNewAccount.bind(this);
        this.goToExport= this.goToExport.bind(this);
        this.goToSwap = this.goToSwap.bind(this);
        this.populateAccounts = this.populateAccounts.bind(this);
        this.populateNetworks = this.populateNetworks.bind(this);
        this.accountChanged = this.accountChanged.bind(this);
        this.networkChanged = this.networkChanged.bind(this);
        this.updateDefaultAccount = this.updateDefaultAccount.bind(this);
        this.updateDefaultNetwork= this.updateDefaultNetwork.bind(this);
        this.searchAddress = this.searchAddress.bind(this);
        this.handleAccountView = this.handleAccountView.bind(this);
        
      }


      handleAccountView(e:any){
        console.log(e)
        if(e=="Explorer"){

          openWebPage("https://testnet.chromescan.org");
          return;

        }
        if(e=="ExpandView"){
          //openWebPage("options.html");
          return;
        }
        if(e=="ConnectedSites"){
          //openWebPage("options.html");
          return;
        }
        if(e=="AccountDetails"){
          this.openAccountView();
          return;

        }

      }

      handleClose(){
        this.setState({openaccount:false})
        this.setState({modalshow:false})
      }

      openAccountView(){
        console.log("Open account view")
        this.setState({openaccount:true})
        this.setState({modalshow:true})
      }

      fetchPrice(){
        getCCCPricing().then(res=>{
          const lastprice=parseFloat(res.rows[0].valueInUSD);
            const recentprice=parseFloat(res.rows[1].valueInUSD);
            const pricediff=recentprice-lastprice;
            const totalprice=recentprice+lastprice;
            const avgprice= totalprice/2;
            const pricechange=(pricediff/avgprice * 100);
            const totalbalanceusd=this.state.balance * recentprice;
            this.setState({currentprice:recentprice})
            this.setState({pricechange:pricechange.toFixed(2)})
            this.setState({priceusd:totalbalanceusd.toFixed(2)})
       
           
           
        })
    }

      networkChanged(e:any){
        console.log(e)
        this.setState({defaultnetwork:e})
        this.setNetworkAsDefault(e)
        
      }

      searchAddress(){

      }

      accountChanged(e:any){
        console.log("Value "+e);
        if(e=="Settings"){
          //openWebPage("options.html");
          return;
        
        }
        if(e=="Support"){
          openWebPage("https://chromescan.org/support");
          return;
        }

        if(e=="ImportAccount"){
          this.goToAddNewPrivateKey();
          return;
        }
        if(e=="CreateAccount"){
          this.goToCreateNewAccount();
          return;
        }
        this.setAccountAsDefault(e);
      }

      generateAddressShort(address:string){
        var addressshort=address.substring(0,5)+"....."+address.substring(-1,4);
        console.log(addressshort)
        this.setState({addressShort:addressshort})
      }

      updateDefaultAccount(){
        try{
          let defaccount=secureLocalStorage.getItem("defaultaccount")!==null?secureLocalStorage.getItem("defaultaccount"):"Account 1";
          let defaultaccount = defaccount?.toString();
          if(defaultaccount!==null && defaultaccount!==undefined){
            this.setState({defaultaccount:defaultaccount});
         }
        }catch(e){
          console.log(e);
        }
      }

      updateDefaultNetwork(){
        try{
          let defnetwork=secureLocalStorage.getItem("defaultnetwork")!==null?secureLocalStorage.getItem("defaultnetwork"):"";
          let defaultnetwork = defnetwork?.toString();
          if(defaultnetwork!==null && defaultnetwork!==undefined){
            this.setState({defaultnetwork:defaultnetwork});
         }
        }catch(e){
          console.log(e);
        }
      }

      goToCreateNewAccount(){
        this.setState({redirect:"createnewaccount"})
      }

      componentDidMount(): void {
        console.log("componentDidMount...")
        //console.log(window.localStorage.getItem("isfirstuse"));
        if(secureLocalStorage.getItem("isfirstuse")!=="true"){
          console.log("Redirecting to setup")
            this.setState({redirect:"setup"});
          }else{

         if(secureLocalStorage.getItem("isloggedin")!=="true"){
          this.setState({redirect:"showpin"});
         }else{

          try{
            this.populateAccounts();
          }catch(e){
            console.log(e)
          }
          this.updateDefaultAccount();
          try{
            this.populateNetworks();
          }catch(e){
            console.log(e)
          }


          try{
            let defcurrency=secureLocalStorage.getItem("defaultcurrency");
            let defaultcurrency=defcurrency?.toString();
            if(defaultcurrency!==null && defaultcurrency!==undefined){
              this.setState({defaultcurrency:defaultcurrency})
            }
            
          }catch(e){
            console.log(e)
          }
          
        
        let dbaddress=secureLocalStorage.getItem("address");
        let myaddress = dbaddress?.toString();
        if(myaddress!==null && myaddress!==undefined){
            this.setState({address:myaddress?.toLowerCase()})
            this.generateAddressShort(myaddress?.toLowerCase());
            this.fetchBalance(myaddress?.toLowerCase());
            this.fetchPrice();
            this.setState({reload:true})
            setInterval(()=>{
              let dbaddress=secureLocalStorage.getItem("address");
              let myaddress = dbaddress?.toString();
              if(myaddress!==null && myaddress!==undefined){
                this.fetchBalance(myaddress?.toLowerCase());
                this.fetchPrice();
              }
            },60000);
            
            
            
        }else{
          this.setState({redirect:"setup"});
        }

        

      }

    }
        
      }


      defaultAccountPicked(e:any){
        this.setAccountAsDefault(e);
      }

      setAccountAsDefault(name:string){
        let accountlist = secureLocalStorage.getItem("accounts")?secureLocalStorage.getItem("accounts"):"[]";
        if(accountlist !==null && accountlist !==undefined){
            console.log("set account")
            let accounts=JSON.parse(accountlist?.toString());
            console.log(accounts)
            for(var i=0;i<=accounts.length-1;i++){
              try{
                console.log(i)
              //console.log(accounts[i].name)
              if(accounts[i].name==name){
                
                secureLocalStorage.setItem("defaultaccount",accounts[i].name);
                secureLocalStorage.setItem("address",accounts[i].address);
                secureLocalStorage.setItem("privateKey",accounts[i].privateKey);
                window.localStorage.setItem("address",accounts[i].address);
                
                this.setState({defaultaccount:accounts[i].name})
                this.fetchBalance(accounts[i].address?.toLowerCase());
               
              }

            }catch(e){
              console.log(e)
            }
            }
          
        }

      }



      setNetworkAsDefault(name:string){
        let networklist = secureLocalStorage.getItem("networks")?secureLocalStorage.getItem("networks"):"[]";
        if(networklist !==null && networklist !==undefined){
            console.log("set networks")
            let networks=JSON.parse(networklist?.toString());
            console.log(networks)
            for(var i=0;i<=networks.length-1;i++){
              try{
                console.log(i)
              //console.log(accounts[i].name)
              if(networks[i].networkname==name){
                
                secureLocalStorage.setItem("defaultnetwork",networks[i].networkname);
                secureLocalStorage.setItem("rpcnode",networks[i].rpcnode);
                secureLocalStorage.setItem("networkid",networks[i].networkid);
                secureLocalStorage.setItem("currency",networks[i].currency);
                window.localStorage.setItem("currency",networks[i].currency);
                window.localStorage.setItem("explorer",networks[i].explorer);
                window.localStorage.setItem("rpcnode",networks[i].rpcnode);
                secureLocalStorage.setItem("defaultcurrency",networks[i].currency)
                window.localStorage.setItem("defaultcurrency",networks[i].currency);
                this.setState({defaultnetwork:networks[i].networkname})
                this.setState({defaultcurrency:networks[i].currency})
                this.refreshBalance();
                
               
              }

            }catch(e){
              console.log(e)
            }
            }
            
            
        }

      }

      refreshBalance(){
        let dbaddress=secureLocalStorage.getItem("address");
        let myaddress = dbaddress?.toString();
        if(myaddress!==null && myaddress!==undefined){
            this.setState({address:myaddress?.toLowerCase()})
            this.generateAddressShort(myaddress?.toLowerCase());
            this.fetchBalance(myaddress?.toLowerCase());
        }
      }

      populateNetworks(){
        let networklist = secureLocalStorage.getItem("networks")?secureLocalStorage.getItem("networks"):"[]";
            if(networklist !==null && networklist !==undefined){
                console.log("show networks")
                let networks=JSON.parse(networklist?.toString());
                this.setState({networksmenu:networks})
                
            }
      }

      populateAccounts(){
        let accountlist = secureLocalStorage.getItem("accounts")?secureLocalStorage.getItem("accounts"):"[]";
        if(accountlist !==null && accountlist !==undefined){
            console.log("show accounts")
            let accounts=JSON.parse(accountlist?.toString());
            //console.log(accounts)
            /**for(var i=0;i<=accounts.length+1;i++){
              console.log(accounts[i]);
            }**/
            /** var accountsmenu=[];
            for(var i=0;i<=accounts.length+1;i++){
                console.log(accounts[i]);
                
                //accountsmenu.push(<Dropdown.Item href={accounts[i].name}>{accounts[i].name}</Dropdown.Item>);
            }*/
            this.setState({accountsmenu:accounts})
            
        }
      }

      fetchBalance(myaddress:string){
        this.setState({reload:false})
        const blockchain = new Blockchain();
        blockchain.getBalance(myaddress).then(balance=>{
          console.log("Balance is ")
          console.log(balance)
          this.setState({balance:balance});
          this.setState({reload:true})
        }).catch(e=>{
          console.log(e)
        })
        /**web3.eth.getBalance(myaddress).then(res=>{
            const balance:number = parseFloat(res) / 1000000000000000000;
            console.log(balance);
           this.setState({balance:balance});
           this.setState({reload:true})
        })*/
      }

      goToAddNewBlockchain(){
        this.setState({redirect:"addnewblockchain"})
      }

      goToAddNewPrivateKey(){
        this.setState({redirect:"addnewprivatekey"})
      }

      goToImport(){
        this.setState({redirect:"import"})
      }

      goToCreate(){
        this.setState({redirect:"create"})
      }


      goToExport(){
        this.setState({redirect:"export"})
      }

      goToReceive(){
        this.setState({redirect:"receive"})
      }

      goToSend(){
        this.setState({redirect:"send"})
      }

      goToSwap(){
        this.setState({redirect:"swap"})
      }

      

    render(){
        if(this.state.redirect === "setup"){
            console.log("Using navigate")
           return (<Link to="/setup"><Setup/></Link>);
           
        }

        if(this.state.redirect === "showpin"){
          console.log("Using navigate")
         return (<Link to="/showpin"><ShowPin/></Link>);
         
      }

        if(this.state.redirect === "send"){
            console.log("Using navigate")
           return (<Link to="/send"><Send/></Link>);
           
        }

        if(this.state.redirect === "receive"){
            console.log("Using navigate")
           return (<Link to="/receive"><Receive/></Link>);
           
        }

        if(this.state.redirect === "create"){
          console.log("Using navigate")
         return (<Link to="/createwallet"><CreateWallet /></Link>); 
        }

        if(this.state.redirect === "createnewaccount"){
          console.log("Using navigate")
         return (<Link to="/createnewaccount"><CreateNewAccount /></Link>); 
        }

        if(this.state.redirect === "export"){
          console.log("Using navigate")
         return (<Link to="/exportkey"><ExportPrivateKey /></Link>); 
        }

        if(this.state.redirect === "import"){
          console.log("Using navigate")
         return (<Link to="/importwallet"><ImportPrivateKey /></Link>);
         
        }

        if(this.state.redirect === "addnewblockchain"){
          console.log("Using navigate")
         return (<Link to="/addnewblockchain"><AddNewBlockchain /></Link>); 
        }
        if(this.state.redirect === "addnewprivatekey"){
          console.log("Using navigate")
         return (<Link to="/addnewprivatekey"><AddNewPrivateKey /></Link>); 
        }

        if(this.state.redirect === "swap"){
          console.log("Using navigate")
         return (<Link to="/swap"><Swap /></Link>); 
        }
        
        
        var defaultaccountname="Account 1";
        if(this.state.accountsmenu.length>0){
          defaultaccountname=this.state.accountsmenu[0].name;
        }

        var accountview=<div></div>
        if(this.state.openaccount){
          accountview=<Modal show={this.state.modalshow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Nav className="flex-column">
             {/**<Nav.Link onClick={this.goToCreate}>Create Account</Nav.Link>*/}
      <Nav.Link onClick={this.goToAddNewBlockchain}>Add New Network</Nav.Link>
      <Nav.Link onClick={this.goToAddNewPrivateKey}>Import Private Key</Nav.Link>
      <Nav.Link onClick={this.goToExport}>Export Account</Nav.Link>
      
    </Nav>
          </Modal.Body>
          
        </Modal>
        }

        var assetview=<div></div>;
        if(this.state.reload && this.state.defaultnetwork==="ChromeCoin Testnet"){
          assetview = <Assets  />;
        }

        var transactionview=<div></div>;
        if(this.state.reload && this.state.defaultnetwork==="ChromeCoin Testnet"){
          transactionview = <Transactions currentprice={this.state.currentprice} />;
        }

        

        return(<div id="pop" className="extension-spacer">
          <div className="row d-flex justify-content-center" style={{width:"400px"}}>
          <div className="logo-img-div my-3">
       
        <div className="row">
                            <div className="col-3">
                            <img src={logo} alt="Logo" className='topIcon' />
                          
                            </div>
                            <div className="col-6">
                            <Dropdown className="rounded-pill" onSelect={this.networkChanged}>
                              <Dropdown.Toggle variant="default" id="dropdown-basic">
                              {this.state.defaultnetwork}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                      {this.state.networksmenu.map((_object:any,i: string | number)=>

                      <Dropdown.Item eventKey={this.state.networksmenu[i].networkname}>{this.state.networksmenu[i].networkname}</Dropdown.Item>
                      )
                      }
                      </Dropdown.Menu>
                      </Dropdown>
                            </div>
                            <div className='col-3' style={{paddingLeft:"30px"}}>
                            
                            <Dropdown className="active-account" onSelect={this.accountChanged}>
                              <Dropdown.Toggle className="circlebtn">
                              {this.state.defaultaccount!==""?this.state.defaultaccount.charAt(0):defaultaccountname}
                              </Dropdown.Toggle>
                     

                      <Dropdown.Menu className="acctmenu">
                        <div className='accountList'>
                          <div className="searchbox">
                        <span className="iconspacer"><FontAwesomeIcon icon={faSearch} /></span><input type="text" value={this.state.address} onChange={this.searchAddress} />
                        </div>
                      <ListGroup style={{height:"120px",overflowX:"scroll"}}>
                      {this.state.accountsmenu.map((_object:any,i: string | number)=>
                      <ListGroupItem action eventKey={this.state.accountsmenu[i].name} onClick={this.defaultAccountPicked}>{this.state.accountsmenu[i].name}</ListGroupItem>
                      
                      )
                      }
                      </ListGroup>
                      </div>
                      <Dropdown.Item className="" eventKey={"CreateAccount"}><span className="iconspacer"><FontAwesomeIcon icon={faPlus} /> </span> Create Account</Dropdown.Item>
                      <Dropdown.Item className="" eventKey={"ImportAccount"}><span className="iconspacer"><FontAwesomeIcon icon={faDownload} /></span>Import Account</Dropdown.Item>
                      <Dropdown.Item className="" eventKey={"Support"}><span className="iconspacer"><FontAwesomeIcon icon={faMessage} /></span>Support</Dropdown.Item>
                      <Dropdown.Item className="" eventKey={"Settings"}><span className="iconspacer"><FontAwesomeIcon icon={faGear} /></span>Settings</Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                            </div>
                          </div>
      </div>
          
          

            <div className="col-md-9 p-0" style={style.backgroundWhite}>
                <div className="col-12 d-flex justify-content-center py-3 px-3" style={style.borderBottom}>
                    <div className="account-head ms-auto">
                    {this.state.defaultaccount!==""?this.state.defaultaccount:defaultaccountname}
                    </div>
                    <div className="more-icon ms-auto">
                      {/** * <FontAwesomeIcon icon={faEllipsisV} />**/}
                      <Dropdown onSelect={this.handleAccountView}>
                      <Dropdown.Toggle>
                      <FontAwesomeIcon icon={faEllipsisV} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                      <Dropdown.Item className="menu_item_text" eventKey={"Explorer"}>View Explorer</Dropdown.Item>
                      <Dropdown.Item className="menu_item_text" eventKey={"ExpandView"}><span className="iconspacer"><FontAwesomeIcon icon={faDownload} /></span>Expand View</Dropdown.Item>
                      <Dropdown.Item className="menu_item_text" eventKey={"AccountDetails"}><span className="iconspacer"><FontAwesomeIcon icon={faMessage} /></span>Account Details</Dropdown.Item>
                      <Dropdown.Item className="menu_item_text" eventKey={"ConnectedSites"}><span className="iconspacer"><FontAwesomeIcon icon={faGear} /></span>Connected Sites</Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    
                </div>
                <div className="diamond-img col-12 d-flex justify-content-center my-2 py-3">
                    <img src={logo} alt="img" width="30px" height="30px" />
                    
                </div>

                {accountview}


                <div className="amount-div d-flex flex-column justify-content-center bigfont">
                    <div className="upper-div-cc text-center">
                    <b>{this.state.balance} {this.state.defaultcurrency}</b>
                    </div>
                    <div className="lower-div-usd text-center">
                        ${this.state.priceusd}
                    </div>
                    
                </div>
                <div className="interaction-btns d-flex justify-content-center align-items-center my-2 py-3">
                    
                    <div className="send-btn mx-2 text-center">
                        <img src={receive} className="rounded float-right" onClick={this.goToReceive} /> 
                        
                    </div>
                    <div className="Receive-btn mx-2 text-center">
                        <img src={send} className="rounded float-left" onClick={this.goToSend} /> 
                       
                    </div>
                    <div className="Receive-btn mx-2 text-center">
                        <img src={swap} className="rounded float-left" onClick={this.goToSwap} /> 
                       
                    </div>
                    
                </div>

  
               
                {/**<div className="col-12 text-center py-3" style={style.font16}>
                  <img src="https://webcreaters.com/dev/chromescan/new/images/protfolio-icon.png" alt="img" className="mx-2" />                      
                    Portfolio Site
                
      </div>*/}

                 



                    <Tabs
      defaultActiveKey="activity"
      id="transactions"
      className="mb-3"
      fill
    >
      <Tab eventKey="assets" title="Assets">
      {assetview}
      </Tab>
      <Tab eventKey="activity" title="Activity">
      {transactionview}
      </Tab>
      
    </Tabs>
               
               
               {/**  
                <div className="get-help grey-text col-12 py-4 d-flex flex-column align-items-center justify-content-center">
                    <div className="first-text my-1" style={style.font16}>
                       <a href="">
                           
                        Don’t see your token
                       </a>
                    </div>
                    <div className="second-text my-1" style={style.font16}>
                        <span className="gold-text">
                            <a href="">
                                
                             Refresh list
                            </a>
                        </span> 
                     or 
                     <span className="gold-text">
                        <a href="">
                         
                         import tokens?
                        </a> 
                     </span>
                    </div>
                    <div className="third-text my-1" style={style.font18}>
                      <a href="">
                           Need help? Contact
                      </a>  
                      <span className="gold-text">
                          <a href="">
                              
                           ChromeScan
                          </a>
                     </span>
                   </div>
                    
                </div>
                */}
                
            </div>
        </div>
    </div>
    )
    }

}


export default Dashboard;