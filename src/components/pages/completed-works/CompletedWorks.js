import React from 'react';
import Abay from './abay/Abay';
import Arista from './arista/Arista';
import Ekibastyz from './ekibastyz/Ekibastyz';

const CompletedWorks = () => {
    return (
        <div className='main-div-content'>
            <Arista />
            <hr />
            <Ekibastyz />
            <hr />
            <Abay />
            <hr />
        </div>
    );
};

export default CompletedWorks;