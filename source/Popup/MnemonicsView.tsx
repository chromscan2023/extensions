import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import  secureLocalStorage  from  "react-secure-storage";
import { Link } from 'react-router-dom';
import CreateWallet from "./CreateWallet";
import MnemonicsConfirm from "./MnemonicsConfirm";
interface IState {
    redirect:string,
    mnemonicarr:any
    
}
  
class MnemonicsView extends React.Component<{}, IState>{


    constructor(props:any){
        super(props);
        this.state={redirect:"",mnemonicarr:[]}
        this.goBack= this.goBack.bind(this);
        this.nextMnemonic = this.nextMnemonic.bind(this);
    }


    componentDidMount(){
        this.loadMnemonics();
    }

    loadMnemonics(){
        const mnemonic=secureLocalStorage.getItem("mnemonic");
        
        const mnemonicarr=mnemonic?.toString().split(" ")
        
        this.setState({mnemonicarr:mnemonicarr})

    }

    nextMnemonic(){
        this.setState({redirect:"confirmmnemonic"})
    }

    goBack(){
        this.setState({redirect:"createwallet"})
    }

    render(){
        if(this.state.redirect == "createwallet"){
            //console.log("Go to home")
            return (<Link to="/createwallet"><CreateWallet/></Link>);
        }

        if(this.state.redirect == "confirmmnemonic"){
            //console.log("Go to home")
            return (<Link to="/confirmmnemonic"><MnemonicsConfirm/></Link>);
        }
        console.log(this.state.mnemonicarr)
        return(<div id="popup">
            <div className="container">
            <div className="logo-img-div my-3">
                          <div className="row">
                            <div className="col-3">
                            <FontAwesomeIcon onClick={this.goBack} icon={faArrowAltCircleLeft} size="2x"  className='topIcon' />
                          
                            </div>
                           <div className="col-9">
                            <div className="account-head title">Recovery Phase</div>
                            </div>
                          </div>
                          
                         
                        
                    </div>
        <div className="row d-flex">
        <div className="col-lg-8 flex-column justify-content-center align-items-center"> 
               

                <div className="col-11">

                    
                 <div className="form-head">
                       
                    </div>

                    <p className="size-18">
                        Only the first account on this wallet will auto load. After completing this process, to add additional accounts, click the drop down menu, then select Create Account.
                    </p>

                
                    <div className="multi-inputs col-12 my-2 mt-3 d-flex flex-wrap">
                       
                       <div className="row">
                       <div className="col-4 py-3 d-flex align-items-center">
                        1.
                            <input type="text" className="form-control py-2"  value={this.state.mnemonicarr[0]} readOnly />

                        
                       </div>
                        <div className="col-4  py-3 d-flex align-items-center">
                        2.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[1]} readOnly />

                            
                       </div>
                        <div className="col-4  py-3 d-flex  align-items-center">
                        3.
                            <input type="text" className="form-control py-2"  value={this.state.mnemonicarr[2]} readOnly />

                            
                       </div>
                       </div>
                        
                       <div className="row">
                       <div className="col-4 py-3 d-flex align-items-center">
                        4.
                            <input type="text" className="form-control py-2"  value={this.state.mnemonicarr[3]} readOnly />

                            
                       </div>
                        <div className="col-4 py-3 d-flex align-items-center">
                        5.
                            <input type="text" className="form-control py-2"  value={this.state.mnemonicarr[4]} readOnly />

                            
                       </div>
                        <div className="col-4 py-3 d-flex align-items-center">
                        6.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[5]} readOnly />

                            
                       </div>
                       </div>
                       <div className="row">
                       <div className="col-4 d-flex my-2 align-items-center">
                        7.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[6]} readOnly />

                            
                       </div>
                        <div className="col-4  d-flex my-2 align-items-center">
                        8.
                            <input type="text" className="form-control py-2"  value={this.state.mnemonicarr[7]} readOnly />

                            
                       </div>
                        <div className="col-4 d-flex my-2 align-items-center">
                        9.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[8]} readOnly />

                            
                       </div>
                       </div>
                        
                       <div className="row">
                      <div className="col-4 py-3 d-flex my-2 align-items-center">
                        10.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[9]} readOnly />

                            
                       </div>
                        <div className="col-4 py-3 d-flex my-2 align-items-center">
                        11.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[10]} readOnly />

                            
                       </div>
                      <div className="col-4 py-3 d-flex my-2 align-items-center">
                        12.
                            <input type="text" className="form-control py-2" value={this.state.mnemonicarr[11]} readOnly />

                            
                       </div>
                       </div>



                    </div>

                </div>

                <div className="col text-center">
                    <button type="submit" className="btn w-100 gold-btn ms-1 py-2" onClick={this.nextMnemonic}>   
                        Next
                    </button>
                </div>
                           
            </div>
        </div>
    </div>
    </div>);
    }
}


export default MnemonicsView;

