"use client";

import { Regions } from "@/shared/models/regions";
import { usePathname, useRouter } from 'next/navigation';

interface IRegion {
  name: string;
  url: string;
}

interface Props {
  onItemClick?: () => void;
}

export const BarMod: React.FC<Props> = ({ onItemClick }) => {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const selectedRegion = Regions.find((r) => r.url === firstSegment) ?? null;

  // Если регион не найден (pathname === "/" или первый сегмент не соответствует региону), 
  // то активным должен быть "Все регионы" (url === '')
  const activeRegion = selectedRegion ?? Regions.find((r) => r.url === '') ?? null;

  const handleSelect = (region: IRegion) => {
    onItemClick?.();
    const segments = pathname.split('/').filter(Boolean);

    // убираем старый регион (первый сегмент)
    const restPath = segments.slice(1).join('/');

    const newPath = region.url
      ? `/${region.url}/${restPath}`
      : `/${restPath}`;

    router.push(newPath || '/');
  };

  return (
    <div className="topBar-mob">
      {Regions.map((region, idx) => (
        <div onClick={() => handleSelect(region)} className={`topBar-mob__item-mob ${region.url === activeRegion?.url ? 'topBar-mob__item-mob-active' : ''}`} key={idx}>
          <span className="topBar-mob__item-text-mob">{region.name}</span>
        </div>
      ))}
    </div>
  );
};
