import IRT from '@icons/tat.svg';
import IRC from '@icons/chuv.svg';
import IRME from '@icons/mari-el.svg';
import INO from '@icons/nizh.svg';
import IKR from '@icons/kirov.svg';

export const MapRegions = [
    {
        id: 'nijni',
        location: 'Нижний Новгород',
        name: 'Нижегородская Область',
        icon: INO,
        containerClass: 'map__nijni',
        lineClass: 'map__nijnii-line'
    },
    {
        id: 'mari',
        location: 'Марий Эл',
        name: 'Республика Марий Эл',
        icon: IRME,
        containerClass: 'map__mari',
        lineClass: 'map__mari-line'
    },
    {
        id: 'tat',
        location: 'Татарстан',
        name: 'Республика Татарстан',
        icon: IRT,
        containerClass: 'map__tat',
        lineClass: 'map__tat-line'
    }
    ,
    {
        id: 'chuvash',
        location: 'Чувашия',
        name: 'Республика Чувашия',
        icon: IRC   ,
        containerClass: 'map__chuvash',
        lineClass: 'map__chuvash-line'
    }
    ,
    {
        id: 'kirov',
        location: 'Киров',
        name: 'Кировская область',
        icon: IKR   ,
        containerClass: 'map__kirov',
        lineClass: 'map__kirov-line'
    }
];