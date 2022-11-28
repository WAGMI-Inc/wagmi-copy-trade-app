import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Close from '@material-ui/icons/Close';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from 'store/hooks';
import { LOCAL_STORAGE_KEY } from 'consts';
import { injected } from 'components/wallet/Connectors';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: '#161616'
    },
}));

const ConnectWalletModal = (props) => {
    const classes = useStyles();
    const { isNetworkCorrect, switchNetwork } = useWallet();
    const { activate } = useWeb3React();

    const connectMetamask = async () => {
        const isCorrect = await isNetworkCorrect();
        if (isCorrect === 0) {
            toast.error('Install Metamask!', 'Error');
            return;
        }

        if (isCorrect === 1) {
            await switchNetwork();
        }
        try {
            await activate(injected);
            localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED_WALLET, 'Metamask');
            props.setShowDlg(false);
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <>
            <Dialog
                open={props.showDlg}
                onClose={() => props.setShowDlg(false)}
                classes={{
                    paper: clsx('text-white rounded-8', classes.paper)
                }}
            >
                <div className='w-192 p-16 xs:w-256'>
                    <div className='flex justify-between items-center'>
                        <p className='text-11 font-medium text-white'>Connect Wallet</p>
                        <Close className="text-white" onClick={() => props.setShowDlg(false)}></Close>
                    </div>
                    <div className='border-b-1 border-white border-opacity-10 my-6'></div>
                    <div className='w-full primary-background rounded-8 my-16 flex justify-center p-8 items-center cursor-pointer'
                        onClick={() => connectMetamask()}
                    >
                        <img src="/assets/images/metamask.png" width={50} alt=""></img>
                        <p className='text-14 ml-8 text-white font-semibold'>Connect Metamask</p>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ConnectWalletModal;
