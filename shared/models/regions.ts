import IRT from '@icons/tat.svg';
import IRC from '@icons/chuv.svg';
import IRME from '@icons/mari-el.svg';
import INO from '@icons/nizh.svg';
import IKR from '@icons/kirov.svg';

export const Regions = [
    {
        name: 'Все регионы',
        url: '',
    },
    {
        name: 'Республика Марий Эл',
        url: 'mari_el',
        logo: IRME,
    },
    {
        name: 'Республика Татарстан',
        url: 'tatarstan',
        logo: IRT,
    },
    {
        name: 'Республика Чувашия',
        url: 'chuvash',
        logo: IRC,
    },
    {
        name: 'Нижегородская область',
        url: 'nizhny_novgorod',
        logo: INO,
    },
    {
        name: 'Кировская область',
        url: 'kirov',
        logo: IKR,
    }
]

export type Region = typeof Regions[number];
export type RegionCode = Region['url'];