import React, { useEffect, useState } from 'react';
import { Stepper } from '@/common';
import ContentMintFee from './ContentMintFee';
import ContentMinting from './ContentMinting';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { MintingNftsI, MintStatusEnum, NftDataI } from '@/types';
import { LoopringService } from '@/lib/LoopringService';
import {
  setMintingNfts,
  setMintModalActiveStep,
  updateMintNftStatus,
} from '@/components/create/ducks';
import useNFTHook from '@/hooks/useNFTHook';
import { sleep } from '@loopring-web/loopring-sdk';
import { handleNFTPropertiesAttributes } from '@/lib/metadata';

interface MintModalPropsI {
  isDepositFund: boolean;
  setDepositFund: () => void;
}

const Minting: React.FC<MintModalPropsI> = ({
  isDepositFund,
  setDepositFund,
}) => {
  const [isFinishedMinting, setIsFinishedMinting] = useState<boolean>(false);

  const { activeStep, selectedDraftNFTs, isMintModalIsOpen, mintingNfts } =
    useAppSelector((state) => {
      const { mintModal, selectedDraftNFTs } = state.createPageReducer;
      return {
        activeStep: mintModal.activeStep,
        selectedDraftNFTs,
        isMintModalIsOpen: mintModal.isOpen,
        mintingNfts: mintModal.mintingNfts,
      };
    }, shallowEqual);

  const { walletType, accountInfo } = useAppSelector((state) => {
    const { walletType, accountInfo } = state.webAppReducer;
    return { walletType, accountInfo };
  }, shallowEqual);

  const { deleteDraftNFT } = useNFTHook();

  const loopringService = new LoopringService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const nfts: MintingNftsI[] = selectedDraftNFTs.map((draftNFT, index) => ({
      id: index,
      media: draftNFT.media,
      name: draftNFT.name,
      status: MintStatusEnum.QUEUED,
    }));
    dispatch(setMintingNfts(nfts));
  }, [selectedDraftNFTs.length, isMintModalIsOpen]);

  useEffect(() => {}, [mintingNfts]);

  const handleStartMint = async () => {
    if (!accountInfo) return;

    dispatch(setMintModalActiveStep(1));
    for (let i = 0; i < selectedDraftNFTs.length; i++) {
      const selectedDraftNft = selectedDraftNFTs[i];
      try {
        const properties = JSON.parse(selectedDraftNft.properties);

        const attributes = handleNFTPropertiesAttributes(properties);

        const nftData: NftDataI = {
          image: `ipfs://${selectedDraftNft.media}`,
          animation_url: `ipfs://${selectedDraftNft.media}`,
          name: selectedDraftNft.name,
          royalty_percentage: Number(selectedDraftNft.royalty),
          description: selectedDraftNft.description,
          collection_metadata: selectedDraftNft.collection,
          mint_channel: 'Loopring',
          properties,
          attributes: attributes,
        };

        const res = await loopringService.mintNFT({
          accountInfo,
          walletType,
          metadata: nftData,
          amount: selectedDraftNft.amount,
          royaltyPercentage: nftData.royalty_percentage,
          nftTokenAddress: selectedDraftNft.collection,
        });
        console.log(res);
        let status = MintStatusEnum.FAILED;

        if (res) {
          await deleteDraftNFT(selectedDraftNft.id);
          status = MintStatusEnum.SUCCESS;
        }
        dispatch(updateMintNftStatus({ status, id: i }));

        await sleep(1000);
      } catch (error: any) {
        dispatch(updateMintNftStatus({ status: MintStatusEnum.FAILED, id: i }));
        console.log(error);
      }
    }

    setIsFinishedMinting(true);

    dispatch(setMintModalActiveStep(2));
  };

  let renderContent = (
    <ContentMintFee
      isDepositFund={isDepositFund}
      setDepositFund={setDepositFund}
      handleStartMint={handleStartMint}
    />
  );

  if (activeStep !== 0) {
    renderContent = <ContentMinting isFinishedMinting={isFinishedMinting} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Stepper activeStep={activeStep} />
      <div>{renderContent}</div>
    </div>
  );
};
export default Minting;
