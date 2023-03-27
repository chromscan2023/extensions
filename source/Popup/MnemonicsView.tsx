import React from "react";
import ethers from "ethers";

interface IState {
    redirect:string,
    
}
  
class MnemonicsView extends React.Component<{}, IState>{


    constructor(props:any){
        super(props);
        this.state={redirect:""}
    }


    componentDidMount(){
        this.generateWallet();
    }

    generateWallet(){
        
const wallet = ethers.Wallet.createRandom()
console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic?.phrase)
console.log('privateKey:', wallet.privateKey)
    }

    render(){
        
        return(<div></div>)
    }
}


export default MnemonicsView;

