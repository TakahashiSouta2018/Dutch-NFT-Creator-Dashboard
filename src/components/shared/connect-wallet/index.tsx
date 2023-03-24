import Image from 'next/image';
import useWalletHook from '@/hooks/useWalletHook';
import { ConnectorNames } from '@loopring-web/loopring-sdk';

const ConnectWallet = () => {
  const { connectAccount, disconnectAccount } = useWalletHook();

  return (
    <div className="App">
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem' }}
      >
        <button onClick={() => connectAccount(ConnectorNames.MetaMask)}>
          <Image
            src="https://static.loopring.io/assets/svg/meta-mask.svg"
            alt="MetaMask"
            height="36"
          />
        </button>
        <button onClick={() => connectAccount(ConnectorNames.WalletConnect)}>
          <Image
            src="https://static.loopring.io/assets/svg/wallet-connect.svg"
            alt="walletConnect"
            height="36"
          />
        </button>
        <button onClick={() => connectAccount(ConnectorNames.Coinbase)}>
          <Image
            src="https://static.loopring.io/assets/svg/coinbase-wallet.svg"
            alt="Coinbase"
            height="36"
          />
        </button>
        <button onClick={() => connectAccount(ConnectorNames.Gamestop)}>
          <Image
            src="https://static.loopring.io/assets/svg/gs.svg"
            alt="Gamestop"
            height="36"
          />
        </button>
        <button onClick={disconnectAccount}>disconnect</button>
      </div>
    </div>
  );
};

export default ConnectWallet;
