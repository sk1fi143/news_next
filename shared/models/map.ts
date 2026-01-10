import IRT from '@icons/tat.svg';
import IRC from '@icons/chuv.svg';
import IRME from '@icons/mari-el.svg';
import INO from '@icons/nizh.svg';

export const MapRegions = [
    {
        id: 'nijni',
        name: 'Нижегородская Область',
        icon: INO,
        containerClass: 'map__nijni',
        lineClass: 'map__nijnii-line'
    },
    {
        id: 'mari',
        name: 'Республика Марий Эл',
        icon: IRME,
        containerClass: 'map__mari',
        lineClass: 'map__mari-line'
    },
    {
        id: 'tat',
        name: 'Республика Татарстан',
        icon: IRT,
        containerClass: 'map__tat',
        lineClass: 'map__tat-line'
    }
    ,
    {
        id: 'chuvash',
        name: 'Республика Чувашия',
        icon: IRC   ,
        containerClass: 'map__chuvash',
        lineClass: 'map__chuvash-line'
    }
];