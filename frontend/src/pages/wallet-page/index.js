import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useUser } from 'store/hooks';
import CopyIcon from '@material-ui/icons/FileCopy'
import { toast } from 'react-toastify';
import TransactionTable from 'components/TransactionTable';

const useStyles = makeStyles(() => ({
    selectedTab: {
        color: "#FEFB76",
        borderBottom: "1px solid #FEFB76"
    }
}));

function WalletPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const { getDepositWallet, getUserTransactions, userWallet, userTransactions } = useUser();
    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            await getDepositWallet();
            await getUserTransactions();
        }
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    console.log(userTransactions);

    const handleCopy = () => {
        navigator.clipboard.writeText(userWallet.address);
        toast.success('Successfully copied to clipboard.');
    }

    return (
        <>
            <div className='my-16 border-b-1 border-white border-opacity-10 w-full flex items-center'>
                <div className={clsx(selectedTab === 0 ? classes.selectedTab : 'text-gray', 'cursor-pointer text-12 font-semibold px-8 py-5')}
                    onClick={() => { setSelectedTab(0) }}
                >
                    Deposit
                </div>
                <div className={clsx(selectedTab === 1 ? classes.selectedTab : 'text-gray', 'cursor-pointer text-12 font-semibold px-8 py-5 ml-3')}
                    onClick={() => { setSelectedTab(1) }}
                >
                    Withdraw
                </div>
                <div className={clsx(selectedTab === 2 ? classes.selectedTab : 'text-gray', 'cursor-pointer text-12 font-semibold px-8 py-5 ml-3')}
                    onClick={() => { setSelectedTab(2) }}
                >
                    Transactions
                </div>
            </div>

            {
                selectedTab === 0 ?
                    <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24 mt-4 sm:mt-8 md:mt-16 flex flex-col'>
                        <p className='text-14'>Deposit ETH to snipe new tokens.</p>
                        <p className='text-12 mt-8 text-yellow-500'>Deposit Address:</p>
                        <p>{userWallet.address}<CopyIcon className='ml-4 cursor-pointer' style={{ width: "16px" }} onClick={() => handleCopy()}></CopyIcon></p>
                        <p className='mt-6'>Deposit will take a few minutes.</p>
                    </div>
                    :
                    selectedTab === 1 ?
                        "Withdraw" :
                        <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24 mt-4 sm:mt-8 md:mt-16 flex flex-col'>
                            <TransactionTable></TransactionTable>
                        </div>
            }
        </>
    );
}

export default React.memo(WalletPage);
