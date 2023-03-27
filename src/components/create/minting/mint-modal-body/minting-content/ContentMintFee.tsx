import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import * as DutchC from './styles';
import * as Icons from '@/common';
import { Button, OutlineButton } from '@/common';
import { useTheme } from 'next-themes';
import CheckIcon from '@/assets/check.png';
import ExclamationIcon from '@/assets/exclamation.png';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { LoopringService } from '@/lib/LoopringService';
import {
  setMintModalActiveStep,
  setMintModalIsOpen,
} from '@/components/create/ducks';

interface ContentMintFeePropsI {
  isDepositFund: boolean;
  setDepositFund: () => void;
  handleStartMint: () => void;
}

interface BalanceI {
  totalBalance: string;
  isDisabled: boolean;
}

interface NftFeeListI {
  name: string;
  feeInEth: number;
  feeInUSDT: number;
}

const ContentMintFee: React.FC<ContentMintFeePropsI> = ({
  isDepositFund,
  setDepositFund,
  handleStartMint,
}): JSX.Element => {
  const { theme } = useTheme();
  const [nftListFee, setNftListFee] = useState<NftFeeListI[]>([]);
  const [balanceCheck, setBalanceCheck] = useState<BalanceI>({
    totalBalance: '0',
    isDisabled: true,
  });
  const loopringService = new LoopringService();
  const dispatch = useAppDispatch();

  const { walletType, accountInfo } = useAppSelector((state) => {
    const { walletType, accountInfo } = state.webAppReducer;
    return { walletType, accountInfo };
  }, shallowEqual);

  const { draftNFTs } = useAppSelector((state) => {
    const { draftNFTs } = state.createPageReducer;
    return { draftNFTs };
  }, shallowEqual);

  const selectedDraftNfts = draftNFTs.filter((draftNFT) => draftNFT.selected);

  useEffect(() => {
    (async () => {
      if (!accountInfo) return alert('wallet not connect');
      const feeList = await Promise.all(
        selectedDraftNfts.map(async (nft) => {
          const collectionMeta = await loopringService.getCollectionMeta(
            accountInfo,
            nft.collection
          );
          if (!collectionMeta) return null;

          const fee = await loopringService.getNFTOffchainFeeAmt(
            accountInfo,
            collectionMeta
          );

          const feeInEth = ethers.utils.formatUnits(fee.fees['ETH'].fee, 18);
          const feeInUSDT = ethers.utils.formatUnits(fee.fees['USDT'].fee, 6);

          return { name: nft.name, feeInEth, feeInUSDT };
        })
      );
      const filteredFeeList = feeList.filter((item) => item !== null);

      // @ts-ignore
      setNftListFee(filteredFeeList);

      const totalFee = filteredFeeList.reduce((accumulator, object) => {
        return accumulator + Number(object?.feeInEth);
      }, 0);

      const userBalance = await loopringService.getLayer2Balance(accountInfo);
      const userEthBalance = ethers.utils.formatUnits(userBalance[0].total, 18);

      setBalanceCheck({
        totalBalance: userEthBalance,
        isDisabled: totalFee > Number(userEthBalance),
      });
    })();
  }, [accountInfo, selectedDraftNfts.length]);

  const onClose = () => {
    dispatch(setMintModalActiveStep(0));
    dispatch(setMintModalIsOpen(false));
  };

  return (
    <DutchC.MintFeeWrapper>
      <DutchC.MintContentWrapper>
        {nftListFee.map((item, i) => {
          return (
            <DutchC.MintRow key={i}>
              <DutchC.TextNormal>{item.name}</DutchC.TextNormal>
              <DutchC.PriceRow>
                <DutchC.TextNormal>{item.feeInEth} ETH</DutchC.TextNormal>
                <DutchC.TextNormal>${item.feeInUSDT}</DutchC.TextNormal>
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
          {!balanceCheck.isDisabled ? (
            <Image src={CheckIcon} alt="check" />
          ) : (
            <Image src={ExclamationIcon} alt="exclamation" />
          )}
        </DutchC.DepositCheckIcon>
        <DutchC.DepositTitleCol>
          <DutchC.TextBold>
            {balanceCheck.totalBalance} ETH{' '}
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
          <Button onClick={handleStartMint} disabled={balanceCheck.isDisabled}>
            Start Minting
          </Button>
        </DutchC.ButtonRow>
      </DutchC.DepositRow>
    </DutchC.MintFeeWrapper>
  );
};

export default ContentMintFee;
