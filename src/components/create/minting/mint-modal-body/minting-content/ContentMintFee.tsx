import React from 'react';
import Image from 'next/image';
import * as DutchC from './styles';
import * as Icons from '@/common';
import { Button, OutlineButton } from '@/common';
import { useTheme } from 'next-themes';
import CheckIcon from '@/assets/check.png';
import ExclamationIcon from '@/assets/exclamation.png';

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
  const { theme } = useTheme();
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
          <Icons.IWallet
            size="large"
            color={theme === 'dark' ? 'white-gray' : 'black'}
          />
        </DutchC.DepositWalletIcon>
        <DutchC.DepositCheckIcon>
          {balance ? (
            <Image src={CheckIcon} alt="check" />
          ) : (
            <Image src={ExclamationIcon} alt="exclamation" />
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
