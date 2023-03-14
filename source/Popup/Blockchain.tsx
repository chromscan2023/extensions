import Web3 from 'web3';


class Blockchain{

    public web3:Web3;
    constructor(){
        let rpcurl = window.localStorage.getItem("rpcnode") !==null?window.localStorage.getItem("rpcnode"):'http://rpc.terceschat.com'
         this.web3 = new Web3(rpcurl);
    }

    getBalance(address:string){
        return this.web3.eth.getBalance(address).then(res=>{
            let balance:number=0;
            if(res!==undefined && res !==null){
             balance = parseFloat(res) / 1000000000000000000;
        }
           
            return parseFloat(balance.toFixed(8));
           
        })
    }

    async sendCoins(amountToSend:number,address:string,gas:number,privateKey:string){
        const amount = amountToSend*1000000000000000000;
        console.log(amount)
        const transaction = {
        'to': address, 
        'value': amount,
        'gas': gas

        };
        const signedTx = await this.web3.eth.accounts.signTransaction(transaction, privateKey.toString()) || "";
        const Tx=signedTx.rawTransaction || "";
        console.log(Tx)
        return this.web3.eth.sendSignedTransaction(Tx, (error:any, hash:string) => {
           let response={"error":error,"hash":hash};
           return response;
            
       });

    }

    sendToken(){

    }
}


export default Blockchain;