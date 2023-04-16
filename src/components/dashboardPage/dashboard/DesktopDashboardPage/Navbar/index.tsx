import React from 'react';
import { useRouter } from 'next/router';

// components
import { Link } from '@/common';
import LottieAnimationPlayer from './LottieAnimationPlayer';

// Animations Json
import NFT from '@/assets/lottie-animation/NFT.json';
import FindHolders from '@/assets/lottie-animation/Find_Holders.json';
import AirDrop from '@/assets/lottie-animation/Air_Drop.json';
import TradeIn from '@/assets/lottie-animation/Trade_In.json';
import Analytics from '@/assets/lottie-animation/Analytics.json';

const navItems = [
  {
    name: 'NFT Management',
    path: '/dummy/nft-management',
    slug: 'nft-management',
    animationData: NFT,
    bgColor: 'rgba(46, 198, 46, 0.2)',
  },
  {
    name: 'Find Holders',
    path: '/dummy/holders',
    slug: 'holders',
    animationData: FindHolders,
    bgColor: 'rgba(245, 215, 46, 0.2)',
  },
  {
    name: 'Airdrop',
    path: '/dummy/airdrop',
    slug: 'airdrop',
    animationData: AirDrop,
    bgColor: 'rgba(46, 196, 218, 0.2)',
  },
  {
    name: 'Trade-in',
    path: '/dummy/trade-in',
    slug: 'trade-in',
    animationData: TradeIn,
    bgColor: 'rgba(167, 76, 201, 0.2)',
  },
  {
    name: 'Analytics',
    path: '/dummy/analytics',
    slug: 'analytics',
    animationData: Analytics,
    bgColor: 'rgba(255, 79, 182, 0.2)',
  },
];

const Navbar: React.FC = () => {
  const router = useRouter();

  const PAGE_PATH = router.asPath.split('/')[2] ?? '';

  return (
    <div className='mt-16 pb-4 pt-4 flex items-center text-center gap-x-4 px-6 border-b border-dark/10 dark:border-white/10' >
      {navItems.map((nav, index) => (
        <Link
          key={nav.slug}
          href={nav.path}
          active={PAGE_PATH === nav.slug ? true : false}
          size="small"
        >
          <LottieAnimationPlayer
            animationData={nav.animationData}
            bgColor={nav.bgColor}
            name={nav.name}
            index={index}
          />
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
