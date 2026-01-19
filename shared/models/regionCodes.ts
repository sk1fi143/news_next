// Region codes only - safe for Edge Runtime
export const REGIONS_CODES = ['mari_el', 'tatarstan', 'chuvash', 'nizhny_novgorod', 'kirov'] as const;

export type RegionCode = typeof REGIONS_CODES[number];
