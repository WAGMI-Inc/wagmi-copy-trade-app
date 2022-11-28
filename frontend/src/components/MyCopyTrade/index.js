import React from 'react';
import CopyIcon from '@material-ui/icons/FileCopy';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    copyTrade1: {
        background: 'rgba(8, 195, 219, 0.1)'
    },
    copyTrade2: {
        background: 'rgba(190, 53, 255, 0.1)'
    },
    copyTrade3: {
        background: 'rgba(24, 203, 117, 0.1)'
    },
    copyTrade4: {
        background: 'rgba(235, 87, 87, 0.1)'
    },
}));

function MyCopyTrade() {
    const classes = useStyles();

    return (
        <div className='w-full secondary-background rounded-8 lg:px-24 lg:py-16 xs:p-12 p-6'>
            <div className='flex w-full justify-between items-center'>
                <p className='text-11 sm:text-12'>My Copy Trades</p>
                <button className='button-back px-6 py-3 text-black flex items-center rounded-4'>
                    <CopyIcon className='text-black' style={{ width: '18px' }} ></CopyIcon>
                    <p className='text-black ml-4 font-500'>Copy Trades</p>
                </button>
            </div>
            <div className='w-full grid grid-cols-2 gap-5 sm:gap-10 mt-6 sm:mt-24 md:gap-6 md:mt-16 lg:gap-10 lg:mt-24'>
                <div className='w-full div-back rounded-8 p-6 md:p-6 lg:p-12 flex items-center'>
                    <div className={clsx(classes.copyTrade1, 'w-24 h-24 xs:w-36 xs:h-36 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-6 xs:rounded-12 md:rounded-6 lg:rounded-12 flex items-center justify-center')}>
                        <img className='w-12 xs:w-auto lg:w-auto md:w-16' src="/assets/images/trade1.png" alt=""></img>
                    </div>
                    <div className='h-full flex flex-col justify-between py-2 ml-10'>
                        <p className='text-white text-opacity-50 text-sm'>Daily Profit</p>
                        <p className='text-white text-12 font-medium mt-auto'>$4586.00</p>
                    </div>
                </div>
                <div className='w-full div-back rounded-8 p-6 md:p-6 lg:p-12 flex items-center'>
                    <div className={clsx(classes.copyTrade2, 'w-24 h-24 xs:w-36 xs:h-36 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-6 xs:rounded-12 md:rounded-6 lg:rounded-12 flex items-center justify-center')}>
                        <img className='w-12 xs:w-auto lg:w-auto md:w-16' src="/assets/images/trade2.png" alt=""></img>
                    </div>
                    <div className='h-full flex flex-col justify-between py-2 ml-10'>
                        <p className='text-white text-opacity-50 text-sm min-w-max'>Daily trade volume</p>
                        <p className='text-white text-12 font-medium mt-auto'>$20830.00</p>
                    </div>
                </div>
                <div className='w-full div-back rounded-8 p-6 md:p-6 lg:p-12 flex items-center'>
                    <div className={clsx(classes.copyTrade3, 'w-24 h-24 xs:w-36 xs:h-36 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-6 xs:rounded-12 md:rounded-6 lg:rounded-12 flex items-center justify-center')}>
                        <img className='w-12 xs:w-auto lg:w-auto md:w-16' src="/assets/images/trade3.png" alt=""></img>
                    </div>
                    <div className='h-full flex flex-col justify-between py-2 ml-10'>
                        <p className='text-white text-opacity-50 text-sm'>Number of wallets</p>
                        <p className='text-white text-12 font-medium mt-auto'>121</p>
                    </div>
                </div>
                <div className='w-full div-back rounded-8 p-6 md:p-6 lg:p-12 flex items-center'>
                    <div className={clsx(classes.copyTrade4, 'w-24 h-24 xs:w-36 xs:h-36 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-6 xs:rounded-12 md:rounded-6 lg:rounded-12 flex items-center justify-center')}>
                        <img className='w-12 xs:w-auto lg:w-auto md:w-16' src="/assets/images/trade4.png" alt=""></img>
                    </div>
                    <div className='h-full flex flex-col justify-between py-2 ml-10'>
                        <p className='text-white text-opacity-50 text-sm'>Daily gas fees</p>
                        <p className='text-white text-12 font-medium mt-auto'>$260</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MyCopyTrade);
