import React from 'react';

import Link from 'next/link';

// components
import { Button } from '@/common';
import { Breadcrumb } from '@/components/shared';


const Header: React.FC = () => {

  return (
    <>
      <Breadcrumb />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-2xl whitespace-nowrap font-bold'>
            Drafted NFTs
          </div>
          <div className='text-sm whitespace-nowrap text-black/70 dark:text-white/70'>
            NFTs that you have uploaded in DUTCH0x but not minted yet will
            show here.
          </div>
        </div>

        <div className='flex space-x-3'>
          <Button>
            <Link href="/dummyCreate/create-collection">Create Collection</Link>
          </Button>
          <Button>
            <Link href="/dummyCreate/draft-nft">Draft NFT</Link>
          </Button>
          <Button>
            <Link href="/dummyCreate/bulk-mint">Bulk NFT</Link>
          </Button>
        </div>
      </div>  
    </> 
  );
};


export default Header;
