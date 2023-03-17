import { Modal, ModalHead, ModalBody, Stepper, IconButton } from '@/common';
import * as DutchC from './style';
import { Button, OutlineButton } from '@/common';

const steps = [
  {
    id: 1,
    title: 'Mint Fee',
    active: true,
  },
  {
    id: 2,
    title: 'Wallet Signature',
    active: false,
  },
  {
    id: 3,
    title: 'Minting',
    active: false,
  },
];

interface MintFeeModalProps {
  eth: number;
  onClose: () => void;
}

const MintFeeModal: React.FC<MintFeeModalProps> = ({ eth, onClose }) => {
  return (
    <Modal>
      <ModalHead title="Mint Fee" onClose={onClose} />
      <ModalBody>
        <Stepper steps={steps}></Stepper>
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
            <IconButton icon="wallet" />
          </DutchC.ContentWalletIcon>
          <DutchC.ContentWalletAbsoluteIcon>
            <IconButton icon="exclamation-circle" />
          </DutchC.ContentWalletAbsoluteIcon>
          <DutchC.ContentDepositTitleWrapper>
            <DutchC.TextBold>
              {eth} ETH{' '}
              <DutchC.TextContentDepositFund>
                Deposite Funds
              </DutchC.TextContentDepositFund>{' '}
            </DutchC.TextBold>
            <DutchC.TextThin>Wallet Balance</DutchC.TextThin>
          </DutchC.ContentDepositTitleWrapper>
          <DutchC.ContentButtonsWrapper>
            <OutlineButton>Cancel</OutlineButton>
            <Button className="bg-black/30 text-white">Start Minting</Button>
          </DutchC.ContentButtonsWrapper>
        </DutchC.ContentDepositWraper>
      </ModalBody>
    </Modal>
  );
};

export default MintFeeModal;
