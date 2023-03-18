import React, { useState } from 'react';
import { Modal, ModalHead, ModalBody, Stepper } from '@/common';
import * as DutchC from './style';
import { Button, OutlineButton } from '@/common';
import DepositFunds from './DepositFunds';
import * as Icons from '@/common/Icons';
import { StepType } from '@/types';

interface MintFeeModalProps {
  eth: number;
  onClose: () => void;
  steps: StepType[];
  onApproveMinting: () => void;
}

const MintFeeModal: React.FC<MintFeeModalProps> = ({ eth, onClose, steps }) => {
  const [showDepositFunds, setShowDepositFunds] = useState(false);
  const [isBalance, setBalance] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((step) => step - 1);
    setShowDepositFunds(false);
  };

  const handleApproveMinting = () => {
    setActiveStep((step) => step + 1);
  };

  return showDepositFunds ? (
    <DepositFunds
      onBack={handleBack}
      onBalance={() => {
        setShowDepositFunds(false);
        setBalance(true);
      }}
    />
  ) : (
    <Modal>
      <ModalHead title="Mint Fee" onClose={onClose} />
      <ModalBody>
        <Stepper steps={steps} activeStep={activeStep} />
        <DutchC.ContentWrapper>
          <DutchC.Content>
            <DutchC.TextNormal>Mint fee per NFT</DutchC.TextNormal>
            <DutchC.ContentPrice>
              <DutchC.TextNormal>0.0003 ETH</DutchC.TextNormal>
              <DutchC.TextNormal>$0.28</DutchC.TextNormal>
            </DutchC.ContentPrice>
          </DutchC.Content>
          <DutchC.Content>
            <DutchC.TextNormal>Total (Minting 2 NFTs)</DutchC.TextNormal>
            <DutchC.ContentPrice>
              <DutchC.TextNormal>0.0006 ETH</DutchC.TextNormal>
              <DutchC.TextNormal>$0.56</DutchC.TextNormal>
            </DutchC.ContentPrice>
          </DutchC.Content>
        </DutchC.ContentWrapper>
        <DutchC.ContentDepositWraper>
          <DutchC.ContentWalletIcon>
            <Icons.IWallet size="large" />
          </DutchC.ContentWalletIcon>
          <DutchC.ContentWalletAbsoluteIcon>
            {isBalance ? (
              <Icons.ICheckCircle color="accent-green" variant="solid" />
            ) : (
              <Icons.IExclamationCircle color="accent-red" />
            )}
          </DutchC.ContentWalletAbsoluteIcon>
          <DutchC.ContentDepositTitleWrapper>
            <DutchC.TextBold>
              {eth} ETH{' '}
              <DutchC.TextContentDepositFund
                onClick={() => {
                  setShowDepositFunds(true);
                }}
              >
                Deposite Funds
              </DutchC.TextContentDepositFund>{' '}
            </DutchC.TextBold>
            <DutchC.TextThin>Wallet Balance</DutchC.TextThin>
          </DutchC.ContentDepositTitleWrapper>
          <DutchC.ContentButtonsWrapper>
            <OutlineButton onClick={onClose}>Cancel</OutlineButton>
            <Button
              className="bg-black/30 text-white"
              onClick={handleApproveMinting}
              disabled={isBalance ? false : true}
            >
              Start Minting
            </Button>
          </DutchC.ContentButtonsWrapper>
        </DutchC.ContentDepositWraper>
      </ModalBody>
    </Modal>
  );
};

export default MintFeeModal;
