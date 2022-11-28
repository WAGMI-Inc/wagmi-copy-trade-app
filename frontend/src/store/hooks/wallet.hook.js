import Config from 'config/config';

export const useWallet = () => {
    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Config.chainId }],
            });
        } catch (e) {
            if (e.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: Config.chainId,
                                chainName: Config.chainName,
                                nativeCurrency: {
                                    name: 'Ethereum',
                                    symbol: 'ETH', // 2-6 characters long
                                    decimals: 18
                                },
                                blockExplorerUrls: Config.blockExploer,
                                rpcUrls: Config.rpcUrls,
                            },
                        ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
            return true;
        }
    }

    const isNetworkCorrect = async () => {
        try {
            const chainId = window.ethereum.networkVersion
            if (parseInt(chainId) === parseInt(Config.chainId.toString(16)))
                return 2;

            return 1;
        } catch ($e) {
            return 0;
        }
    }
    return {
        switchNetwork,
        isNetworkCorrect
    };
};
