import React from 'react';

import './styles.scss';


class Options extends React.Component{

  constructor(props:any){
    super(props);
  }


  render(){
    return (
    <div className="container-fluid portfolio">
    <div className="row">
     <div className="col-md-2 col-3">
        <nav id="sidebar">
            <div className="sidebar-header py-5">
                
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="">
                        <i className="bi bi-grid mx-2"></i> Portfolio</a>
                    
                </li>
                <li>
                    <a href="#">
                        <i className="fa-sharp fa-solid fa-right-left mx-2"></i> Swap</a>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="">
                        <i className="fa-solid fa-bridge mx-2"></i> Bridge</a>
                   
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-coins mx-2"></i> Stake</a>
                </li>
                <li>
                    <a href="#">
                        <i className="far fa-light fa-star mx-2"></i> Watchlist</a>
                </li>
                <li>
                    <a href="#">
                        <i className="bi bi-nut mx-2"></i> Settings</a>
                </li>

            </ul>
            <ul className="list-unstyled components">
                <li className="">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="">
                        <i className="bi bi-question-circle mx-2"></i> FAQ</a>
                    
                </li>
                <li>
                    <a href="#">
                        <i className="bi bi-question-circle mx-2"></i> Contact</a>
                </li>
               
               
            </ul>

         <div className="d-flex align-items-center">
             <img src="https://webcreaters.com/dev/chromescan/new/images/out.png" alt="img" className="mx-2" />
             Terms of services
         </div>
        </nav>
     </div>
        <div className="col-md-10 col-9" style={{background:"#FAF9F4"}}>
            <div className="row">
                <div className="col-12 d-flex justify-content-between p-4 portfolio-header">
                    
                <div className="col-6 portfolio-head gold-text">
                    Portfolio
                </div>
                <div className="col-6">
                    <div className="d-flex align-items-center justify-content-end">
                       
                        <div className="place dropdown active-account">
                              <button className="btn dropdown-toggle d-flex align-items-center pe-4 grey-text rounded-pill mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 <img src="https://webcreaters.com/dev/chromescan/new/images/flag.jpg" alt="country-flag" width="25px" className="mx-2" style={{borderRadius:"50%"}} />
                                 <div>
                                     
                                 USD
                                 </div>
                              </button>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                  </ul>
                        </div>
                        <div className="gas dropdown active-account">
                              <button className="btn dropdown-toggle d-flex align-items-center grey-text rounded-pill pe-4 mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 <i className="fa-solid fa-gas-pump mx-2"></i>
                                 25
                              </button>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                  </ul>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-10 col-11 mx-auto rounded mb-5 py-5" style={{background:"#FFFFFF"}}>
                    <div className=" col-12 d-flex align-items-start">
                          <div className="nav col-3 flex-column nav-pills me-3 py-4 " id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{borderRight: "1px solid #CBC8C8"}}>
                            <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>
                            <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Security & Privacy</button>
                            <button className="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false" >About & Support</button>
                            <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Hidden tokens</button>
                            
                          </div>
                          <div className="tab-content col-9" id="v-pills-tabContent">
                            <div className="tab-pane fade show active px-5 py-2" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <div className="tab-head size-18 fw-bold my-2">
                                    Currency Conversion
                                </div>
                                <p className="grey-text my-2">
                                    Base Currency for market value
                                </p>
                                  <div className="place dropdown active-account my-3" style={{width:"fit-content"}}>
                                      <button className="btn dropdown-toggle d-flex align-items-center pe-4 grey-text rounded-pill mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        
                                         <div>
                                             
                                         USD-us Dollar
                                         </div>
                                      </button>
                                          <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                          </ul>
                                  </div>

                                  <div className="theme-toggle-btn my-5">
                                    <div className="size-18 fw-bold mb-2">
                                        Theme
                                    </div>
                                    <input type="checkbox" />
                                      
                                  </div>
                                  <div className="col-md-6 mb-5 pb-3">
                                              <div className="tab-head size-18 fw-bold my-2">
                                            Currency Conversion
                                        </div>
                                        <p className="grey-text my-2">
                                            Base Currency for market value
                                        </p>
                                        <div className="curruncy-input">
                                            <input type="text" className="form-control rounded-pill mt-4 py-2" id="exampleInput" placeholder="" aria-describedby="emailHelp" />
                                        </div>
                                  </div>

                                </div>


                            <div className="tab-pane fade px-5 py-2" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <div className="col-12">
                                    
                                <div className="tab-head size-18 fw-bold my-2">
                                        Participate in ChromeScan
                                    </div>
                                    <p className="grey-text my-2">
                                        Participate in Chromescan to help us make Chromescan better 
                                    </p>
                                        <div className="theme-toggle-btn my-2">
                                        
                                        <input type="checkbox" />
                                          
                                      </div>
                                
                                  <div className="tab-head size-18 fw-bold my-2">
                                        Participate in Error Tracing
                                    </div>
                                    <p className="grey-text my-2">
                                        Participate in Error Tracing to help us make Chromescan better by seeing bugs on your application
                                    </p>
                                        <div className="theme-toggle-btn my-2">
                                        
                                        <input type="checkbox" />
                                          
                                      </div>
                                </div>
                            </div>

                            


                            <div className="tab-pane fade px-5 py-2" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab">
                                <div className="col-12">
                                    
                                <div className="tab-head size-18 fw-bold my-2">
                                        Portfolio dApp
                                    </div>
                                    <p className="grey-text">
                                        2.10.3
                                    </p>
                                    <p className="grey-text my-3">
                                        The Portfolio dApp is your portal to web3, allowing you to connect your multiple wallets and see your entire portfolio. We’re excited for you to try it out!
                                    </p>

                                    <ul className="my-4 p-0" style={{listStyleType:"none"}}>
                                        <li className="my-3 gold-text">
                                            <a href="" className="">Privacy Policy</a>
                                        </li>
                                        <li className="my-3 gold-text">
                                            <a href="">Support Center</a>
                                        </li>
                                        <li className="my-3 gold-text">
                                            <a href="">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            <div className="tab-pane fade px-5 py-2" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <div className="col-12">
                                    
                                <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Token</th>
                                          <th scope="col">Price</th>
                                          <th scope="col">Balance</th>
                                          
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          
                                        </tr>
                                        <tr>
                                        
                                        </tr>
                                        <tr>
                                          
                                        </tr>
                                      </tbody>
                                </table>
                                    <div>
                                        
                                        <div className="size-18 fw-bold my-2 text-center">
                                            No Hidden Tokens
                                        </div>
                                        <p className="my-2 text-center">
                                            You have not hidden any tokens yet.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            
                          </div>
                    </div>

                </div>
                
            </div>
        </div>
        
    </div>
       
   </div>
    );
  }

}


export default Options;
