import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";


function Routers(){

    const [results, setRouters] = React.useState([])

    async function fetchRouters(){
        await fetch(`http://localhost:8080/routers/all`)
          .then((response) => response.json())
          .then((json) => setRouters(json))
    }

    if (results.length === 0) {
        fetchRouters()
    }
    async function deleteRouter(event, id){
        // event.preventDefault()
        console.log("Deleting")

        await fetch(`http://localhost:8080/routers/delete/${id}`, {
            method: 'DELETE',
        })
        window.location.reload()

    }

   var tableBody = results.map((router, index) => {
       var variant;
       if(router.status == "red"){
           variant = "text-danger"
       }else if(router.status == "yellow"){
           variant = "text-warning"
       }else{
           variant = "text-success"
       }
        return(
            <tr>
                <th>{router.id}</th>
                <th>{router.name}</th>
                <th>{router.macAddress}</th>
                <th>{router.ipAddress}</th>
                <th>{router.active.toString()}</th>
                <th>{router.lastActive}</th>
                <th class = {variant}>{router.status}</th>
                <Link to="/editrouters">
                    <Button variant = "success">Edit</Button>
                </Link>
                <Button variant = "danger" onClick = {e=>deleteRouter(e, router.id)}>Delete</Button>
            </tr>
        )
    })


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
                        {tableBody}
                    </tbody>
                </Table>
                <Link to="/addrouter">
                    <Button variant = "primary">Add Router</Button>
                </Link>

                </Col>
            </Row>
            <br/>
        </Container>
    )

}

export default Routers