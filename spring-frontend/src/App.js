import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/journal/bootstrap.min.css";
import './App.css';
import Routers from './Routers'

class App extends React.Componnet() {
  constructor(){
    super(props)
    this.state = {
      serverResponse = ''
    }
    this.changeServerResponse = this.changeServerResponse.bind(this)
  }
  changeServerResponse(response){
    this.setState({serverResponse: response})
  }

  render(){
    return(
      <Router>
        <Route exact={true} path = "/" component = {()=> <Routers state = {this.state} method = {this.changeServerResponse}/>}/>
      </Router>
    )
  }
}

export default App;
