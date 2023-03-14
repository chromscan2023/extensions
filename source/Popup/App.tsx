import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import CreatePassword from './CreatePassword';
import CreateSeed from './CreateSeed';
import CreateWallet from './CreateWallet';
import Help from './Help';
import Receive from './Receive';
import Send from './Send';
//import Setup from './Setup';
import Dashboard from './Dashboard';
import { IdleTimerProvider } from 'react-idle-timer'
import ShowPin from './ShowPin';
import ImportPrivateKey from './ImportPrivateKey';
import ExportPrivateKey from './ExportPrivateKey';
import  secureLocalStorage  from  "react-secure-storage";
import AddNewBlockchain from './AddNewBlockchain';
import AddNewPrivateKey from './AddNewPrivateKey';



interface IState {
  redirect: string,
  isLoggedIn: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props : any){
    super(props);
    console.log(props)
    this.state={redirect:"",isLoggedIn:false}
    console.log("In App")
    //this.onPresenceChange = this.onPresenceChange.bind(this);
    this.onPrompt = this.onPrompt.bind(this);
    this.onIdle = this.onIdle.bind(this);
    //this.onActive = this.onActive.bind(this);
    //this.onAction = this.onAction.bind(this);

}

  componentDidMount() {
  
  }


 //onPresenceChange(presence:any){
    // Handle state changes in one function
    //console.log("Presence")
   // console.log(presence)
 // }

  onPrompt(){
    // Fire a Modal Prompt
    //console.log("onPrompt")
  }

  onIdle(){
    // Close Modal Prompt
    // Do some idle action like log out your user
    //console.log("Idle")
    if(secureLocalStorage.getItem("isfirstuse")==="true"){
      
    this.setState({redirect:"showpin"});

    }

  }

  //onActive(event:any){
    // Close Modal Prompt
    // Do some active action
    //console.log("onPrompt")
   // console.log(event)
  //}

  //onAction(event:any){
    // Do something when a user triggers a watched event
    //console.log("onAction")
   // console.log(event)
  //}


  checkFirstLaunch(){
    console.log("checkFirstLaunch...")
    console.log(window.localStorage.getItem("isfirstuse"));
   

  }

  componentWillUnmount() {
    console.log("componentWillUnmount...")
    console.log(window.localStorage.getItem("isfirstuse"));
  }


  public render() {
  
   
   if(this.state.redirect=="showpin"){

    return (<Link to="/showpin"><ShowPin/></Link>);

   }
    
    return (
      <IdleTimerProvider
      timeout={1000 * 60}
      //onPresenceChange={this.onPresenceChange}
      onPrompt={this.onPrompt}
      onIdle={this.onIdle} 
      //onActive={this.onActive}
      //onAction={this.onAction}
    >
      <Switch>
      <Route path="/"><Dashboard /></Route>
      <Route path="createpassword"><CreatePassword /></Route>
      <Route path="createwallet"><CreateWallet /></Route>
      <Route path="createseed"><CreateSeed /></Route>
      <Route path="dashboard"><Dashboard /></Route>
      <Route path="help"><Help /></Route>
      <Route path="receive"><Receive /></Route>
      <Route path="send"><Send /></Route>
      <Route path="showpin"><ShowPin /></Route>
      <Route path="importwallet"><ImportPrivateKey /></Route>
      <Route path="addnewblockchain"><AddNewBlockchain /></Route>
      <Route path="addnewprivatekey"><AddNewPrivateKey /></Route>
      <Route path="exportkey"><ExportPrivateKey /></Route>
      </Switch>
      </IdleTimerProvider>
    );
  }
}

export default App;