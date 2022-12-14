const configureEnvironments = () => {
    switch (process.env.REACT_APP_PROJECT_STATE) {
        case 'production':
            return {
                chainId: '0x1',
                chainName: 'Ethereum',
                blockExploer: ['https://etherscan.com'],
                rpcUrls: ['https://mainnet.infura.io/v3/1d8d526128a845c9b714b64d66d93f02'],
            };
        default:
            return {
                chainId: '0x5',
                chainName: 'Goerli test network',
                blockExploer: ['https://goerli.etherscan.io/'],
                rpcUrls: ['https://goerli.infura.io/v3/1d8d526128a845c9b714b64d66d93f02'],
            };
    }
}
module.exports = configureEnvironments();