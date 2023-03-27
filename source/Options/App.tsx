import React from 'react';
import {Route, Switch} from 'react-router-dom';

import { IdleTimerProvider } from 'react-idle-timer'
import  secureLocalStorage  from  "react-secure-storage";
import Settings from './Settings';
import Networks from './Networks';
import Advance from './Advance';
import Security from './Security';
import Contacts from './Contacts';
import Demo from './Demo';




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
  
   
   
    
    return (
      <IdleTimerProvider
      timeout={1000 * 60}
      onPrompt={this.onPrompt}
      onIdle={this.onIdle}
    >
      <Switch>
      <Route path="/"><Demo /></Route>
      <Route path="/s"><Settings /></Route>
      <Route path="/networks"><Networks /></Route>
      <Route path="/advance"><Advance /></Route>
      <Route path="/security"><Security /></Route>
      <Route path="/contacts"><Contacts /></Route>
      
      </Switch>
      </IdleTimerProvider>
    );
  }
}

export default App;