import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';
import HomePage from './HomePage'
import EditRouters from './EditRouters'
import EditSwitches from './EditSwitches'
import AddRouter from './AddRouter'
import AddSwitch from './AddSwitch'

function App(){
  return(
    <React.Fragment>
      <Router>
        <Switch>           
            <Route exact={true} path="/" render={() => <HomePage/>}/>
            <Route exact={true} path="/editrouters" render = {() => <EditRouters/>}/>
            <Route exact={true} path="/editswitches" render = {() => <EditSwitches/>}/>
            <Route exact={true} path="/addrouter" render = {()=><AddRouter/>}/>
            <Route exact={true} path="/addswitch" render = {()=><AddSwitch/>}/>
        </Switch>
      </Router>
    </React.Fragment>

  )
  
}

export default App;
