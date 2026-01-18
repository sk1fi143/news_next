"use client";

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Regions } from "@/shared/models/regions";
import { usePathname, useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  logo: string | StaticImport;
  url: string;
}

export const Bar = () => {
  const pathname = usePathname();
    const router = useRouter();
  
  const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const selectedRegion = Regions.find((r) => r.url === firstSegment) ?? null;
  
    const getPathWithoutRegion = () => {
      const currentSegments = [...segments];
      if (currentSegments.length && Regions.some((r) => r.url === currentSegments[0])) {
        currentSegments.shift();
      }
      return "/" + currentSegments.join("/");
    };
  
    const handleSelect = (region: IRegion | null) => {
      const basePath = getPathWithoutRegion();
  
      // Формируем новый путь
      const newPath = region 
        ? `/${region.url}${basePath === "/" ? "" : basePath}`
        : (basePath === "/" ? "/" : basePath);
  
      router.push(newPath);
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