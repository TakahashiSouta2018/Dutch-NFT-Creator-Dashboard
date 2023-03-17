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
            <DutchC.ContentNormalText>
              Mint fee per NFT
            </DutchC.ContentNormalText>
            <DutchC.ContentPrice>
              <DutchC.ContentNormalText>0.0003 ETH</DutchC.ContentNormalText>
              <DutchC.ContentNormalText>$0.28</DutchC.ContentNormalText>
            </DutchC.ContentPrice>
          </DutchC.Content>
          <DutchC.Content>
            <DutchC.ContentNormalText>
              Total (Minting 2 NFTs)
            </DutchC.ContentNormalText>
            <DutchC.ContentPrice>
              <DutchC.ContentNormalText>0.0006 ETH</DutchC.ContentNormalText>
              <DutchC.ContentNormalText>$0.56</DutchC.ContentNormalText>
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
            <DutchC.ContentBoldText>
              {eth} ETH{' '}
              <DutchC.ContentDepositFundText>
                Deposite Funds
              </DutchC.ContentDepositFundText>{' '}
            </DutchC.ContentBoldText>
            <DutchC.ContentThinText>Wallet Balance</DutchC.ContentThinText>
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
