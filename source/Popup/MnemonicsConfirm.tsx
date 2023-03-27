import React from "react";


interface IState {
    redirect:string,
    
}
  
class MnemonicsConfirm extends React.Component<{}, IState>{


    constructor(props:any){
        super(props);
        this.state={redirect:""}
    }

    render(){
        
        return(<div></div>)
    }
}


export default MnemonicsConfirm;

