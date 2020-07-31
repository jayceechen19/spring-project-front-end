import React from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";

function AddRouter(){
    const [info, setInfo] = React.useState({
        name: '',
        macAddress: '',
        ipAddress: "",
        active: '',
        lastActive: "",
        status: ''
    })
    
    async function addRouter(event){
        // event.preventDefault()
        var data = {}
        for (var key in info){
            if (info[key] !== ''){
                if(info[key] === "true"){
                    data[key] = true
                }else if(info[key] === "false"){
                    data[key] = false
                }else{
                    data[key] = info[key]
                }
            }
        }
        console.log(data)
        await fetch(`http://localhost:8080/routers/new`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
        })
        // window.location.reload()


    }

    return(

        <Container>
            <Row>
                <Col>
                <h3>Add router</h3>
                <Table>
                <thead>
                        <tr>
                            <th>Name</th>
                            <th>MAC Address</th>
                            <th>IP Address</th>
                            <th>Active</th>
                            <th>Last Active</th>
                            <th>Status</th>
                        </tr>
                </thead>
                <tbody>
                    <th><Form.Control size="sm" type="text" onChange={event => setInfo({...info, name: event.target.value})}/></th>
                    <th><Form.Control size="sm" type="text" onChange={event => setInfo({...info, macAddress: event.target.value})}/></th>
                    <th><Form.Control size="sm" type="text" onChange={event => setInfo({...info, ipAddress: event.target.value})}/></th>
                    <th><Form.Control size="sm" type="text" onChange={event => setInfo({...info, active: event.target.value})}/></th>
                    <th><Form.Control size="sm" type="text" onChange = {event => setInfo({...info, lastActive: event.target.value})}/></th>
                    <th><Form.Control size="sm" type="text" onChange = {event => setInfo({...info, status: event.target.value})}/></th>
                </tbody>
                </Table>
                <Link to="/">
                    <Button variant = "info" onClick = {event => addRouter(event)}>Add Router</Button>
                </Link>
                </Col>
            </Row>
        </Container>
    )
}
export default AddRouter