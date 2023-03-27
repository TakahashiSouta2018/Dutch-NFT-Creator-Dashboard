import React, { useEffect, useState } from 'react';
import { Stepper } from '@/common';
import ContentMintFee from './ContentMintFee';
import ContentMinting from './ContentMinting';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { AttributeI, MintingNftsI, MintStatusEnum, NftDataI } from '@/types';
import { LoopringService } from '@/lib/LoopringService';
import {
  setDraftNFTs,
  setMintingNfts,
  setMintModalActiveStep,
  updateMintNftStatus,
} from '@/components/create/ducks';
import useNFTHook from '@/hooks/useNFTHook';
import { sleep } from '@loopring-web/loopring-sdk';

interface MintModalPropsI {
  isDepositFund: boolean;
  setDepositFund: () => void;
}

const Minting: React.FC<MintModalPropsI> = ({
  isDepositFund,
  setDepositFund,
}) => {
  const [isFinishedMinting, setIsFinishedMinting] = useState<boolean>(false);

  const { activeStep, draftNFTs, isMintModalIsOpen, mintingNfts } =
    useAppSelector((state) => {
      const { mintModal, draftNFTs } = state.createPageReducer;
      return {
        activeStep: mintModal.activeStep,
        draftNFTs,
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

  const selectedDraftNfts = draftNFTs.filter((draftNFT) => draftNFT.selected);

  useEffect(() => {
    const nfts: MintingNftsI[] = selectedDraftNfts.map((draftNFT, index) => ({
      id: index,
      media: draftNFT.media,
      name: draftNFT.name,
      status: MintStatusEnum.QUEUED,
    }));
    dispatch(setMintingNfts(nfts));
  }, [selectedDraftNfts.length, isMintModalIsOpen]);

  useEffect(() => {}, [mintingNfts]);

  const handleStartMint = async () => {
    if (!accountInfo) return;

    dispatch(setMintModalActiveStep(1));
    for (let i = 0; i < selectedDraftNfts.length; i++) {
      const selectedDraftNft = selectedDraftNfts[i];
      try {
        const attributes: AttributeI[] = [];

        const decodedProperties = JSON.parse(selectedDraftNft.properties);

        const properties: Record<string, string> = {};

        decodedProperties.forEach((property: any) => {
          properties[property.type] = property.value;
          attributes.push({ trait_type: property.type, value: property.value });
        });

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

        let status = MintStatusEnum.FAILED;

        if (res) {
          await deleteDraftNFT(selectedDraftNft.id);
          status = MintStatusEnum.SUCCESS;
        }
        dispatch(updateMintNftStatus({ status, id: i }));

        await sleep(1000);
      } catch (error: any) {
        dispatch(updateMintNftStatus({ status: MintStatusEnum.FAILED, id: i }));
        console.log(error.response.data.resultInfo);
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
