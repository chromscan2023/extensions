import React from 'react';
import {browser, Tabs} from 'webextension-polyfill-ts';
import './styles.scss';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}

const style1={backgroundColor:"#A5753D",color:"#FFFFFF",width:"300",borderRadius:"40"}

type AppState = {
  nav: string; // like this
};

class Popup extends React.Component{
  state:AppState={
    nav:""
  }
  constructor(props:any){
    super(props);
    this.state = { nav: "" };
    this.goToPopUp = this.goToPopUp.bind(this);
    this.importWallet=this.importWallet.bind(this);
  }

  goToPopUp(){
    //const isfirstuse=false;
    console.log(window)
    //console.log(window.chrome);
    openWebPage('options.html');
    /**chrome.storage.local.set({ isfirstuse }).then(() => {
      console.log("Value is set to " + isfirstuse);
    });
    */
   /*(): Promise<Tabs.Tab> => {
            return openWebPage('options.html');
          }
          */

    
  }

  importWallet(){

    this.setState({nav:"importwallet"})

  }

  render(){
   
    /*if(this.state.nav === "importwallet"){
      return (<Navigate to="/setup" replace={true} />);
    }*/
    return (
      <div id="popup">
        <h1 className='spacer'>Welcome to ChromeCoin Wallet</h1>
        <h2 className='spacer'>Connecting you to ChromeNetwork and the Decentralized Web.</h2>
        <h2 className='spacer'>We’re happy to see you.</h2>
        <div className="mb-3">
        <div className="col text-center spacer">
        <button
         className="btn" style={style1}
          type="button"
          onClick={this.importWallet}
        >
        Import Wallet
        </button>
        <button
         className="btn" style={style1}
          type="button"
          onClick={this.goToPopUp}
        >
         Get Started
        </button>
        </div>
        </div>
        
      </div>
    );
    
  }
}

export default Popup;
