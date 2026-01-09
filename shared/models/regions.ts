import RME from '@icons/mari-el.svg';
import RT from '@icons/tat.svg';
import RC from '@icons/chuv.svg';
import NO from '@icons/nizh.svg';

export const Regions = [
    {
        name: 'Республика Марий Эл',
        url: 'RME',
        logo: RME,
    },
    {
        name: 'Республика Татарстан',
        url: 'RT',
        logo: RT,
    },
    {
        name: 'Республика Чувашия',
        url: 'RC',
        logo: RC,
    },
    {
        name: 'Нижегородская область',
        url: 'NO',
        logo: NO,
    }
]

export type Region = typeof Regions[number];
export type RegionCode = Region['url'];
export const REGIONS_CODES = Regions.map((r) => r.url);