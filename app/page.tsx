export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bridged.vu — Public Feed",
  description: "Latest updates from founders building in public on Bridged.vu.",
  alternates: { canonical: "/" },
};

import Feed from "./ui/Feed";

export default function HomePage() {
  return <Feed />;
}
