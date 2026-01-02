"use client";

import dynamic from "next/dynamic";

// 动态导入PlanetCursor避免SSR问题
const PlanetCursor = dynamic(
  () => import("@/components/cosmic/PlanetCursor"),
  { ssr: false }
);

export default function ClientProviders() {
  return (
    <>
      <PlanetCursor />
    </>
  );
}
