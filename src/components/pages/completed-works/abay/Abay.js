import React from 'react';
import AbaySliderCarousel from './AbaySliderCarousel';
import { imagesAbay } from './imagesAbay';

const Abay = () => {
    return (
        <div className='mb-4'>
            <h4 className='text-center my-5'>Демонтаж многоквартирных домов в городе Абай</h4>
            <p className='text-center my-5'>За период 2013 - 2016 годов в городе Абай 
            Карагандинской области нашей компанией был произведен демонтаж 
            37 панельных пятиэтажных домов давно отработавших свой срок. 
            На месте четырех заброшенных микрорайонов теперь вырастут новые комфортабельные дома. 
            За время производства демонтажных работ нашей компанией было переработано, 
            раздроблено и вывезено около 700 тыс. тонн железобетона. 
            Скорость работ (демонтаж и полная рекультивация) составила 12 домов за сезон (3 месяца).
            </p>
            <AbaySliderCarousel images={imagesAbay} />
        </div>
    );
};

export default Abay;