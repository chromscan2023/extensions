import Web3 from 'web3';
import {ethers} from "ethers";

class Blockchain{

    public web3:Web3;
    constructor(){
        let rpcurl = window.localStorage.getItem("rpcnode") !==null?window.localStorage.getItem("rpcnode"):'http://rpc.terceschat.com'
         this.web3 = new Web3(rpcurl);
    }

    static createWallet(){
        const wallet = ethers.Wallet.createRandom()
        return wallet;
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


    createAccount(){
        let accountinfo = this.web3.eth.accounts.create();
        return accountinfo;
    }

    toWei(amount:number){
        let amountBN =this.web3.utils.toBN(amount);
        return this.web3.utils.toWei(amountBN)
    }

    estimateGas(address:string,amount:number){
        const transaction = {
            'to': address, 
            'value': amount
        }
        return this.web3.eth.estimateGas(transaction);
    }


    async sendCoins(amountToSend:number,address:string,gas:number,privateKey:string){
        const amount = this.toWei(amountToSend);
        console.log(amount)
        const transaction = {
        'to': address, 
        'value': amount,
        'gas': gas

        };
        console.log(transaction)
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