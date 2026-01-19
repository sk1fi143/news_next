"use client";

import { Regions } from "@/shared/models/regions";
import { usePathname, useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  url: string;
}

export const Bar = () => {
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
    <div className="topBar">
      {Regions.map((region, idx) => (
        <div onClick={() => handleSelect(region)} className={`topBar__item ${region.url === selectedRegion?.url ? 'active' : ''}`} key={idx}>
          <span className="topBar__item-text">{region.name}</span>
        </div>
      ))}
    </div>
  );
};
