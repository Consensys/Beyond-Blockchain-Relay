import { Connectors } from "web3-react";
import TrezorApi from "trezor-connect";
// import WalletConnectApi from "@walletconnect/web3-subprovider";
import FortmaticApi from "fortmatic";
import PortisApi from "@portis/web3";

const {
  InjectedConnector,
  TrezorConnector,
  LedgerConnector,
  // WalletConnectConnector,
  FortmaticConnector,
  PortisConnector
} = Connectors;

const env = process.env;

const supportedNetworkURLs = {
  1: `https://mainnet.infura.io/v3/${env.REACT_APP_INFURA_KEY}`,
  3: `https://ropsten.infura.io/v3/${env.REACT_APP_INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${env.REACT_APP_INFURA_KEY}`,
};
const manifestEmail = env.REACT_APP_TREZOR_MANIFEST_EMAIL; // trezor
const manifestAppUrl = env.REACT_APP_TREZOR_MANIFEST_URL; // trezor
const defaultNetwork = 1; // mainnet
// const defaultNetwork = 4; // rinkeby
const fortmaticApiKey = env.REACT_APP_FORTMATIC_KEY_RINKEBY;
const portisDAppId = env.REACT_APP_PORTIS_DAPP_ID;
const portisNetwork = env.REACT_APP_PORTIS_NETWORK;

const Injected = new InjectedConnector({
  supportedNetworks: [1, 3, 4]
});

const Trezor = new TrezorConnector({
  api: TrezorApi,
  supportedNetworkURLs,
  defaultNetwork,
  manifestEmail,
  manifestAppUrl
});

const Ledger = new LedgerConnector({
  supportedNetworkURLs,
  defaultNetwork
});

// const WalletConnect = new WalletConnectConnector({
//   api: WalletConnectApi,
//   bridge: "https://bridge.walletconnect.org",
//   supportedNetworkURLs,
//   defaultNetwork
// });

const Fortmatic = new FortmaticConnector({
  api: FortmaticApi,
  apiKey: fortmaticApiKey,
  logoutOnDeactivation: false
});

const Portis = new PortisConnector({
  api: PortisApi,
  dAppId: portisDAppId,
  network: portisNetwork,
  // options:
});

export default {
  Injected,
  Fortmatic,
  Trezor,
  Ledger,
  // WalletConnect,
  Portis
};
