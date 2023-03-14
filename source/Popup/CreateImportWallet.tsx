import React from 'react';
import axios from 'axios';
import Config from './Config';
import logo from '../assets/icons/chromescan.png';
import import1 from '../assets/icons/import1.png';
import import2 from '../assets/icons/import2.png';
//import  secureLocalStorage  from  "react-secure-storage";
//import Web3 from 'web3';
//const web3 = new Web3('http://rpc.terceschat.com');
interface IState {
  redirect: string,
  message:string,
  password:string,
  privatekey:string;
}

  
const API_URL=Config.rooturl;
class CreateImportWallet extends React.Component<{}, IState>{

    constructor(props:any){
        super(props);
        console.log("In Help");
        this.state={redirect:"",message:"",password:"",privatekey:""}
        
        
      }

      componentDidMount(): void {
          this.getTransactions();
      }


      getTransactions():void{
        const myaddress=window.localStorage.getItem("address");
        if(myaddress!==null){
        var data={"address":myaddress};

       axios.post(API_URL+"/dbAddressTxs",data).then(response=>{
            console.log(response.data)
        }); 
         }
      }

      


    render(){
      
        return(<div id="popup">
        <div className="container">
            {/**  <div className="row d-flex justify-content-center" style={{height:"100vh"}}> */} 
             <div className="row d-flex">
            <div className="col-9 mx-auto mb-4">
                <div className="logo-img-div my-3"><img src={logo} alt="Logo" width="50px" height="50px" />
                </div>
                
                 <div className="page-heading gold-text text-center my-5">
                        
                        <div>
                            New to Chromescan?
                        </div>
              
                       
               </div>
               <div className="options_to_chose">
                   <div className="col-12 d-flex justify-content-around">
                       <div className="already_user col-5 p-4 rounded text-center">
                         <div className="import-icon my-1">
                             <img src={import1} alt="import-img" />
                             <div className="down-arrow-icon">
                             <img src={import2} alt="import-img" />
                             </div>
                         </div>  
                         <p>
                             No, I already have a Secret Recovery Phrase
                         </p>
                         <p className="grey-text">
                             Import your existing wallet using a Secret Recovery Phrase
                         </p>

                         <button className="btn btn-primary my-3 w-75 gold-btn ms-1 py-2  rounded-pill">
                            <a href="" className="text-white">
                         Import Wallet
                         </a>
                         </button>
                       </div>
                       <div className="new_user  col-5 p-4  rounded text-center">
                            <div className="add-icon my-1">
                             <i className="bi bi-plus-lg"></i>
                         </div>  
                         <p>
                            Yes, let’s get set up!
                         </p>
                         <p className="grey-text">
                            This will create a new wallet and Secret Recovery Phrase
                         </p>

                         <button className="btn btn-primary my-3 w-75  gold-btn ms-1 py-2  rounded-pill" style={{marginTop:"2.5rem !important"}}>
                            <a href="" className="text-white">
                         Create a Wallet
                         </a>
                         </button>
                           
                       </div>
                   </div>
               </div>
            
        </div>
       
     </div>
 </div>
  

      </div>)
    }

}


export default CreateImportWallet;