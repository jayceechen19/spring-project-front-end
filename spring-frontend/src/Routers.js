import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/journal/bootstrap.min.css";
import './App.css';
class Routers extends React.Component(){
    constructor(props){
        super(props)
        this.state = props.state
        this.changeState = props.method
    }
    ComponentWillMount(){
        const response = await fetch('http://localhost:8080/routers/all',{
            method: 'GET',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
        })
        let result = await response.json()
        this.changeState(result)
    }
    render(){
        return(
        <Container>
            <Row>
                <Col>
                <h3>Routers</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>MAC Address</th>
                            <th>IP Address</th>
                            <th>Active</th>
                            <th>Last Active</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.serverResponse.map((item,key) => {
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.macAddress}</td>
                                <td>{item.ipAddress}</td>
                                <td>{item.active}</td>
                                <td>{item.lastActive}</td>
                                <td>{item.status}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
        )
        

    }
}
export default Routers