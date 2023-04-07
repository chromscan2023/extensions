import {browser, Tabs} from 'webextension-polyfill-ts';
import axios from 'axios';
const API_URL="https://dashboard.cccmining.org/api/tenant/b164ff9b-47d2-4b22-b3ec-3d0c69973188/exchange-rate?orderBy=&limit=2&offset=0&api_key=79c9feda-7d18-47ee-bd82-c6e6f2221558-3cfe0363-352e-4e54-b1a9-5e9db7b0c89f";

function getCCCPricing(){
   

    return axios.get(API_URL).then(response=>{
        return response.data
    });
}


function openWebPage(url: string): Promise<Tabs.Tab> {
    return browser.tabs.create({url});
  }


  export {
    openWebPage,
    getCCCPricing
  }