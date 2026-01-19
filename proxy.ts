import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REGIONS_CODES, RegionCode } from "./shared/models/regionCodes";

function isRegionCode(code: string): code is RegionCode {
  return REGIONS_CODES.includes(code as RegionCode);
}

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isRegionCode(segments[0])) {
    const region = segments[0];

    const rest = segments.slice(1);
    url.pathname = "/" + rest.join("/");

    url.searchParams.set("region", region);

    if (url.pathname === "") {
      url.pathname = "/";
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};