export const Regions = [
    {
        name: 'Все регионы',
        url: '',
    },
    {
        name: 'Республика Марий Эл',
        url: 'mari_el',
    },
    {
        name: 'Республика Татарстан',
        url: 'tatarstan',
    },
    {
        name: 'Республика Чувашия',
        url: 'chuvash',
    },
    {
        name: 'Нижегородская область',
        url: 'nizhny_novgorod',
    },
    {
        name: 'Кировская область',
        url: 'kirov',
    }
]

export type Region = typeof Regions[number];
export type RegionCode = Region['url'];