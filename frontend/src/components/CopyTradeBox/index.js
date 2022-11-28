import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import clsx from 'clsx';
import { useGlobal } from 'store/hooks';
import { Clear } from '@material-ui/icons';
import RecentTradesTable from 'components/RecentTradesTable';

const useStyles = makeStyles(() => ({
    copyTradeBtn: {
        background: 'rgba(254, 251, 118, 0.1)',
        color: '#FEFB76',
        border: '1px solid rgba(254, 251, 118, 0.5)'
    },
    removeBtn: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "gray",
        fontSize: "12px",
    }
}));

function CopyTradeBox() {
    const classes = useStyles();
    const { blocklists } = useGlobal();

    return (
        <>
            <div className='secondary-background p-16 w-full rounded-8 text-white'>
                <div className='flex items-center justify-between pb-4 border-b-1 border-opacity-10 border-white'>
                    <p className='text-11 font-semibold'>Trade Settings</p>
                    <button className={clsx(classes.copyTradeBtn, 'px-12 py-4 flex items-center rounded-2')}>
                        <CopyIcon style={{ width: '20px' }}></CopyIcon>
                        <p className='text-sm ml-3'>Copy Trade</p>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 py-8">
                    <div className='w-full'>
                        <p>Label</p>
                        <input className='rounded-6 primary-background px-10 py-6 outline-none mt-4 w-full' placeholder='Select Trade'></input>
                    </div>
                    <div className='w-full'>
                        <p>Address</p>
                        <input className='rounded-6 primary-background px-10 py-6 outline-none mt-4 w-full' placeholder='Type address..'></input>
                    </div>
                </div>
                <button className='button-back text-black px-8 py-5 outline-none rounded-4 font-500'>+  Add More</button>
            </div >
            <div className='secondary-background p-16 w-full rounded-8 text-white mt-16'>
                <div className='flex items-center justify-between pb-6 border-b-1 border-opacity-10 border-white'>
                    <p className='text-11 font-semibold'>Paste Address</p>
                </div>
                <div className="flex items-center w-full py-8">
                    <input className='rounded-6 primary-background px-10 py-6 outline-none w-full' placeholder='Paste Address..'></input>
                    <button className='button-back text-black px-8 py-5 outline-none rounded-4 font-500 flex items-center ml-8 min-w-max'>+  Add Blocklist</button>
                </div>
            </div>
            <div className='secondary-background p-16 w-full rounded-8 text-white mt-16'>
                <div className='flex items-center justify-between pb-6 border-b-1 border-opacity-10 border-white'>
                    <p className='text-11 font-semibold'>Blocklist Address</p>
                </div>
                <div className="overflow-auto w-full">
                    {blocklists.map((n, index) => {
                        return (
                            <div className='primary-background px-10 py-6 grid grid-cols-1 sm:grid-cols-4 mt-6 rounded-6 overflow-auto' key={index}>
                                <div className='flex items-center justify-center sm:justify-start'>
                                    <img src={n.image} className="w-24" alt=""></img>
                                    <div className='ml-6'>
                                        <p>{n.name}</p>
                                        <p className='text-sm text-gray'>{n.ticker}</p>
                                    </div>
                                </div>
                                <div className='col-span-1 sm:col-span-2 flex items-center justify-center mt-6 sm:mt-0'>{n.contractAddress}</div>
                                <div className='flex items-center justify-center sm:justify-end mt-6 sm:mt-0'>
                                    <button className={clsx(classes.removeBtn, "rounded-4 flex items-center px-4 py-1")}>
                                        <Clear style={{ width: '18px' }}></Clear>
                                        <p className='ml-1'>Remove</p>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='secondary-background p-16 w-full rounded-8 text-white mt-16'>
                <p className='text-11 font-semibold mb-12'>Recent Trades</p>
                <RecentTradesTable></RecentTradesTable>
            </div>
        </>
    );
}

export default React.memo(CopyTradeBox);
