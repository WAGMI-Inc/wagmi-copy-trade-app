import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import ChartIcon from '@material-ui/icons/ShowChart';
import LockIcon from '@material-ui/icons/Lock';
import CopyIcon from '@material-ui/icons/FileCopy'
import { toast } from 'react-toastify';
import { useToken } from 'store/hooks';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    chartBox: {
        backgroundColor: '#272727',
        color: '#B9B9B9'
    },
    plusColor: {
        color: '#36B1BF'
    },
    minusText: {
        color: "#EB5757"
    }
}));

function TokenOverview(props) {
    const classes = useStyles();
    const { selectedAnalytic, tokens } = useToken();

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedAnalytic.contract_address);
        toast.success('Successfully copied to clipboard.');
    }

    return (
        <div className='w-full secondary-background rounded-8 py-16'>
            <div className='flex justify-between px-12 md:px-24 w-full border-b-1 border-white border-opacity-10 pb-10'>
                <p className='text-white text-12'>Overview<span className='text-gray text-10'> [RPC]-20</span></p>
                <div className={clsx(classes.chartBox, 'rounded-6 px-4 py-2 flex items-center text-sm')}>
                    Chart
                    <ChartIcon className='ml-2'></ChartIcon>
                </div>
            </div>
            <div className='px-12 md:px-24 text-sm text-white'>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <div className='border-r-1 border-white border-opacity-10'>
                        <p className='text-gray'>PRICE</p>
                        <p className='text-white'>
                            <NumberFormat value={selectedAnalytic.price} displayType={'text'} thousandSeparator={true} prefix='$' />
                            <span className='text-xs text-gray ml-2'>
                                <NumberFormat value={parseFloat(parseFloat(selectedAnalytic.price) / (tokens.length ? tokens[0].price : 1200)).toFixed(8)} displayType={'text'} thousandSeparator={true} prefix='@' suffix=' Eth' />
                            </span>
                            {
                                selectedAnalytic.price_change_24h > 0 ?
                                    <span className={clsx(classes.plusColor, 'text-xs ml-2')}>
                                        <NumberFormat value={parseFloat(selectedAnalytic.price_change_24h).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix='(+' suffix='$)' />
                                    </span> :
                                    <span className={clsx(classes.minusText, 'text-xs ml-2')}>
                                        <NumberFormat value={parseFloat(selectedAnalytic.price_change_24h).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix='(-' suffix='$)' />
                                    </span>
                            }

                        </p>
                    </div>
                    <div className='pl-6 flex flex-col'>
                        <p className='text-gray flex items-center'>FULLY DILUTED MARKET CAP <img src="/assets/images/questionmark.png" className='ml-2' alt=""></img></p>
                        <p className='rounded-4 px-4 py-2 text-white mr-auto' style={{ backgroundColor: '#272727' }}>
                            <NumberFormat value={selectedAnalytic.diluted_marketcap} displayType={'text'} thousandSeparator={true} prefix='$' />
                        </p>
                    </div>
                </div>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p >Token Supply</p>
                    <p className='flex items-center pl-6'>
                        <NumberFormat value={selectedAnalytic.supply} displayType={'text'} thousandSeparator={true} suffix={" " + selectedAnalytic.symbol} />
                        <img src="/assets/images/information-circle.png" className='ml-2' alt=""></img></p>
                </div>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p>Marketcap</p>
                    <p className='pl-6'>
                        <NumberFormat value={selectedAnalytic.marketcap} displayType={'text'} thousandSeparator={true} prefix='$' />
                    </p>
                </div>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p>Liquidity</p>
                    <p className='pl-6'>$320,000</p>
                </div>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p>Liq/mc</p>
                    <p className='pl-6'>35%</p>
                </div>
                {selectedAnalytic.contract_address && selectedAnalytic.contract_address.length ?
                    <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                        <p >Deployer address</p>
                        <p className='flex items-center pl-6'>{selectedAnalytic.contract_address.substring(0, 6) + '...' + selectedAnalytic.contract_address.substring(selectedAnalytic.contract_address.length - 4)}
                            <CopyIcon className='ml-2 cursor-pointer' style={{ width: "14px" }}
                                onClick={() => { handleCopy() }}
                            ></CopyIcon>
                        </p>
                    </div> : null
                }
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p >Liquidity locked or burnt</p>
                    <p className='flex items-center pl-6'>
                        <LockIcon className='mr-2 cursor-pointer' style={{ width: "14px" }}></LockIcon>
                        Locked for 5 months</p>
                </div>
                <div className='py-6 border-b-1 border-white border-opacity-10 grid grid-cols-2'>
                    <p>Token age</p>
                    <p className='pl-6'>
                        {selectedAnalytic.release_date ? moment(selectedAnalytic.release_date).fromNow() : moment('2015/01/01').fromNow()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default React.memo(TokenOverview);
