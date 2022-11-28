import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WalletStatsBox from 'components/WalletStatsBox';
import CopyTradeBox from 'components/CopyTradeBox';
import FollowingTable from 'components/FollowingTable';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    selectedTab: {
        color: "#FEFB76",
        borderBottom: "1px solid #FEFB76"
    }
}));

function TradingPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyles();

    return (
        <>
            <div className='w-full secondary-background rounded-8 p-16'>
                <div className='flex items-center'>
                    <input className='w-full primary-background p-8 outline-none rounded-6' placeholder='Add multiple address..'>
                    </input>
                    <button className='button-back px-10 py-6 text-black ml-10 rounded-4 min-w-max'>+ Add Multiple Address</button>
                </div>
            </div>

            <div className='my-16 border-b-1 border-white border-opacity-10 w-full flex items-center'>
                <div className={clsx(selectedTab === 0 ? classes.selectedTab : 'text-gray', 'cursor-pointer font-semibold px-8 py-5')}
                    onClick={() => { setSelectedTab(0) }}
                >
                    Wallet Stats
                </div>
                <div className={clsx(selectedTab === 1 ? classes.selectedTab : 'text-gray', 'cursor-pointer font-semibold px-8 py-5 ml-3')}
                    onClick={() => { setSelectedTab(1) }}
                >
                    Copy Trade
                </div>
                <div className={clsx(selectedTab === 2 ? classes.selectedTab : 'text-gray', 'cursor-pointer font-semibold px-8 py-5 ml-3')}
                    onClick={() => { setSelectedTab(2) }}
                >
                    Following
                </div>
            </div>

            {
                selectedTab === 0 ?
                    <WalletStatsBox></WalletStatsBox> :
                    selectedTab === 1 ?
                        <CopyTradeBox></CopyTradeBox> :
                        <div className='secondary-background p-16 w-full rounded-8 text-white'>
                            <p className='text-11 font-semibold mb-12'>Following</p>
                            <FollowingTable></FollowingTable>
                        </div>
            }
        </>
    );
}

export default React.memo(TradingPage);
