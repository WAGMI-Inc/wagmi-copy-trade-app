import React from 'react';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/MenuOpen';
import UserMenu from 'components/UserMenu';
import { useGlobal } from 'store/hooks';
import { useHistory } from 'react-router';
import { useUser } from 'store/hooks';

// import { useWeb3React } from '@web3-react/core';
// import { injected } from 'components/wallet/Connectors';
// import NotificationIcon from '@material-ui/icons/Notifications';
// import { LOCAL_STORAGE_KEY } from 'consts';
// import { useWallet } from 'store/hooks';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#161616",
    },
    walletButton: {
        background: 'rgba(254, 251, 118, 0.1)',
        color: '#FEFB76',
        border: '1px solid rgba(254, 251, 118, 0.5)'
    },
    button: {
        padding: '8px',
        borderRadius: '50%',
        minWidth: '0px',
    },
    walletDiv: {
        backgroundColor: 'rgba(133,13,155,0.27)',
    },
}));

function ToolbarLayout(props) {
    const classes = useStyles(props);
    const { showMobileNav, setShowMobileNav, navText, setNavText } = useGlobal();
    const { userWallet } = useUser();
    const history = useHistory();

    // const { deactivate, activate } = useWeb3React();
    // const { isNetworkCorrect, switchNetwork } = useWallet();

    // async function disconnect() {
    //     try {
    //         deactivate()
    //         localStorage.removeItem(LOCAL_STORAGE_KEY.CONNECTED_WALLET);
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // }

    // async function connect() {
    //     const isCorrect = await isNetworkCorrect();
    //     if (isCorrect === 0) {
    //         showNotification('error', 'Install Metamask!');
    //         return;
    //     }

    //     if (isCorrect === 1) {
    //         await switchNetwork();
    //     }
    //     try {
    //         await activate(injected);
    //         localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED_WALLET, 'Metamask');
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // }

    return (
        <div
            className={clsx(classes.root, 'flex w-full z-20 top-0 sticky justify-center')}
            color="default"
        >
            <div className="p-0 min-h-40 flex items-center w-full mx-2 sm:mx-4 md:mx-8 lg:mx-12">
                <Hidden smUp>
                    <Button className={classes.button} onClick={() => { let tmp = !showMobileNav; setShowMobileNav(tmp); }} >
                        <MenuIcon className="p-0 text-white" />
                    </Button>
                </Hidden>
                <div className="flex items-center px-8 justify-between w-full">
                    {
                        navText === 'wallet_traking' ?
                            <p className='text-white text-12 font-semibold capitalize'>Wallet Traking</p> :
                            <p className='text-white text-12 font-semibold capitalize'>{navText}</p>
                    }


                    {/* {
                        active ?
                            <div className={clsx(classes.walletDiv, 'rounded-full px-2 py-2 flex justify-center items-center')}>
                                <img src='/assets/images/wallet.png' alt='' width='45'></img>
                                <p className='text-white text-sm sm:text-base'>{account.slice(0, 6)}...{account.slice(-4,)}</p>
                                <button className={clsx(classes.walletButton, 'ml-3 rounded-full sm:text-base px-6 py-2 font-semibold text-white')}
                                    onClick={disconnect}
                                >
                                    Disconnect
                                </button>
                            </div> :
                            <button className={clsx(classes.walletButton, 'rounded-full sm:text-base px-6 py-2 font-semibold text-white flex items-center')}
                                onClick={connect}
                            >
                                <img src='/assets/images/wallet.png' alt='' width='45'></img>
                                Connect Wallet
                            </button>
                    } */}
                    <div className='flex items-center'>
                        {/* <NotificationIcon className='mr-4 text-gray'></NotificationIcon> */}
                        <p className='mr-8 text-12'>{userWallet.balance}ETH</p>

                        <button className={clsx(classes.walletButton, 'px-12 py-4 flex items-center rounded-2 text-11')}
                            onClick={() => { history.push('/wallet'); setNavText('wallet') }}
                        >
                            WALLET
                        </button>
                        <UserMenu />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default React.memo(ToolbarLayout);
