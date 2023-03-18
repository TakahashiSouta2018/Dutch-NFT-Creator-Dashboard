import React from 'react';
import * as DutchC from './style';
import * as Icons from '@/common';
import { Button, OutlineButton } from '@/common';

interface ContentMintFeeProps {
  isDepositFund: boolean;
  setActiveStep: (id: number) => void;
  setDepositFund: () => void;
  onClose: () => void;
  balance: boolean;
}

const nftList = [
  {
    title: 'Mint fee per NFT',
    eth: 0.0003,
    usd: 0.28,
  },
  {
    title: 'Total (Minting 2 NFTs)',
    eth: 0.0006,
    usd: 0.56,
  },
];

const ContentMintFee: React.FC<ContentMintFeeProps> = ({
  isDepositFund,
  setActiveStep,
  setDepositFund,
  onClose,
  balance,
}): JSX.Element => {
  return (
    <DutchC.MintFeeWrapper>
      <DutchC.MintContentWrapper>
        {nftList.map((item, i) => {
          return (
            <DutchC.MintRow key={i}>
              <DutchC.TextNormal>{item.title}</DutchC.TextNormal>
              <DutchC.PriceRow>
                <DutchC.TextNormal>{item.eth} ETH</DutchC.TextNormal>
                <DutchC.TextNormal>${item.usd}</DutchC.TextNormal>
              </DutchC.PriceRow>
            </DutchC.MintRow>
          );
        })}
      </DutchC.MintContentWrapper>
      <DutchC.DepositRow>
        <DutchC.DepositWalletIcon>
          <Icons.IWallet size="large" />
        </DutchC.DepositWalletIcon>
        <DutchC.DepositCheckIcon>
          {balance ? (
            <Icons.ICheckCircle color="accent-green" variant="solid" />
          ) : (
            <Icons.IExclamationCircle color="accent-red" />
          )}
        </DutchC.DepositCheckIcon>
        <DutchC.DepositTitleCol>
          <DutchC.TextBold>
            0 ETH{' '}
            <DutchC.TextUnderlined
              onClick={() => {
                setDepositFund();
              }}
            >
              Deposite Funds
            </DutchC.TextUnderlined>
          </DutchC.TextBold>
          <DutchC.TextThin>Wallet Balance</DutchC.TextThin>
        </DutchC.DepositTitleCol>
        <DutchC.ButtonRow>
          <OutlineButton onClick={onClose}>Cancel</OutlineButton>
          <Button
            className="bg-black/30 text-white"
            onClick={() => {
              setActiveStep(1);
            }}
            disabled={balance ? false : true}
          >
            Start Minting
          </Button>
        </DutchC.ButtonRow>
      </DutchC.DepositRow>
    </DutchC.MintFeeWrapper>
  );
};

export default ContentMintFee;
