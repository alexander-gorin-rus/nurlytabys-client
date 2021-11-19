import React from 'react';
import { imagesEkibastys } from './imagesEkibastys';
import EkibastysSliderCarousel from './EkibastysSliderCarousel';

const Ekibastyz = () => {
    return (
        <div className='mb-4'>
            <h4 className='text-center my-5'>Строительство АЗС в городе Экибастуз</h4>
            <p className='pb-5'>В 2015 году нашей компанией было построено несколько 
            АЗС в городе Экибастуз Павлодарской области и на трассе Карагада - Павлодар. 
            Также была построена нефтебаза для приемки, хранения и налива нефтепродуктов на 2000 тонн.
            </p> 
            <EkibastysSliderCarousel images={imagesEkibastys} />
        </div>
    );
};

export default Ekibastyz;