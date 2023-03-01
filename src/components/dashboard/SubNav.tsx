import React from "react";
import { useRouter } from "next/router";

// components
import { Link } from "@/common";
import * as DutchC from "./styles";

const subnavs = [
  {
    name: "NFT Management",
    path: "/dashboard/nft-management",
    slug: "nft-management",
  },
  {
    name: "Find Holders",
    path: "/dashboard/holders",
    slug: "holders",
  },
  {
    name: "Airdrop",
    path: "/dashboard/airdrop",
    slug: "airdrop",
  },
  {
    name: "Trade-in",
    path: "/dashboard/trade-in",
    slug: "trade-in",
  },
  {
    name: "Sales",
    path: "/dashboard/sales",
    slug: "sales",
  },
];

const DashboardSubNav: React.FC = () => {
  const router = useRouter();

  const PAGE_PATH = router.asPath.split("/")[2] ?? "";

  return (
    <DutchC.SubNavWrapper>
      {subnavs.map((nav) => (
        <Link
          key={nav.slug}
          href={nav.path}
          active={PAGE_PATH === nav.slug ? 1 : 0}
          size="small"
        >
          {nav.name}
        </Link>
      ))}
    </DutchC.SubNavWrapper>
  );
};

export default DashboardSubNav;
