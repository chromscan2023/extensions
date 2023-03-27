import {browser, Tabs} from 'webextension-polyfill-ts';


function openWebPage(url: string): Promise<Tabs.Tab> {
    return browser.tabs.create({url});
  }


  export {
    openWebPage
  }