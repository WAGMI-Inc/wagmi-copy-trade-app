import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TradingPerDayBox from 'components/TradingPerDayBox';
import TradeListTable from 'components/TradeListTable';
import CopyIcon from '@material-ui/icons/FileCopy';

function WalletTrakingPage() {
    return (
        <>
            <div className='w-full secondary-background rounded-8 pt-16 pb-10 px-20'>
                <div className='relative mb-8'>
                    <input className='w-full primary-background px-8 py-8 outline-none rounded-6 pr-28' placeholder='Search by Address / Txn / Token'>
                    </input>
                    <div className='flex absolute h-full right-0 top-0 justify-center items-center cursor-pointer py-8 pr-6'>
                        <div className='border-r-1 border-white border-opacity-10 h-full mr-4'></div>
                        <SearchIcon className='text-gray'></SearchIcon>
                    </div>
                </div>
                <p>Value in Wallet</p>
                <p className='text-sm text-gray'>12 Tokens</p>
            </div>
            <TradingPerDayBox></TradingPerDayBox>
            <div className='mt-16 secondary-background px-20 py-16 w-full rounded-8'>
                <div className='flex justify-between mb-10'>
                    <p className='text-white text-11'>Trade List</p>
                    <button className='flex button-back rounded-6 items-center px-10 py-5'>
                        <CopyIcon className='text-black' style={{ width: '18px' }} ></CopyIcon>
                        <p className='text-black ml-4 font-semibold'>Copy Trades</p>
                    </button>
                </div>
                <TradeListTable></TradeListTable>
            </div>
        </>
    );
}

export default React.memo(WalletTrakingPage);
