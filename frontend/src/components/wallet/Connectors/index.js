import { InjectedConnector } from '@web3-react/injected-connector';
import config from 'config/config';

export const injected = new InjectedConnector({
    supportedChainIds: [parseInt(config.chainId.toString(16))],
})