import * as React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from 'react-router-dom';
//import router from './router';
import App from './App';

ReactDOM.render(<React.StrictMode>
      <HashRouter>
            <App />
      </HashRouter>
    </React.StrictMode>, document.getElementById('popup-root'));
