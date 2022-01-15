import {React,Component} from "react";
import {Switch,Route} from 'react-router-dom';

import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import App from "./App"; 


class Routes extends Component{
    render(){
      return(
        <>
          {/* <Route exact path="/" component={App}/> */}
          <Header/>
          <Sidebar/>
          <Switch>
              <Route exact path="/" component={App}/>
          </Switch>
          <Footer/>
        </>
      )
    }
}

export default Routes;