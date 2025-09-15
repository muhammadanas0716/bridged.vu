"use client";

import dynamic from "next/dynamic";

// Client-only wrapper to avoid SSR issues for HomeHero
const HomeHeroClient = dynamic(() => import("./HomeHero"), { ssr: false });

export default HomeHeroClient;
