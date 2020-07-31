import React from 'react';
import Routers from './Routers'
import Switches from './Switches'
function HomePage(){
    return(
        <React.Fragment>
            <Routers/>
            <Switches/>
        </React.Fragment>
    )
 }
export default HomePage;