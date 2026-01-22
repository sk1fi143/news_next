"use client";

import { Regions } from "@/shared/models/regions";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  url: string;
  logo?: string;
}

export const Bar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const selectedRegion = Regions.find((r) => r.url === firstSegment) ?? null;

  // Если регион не найден (pathname === "/" или первый сегмент не соответствует региону), 
  // то активным должен быть "Все регионы" (url === '')
  const activeRegion = selectedRegion ?? Regions.find((r) => r.url === '') ?? null;

  const handleSelect = (region: IRegion) => {
    const segments = pathname.split('/').filter(Boolean);

    // убираем старый регион (первый сегмент)
    const restPath = segments.slice(1).join('/');

    const newPath = region.url
      ? `/${region.url}/${restPath}`
      : `/${restPath}`;

    router.push(newPath || '/');
  };

  return (
    <div className="topBar">
      {Regions.map((region, idx) => (
        <div onClick={() => handleSelect(region)} className={`topBar__item ${region.url === activeRegion?.url ? 'active' : ''}`} key={idx}>
          {region.logo && <Image className="topBar__item-logo" src={region.logo} alt={region.name} />}
          <span className="topBar__item-text">{region.name}</span>
        </div>
      ))}
    </div>
  );
};
