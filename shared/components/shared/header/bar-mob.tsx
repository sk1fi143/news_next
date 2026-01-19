"use client";

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Regions } from "@/shared/models/regions";
import { usePathname, useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  logo: string | StaticImport;
  url: string;
}

export const BarMod = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const selectedRegion = Regions.find((r) => r.url === firstSegment) ?? null;
  
  const handleSelect = (region: IRegion) => {
    // Всегда переходим на главную страницу выбранного региона
    router.push(`/${region.url}`);
  };

  return (
    <div className="topBar-mob">
      {Regions.map((region, idx) => (
        <div onClick={() => handleSelect(region)} className={`topBar-mob__item-mob ${region.url === selectedRegion?.url ? 'topBar-mob__item-mob-active' : ''}`} key={idx}>
          <span className="topBar-mob__item-text-mob">{region.name}</span>
        </div>
      ))}
    </div>
  );
};
