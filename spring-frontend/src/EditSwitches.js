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

function EditSwitches(){
    const [results, setSwitches] = React.useState([])
    const [info, setInfo] = React.useState({
        name: '',
        macAddress: '',
        ipAddress: "",
        active: '',
        lastActive: "",
        statusColor: ''
    })
    
    async function fetchSwitches(){
        await fetch(`http://localhost:8080/switches/all`)
          .then((response) => response.json())
          .then((json) => setSwitches(json))
    }
    if (results.length === 0) {
        fetchSwitches()
    }

    async function updateInfo(event, id){
        event.preventDefault()
        var data = {}
        for (var key in info){
            if (info[key] !== ''){
                
                if(info[key] === "true"){
                    data[key] = true
                }else if(info[key] === "false"){
                    data[key] = false
                }else{
                    if(key === "router"){
                        var id = info[key]
                        var router = await (await fetch(`http://localhost:8080/routers/${id}`)).json()
                        data[key] = await router
                    }else{
                        data[key] = info[key]
                    }
                }
            }
        }
        if(data.router){
            await fetch(`http://localhost:8080/switches/reassign/${id}`,{
                method: 'PATCH',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data.router),
            })
            delete data.router
        }
        

        await fetch(`http://localhost:8080/switches/patch/${id}`, {
            method: 'PATCH',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
        })
        
        window.location.reload()
        
    }

    var tableBody = results.map((item, index) => {
        return (
            <tr>
                <th>{item.id}</th>
                <th><Form.Control size="sm" type="text" placeholder={item.name} onChange={event => setInfo({...info, name: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.macAddress} onChange={event => setInfo({...info, macAddress: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.ipAddress} onChange={event => setInfo({...info, ipAddress: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.active.toString()} onChange={event => setInfo({...info, active: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.lastActive} onChange = {event => setInfo({...info, lastActive: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.statusColor} onChange = {event => setInfo({...info, statusColor: event.target.value})}/></th>
                <th><Form.Control size="sm" type="text" placeholder={item.router.id} onChange = {event => setInfo({...info, router: event.target.value})}/></th>
                <Button variant = "success" onClick = {e=>updateInfo(e, item.id)}>save</Button>
            </tr>
        )
        
    })

    return(
        <Container>
        <Row>
            <Col>
            <h3>Switches</h3>
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
                        <th>Router</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
                <Link to="/"><Button variant = "info">Back</Button></Link>
            </Table>
            </Col>
        </Row>
    </Container>
    )


}
export default EditSwitches