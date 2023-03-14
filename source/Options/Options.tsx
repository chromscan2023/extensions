import React from 'react';

import './styles.scss';


class Options extends React.Component{

  constructor(props:any){
    super(props);
  }


  render(){
    return (
      <div className="wrapper">
        <div className="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        ChromeCoin Wallet
                    </a>
                </li>
                <li>
                    <a href="/#dashboard">Portfolio</a>
                </li>
                <li>
                    <a href="#">Watchlist</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
                
            </ul>
        </div>
       {/** Page Content */}
        <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Simple Sidebar</h1>
                        <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                        <a href="#menu-toggle" className="btn btn-default" id="menu-toggle">Toggle Menu</a>
                    </div>
                </div>
            </div>
        </div>
        {/** /#page-content-wrapper */}

    </div>
    
    );
  }

}


export default Options;
