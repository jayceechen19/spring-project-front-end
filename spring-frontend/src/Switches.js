import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";


function Switches(){

    const [switches, setSwitches] = React.useState([])
    const [deleteBool, setDelete] = React.useState(false)

    async function fetchSwitches(){
        await fetch(`http://localhost:8080/switches/all`)
          .then((response) => response.json())
          .then((json) => setSwitches(json))
    }

    if (switches.length === 0) {
        fetchSwitches()
    }

    async function deleteSwitch(event, id){
        // event.preventDefault()
        console.log("Deleting")

        await fetch(`http://localhost:8080/switches/delete/${id}`, {
            method: 'DELETE',
        })
        window.location.reload()

    }
   var tableBody = switches.map((item, index) => {
    var variant;
    if(item.statusColor == "red"){
        variant = "text-danger"
    }else if(item.statusColor == "yellow"){
        variant = "text-warning"
    }else{
        variant = "text-success"
    }
    var router;
    if(item.router == null){
        router = "null"
    }else{
        router = item.router.id
    }
    var active;
    if(item.active == null){
        active = ""
    }else{
        active = item.active.toString()
    }
    return(
        <tr>
            <th>{item.id}</th>
            <th>{item.name}</th>
            <th>{item.macAddress}</th>
            <th>{item.ipAddress}</th>
            <th>{active}</th>
            <th>{item.lastActive}</th>
            <th class = {variant}>{item.statusColor}</th>
            <th>{router}</th>
            <Link to="/editswitches">
                <Button variant = "success">Edit</Button>
            </Link>
            <Button variant = "danger" onClick = {e=>deleteSwitch(e, item.id)}>Delete</Button>
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
                </Table>
                </Col>

            </Row>
            <Link to="/addswitch">
                    <Button variant = "primary">Add Switch</Button>
            </Link>
        </Container>
    )

}

export default Switches