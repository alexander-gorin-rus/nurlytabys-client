import React from 'react';
import { aristaImages } from './imagesArista';
import AristaSliderCarousel from './AristaSliderCarousel';

const Arista = () => {
    return (
        <div className='mb-4'>
            <AristaSliderCarousel images={aristaImages} />
            <h4 className='text-center my-5'>Ресторан "Ариста"</h4>
            <p className='pb-5'>В 2015 году нашей компанией в городе Караганда был построен и введен в эксплуатацию ресторанный комплекс "Ариста". 
                Данный комплекс является яркой звездой в богатой истории нашей компании. Комплекс "Ариста" отличается огромными залами, 
                богато отделанными в английском, французском и восточном стилях. В ресторане "Ариста" сочетаются монументальность 
                состоящая из мельчайших деталей и современная техническая оснащенность. В данном комплексе смонтирована крайне сложная 
                полностью автономная система вентиляции. Системы отопления и кондиционирования также автоматизированы. Во всем комплексе 
                нет ни одной простой детали: каждая деталь требовала особого подхода, и наша компания справилась с этой непростой задачей.
                Теперь ресторан "Ариста" горит яркой звездой в ночном небе нашего города и является самым известным и популярным рестораном 
                в городе Караганда.
                </p>
        </div>
    );
};

export default Arista;