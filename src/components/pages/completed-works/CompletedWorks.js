import React from 'react';
import Abay from './abay/Abay';
import Arista from './arista/Arista';
import Ekibastyz from './ekibastyz/Ekibastyz';
import Optima from './optima/Optima';

const CompletedWorks = () => {
    return (
        <div className='main-div-content'>
            <Arista />
            <hr />
            <Ekibastyz />
            <hr />
            <Abay />
            <hr />
            <Optima />
            <br />
        </div>
    );
};

export default CompletedWorks;