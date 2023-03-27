import React from 'react';
import '../styles.scss';

interface IState {
    title:string;
  }
class TopTitle extends React.Component<{title:string}, IState>{

    constructor(props:any){
        super(props);
        this.state={
            title:props.title
        }
      }


    render(){
        

        return(<div className="welcome-head text-center">
        <p style={{fontSize:"2rem"}}>{this.state.title}</p>
        
      </div>)
    }

}


export default TopTitle;