import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AnalyticsIcon from '@material-ui/icons/BarChart';
import TradingIcon from '@material-ui/icons/ShowChart'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SnipeIcon from '@material-ui/icons/BluetoothSearchingOutlined'
import { useHistory } from 'react-router';
import { useGlobal } from 'store/hooks';

const useStyles = makeStyles(() => ({
    button: {
        display: 'flex',
        justifyContent: 'start',
        paddingRight: '10px',
        paddingTop: '10px',
        paddingBottom: '10px',
        alignItems: 'center',
        cursor: 'pointer',
        width: '100%',
    },
    selected: {
        background: ' linear-gradient(270deg, rgba(254, 251, 118, 0.22) 0%, rgba(254, 251, 118, 0) 100%)',
        color: "#FEFB76",
    },
    iconSelected: {
        color: "#FEFB76",
    },
    selectedDiv: {
        backgroundColor: "#FEFB76",
        height: '32px',
        borderRadius: '0.2rem',
        position: 'absolute',
        top: '6px',
        right: '0'
    }
}));

function Navigation(props) {
    const classes = useStyles(props);
    const history = useHistory();
    const { navText, setNavText } = useGlobal();

    useEffect(() => {
        let strs = window.location.pathname.split('/');
        setNavText(strs[strs.length - 1]);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className={clsx(
                'pt-4 sm:pt-20 whitespace-no-wrap',
            )}
        >
            <div className={clsx(navText === 'home' && classes.selected, classes.button, 'relative pl-12 text-white')} onClick={() => { setNavText('home'); history.push('/home') }}>
                <HomeIcon className={navText === 'home' ? classes.iconSelected : 'text-white'}></HomeIcon>
                <p className='text-10 font-400 list-item-text capitalize ml-8'>Home</p>
                {navText === 'home' && <div className={clsx(classes.selectedDiv, 'w-3')}></div>}
            </div>

            <div className={clsx(navText === 'analytics' && classes.selected, classes.button, 'relative pl-12 text-white mt-4')} onClick={() => { setNavText('analytics'); history.push('/analytics') }}>
                <AnalyticsIcon className={navText === 'analytics' ? classes.iconSelected : 'text-white'}></AnalyticsIcon>
                <p className='text-10 font-400 list-item-text capitalize ml-8'>Analytics</p>
                {navText === 'analytics' && <div className={clsx(classes.selectedDiv, 'w-3')}></div>}
            </div>

            <div className={clsx(navText === 'trading' && classes.selected, classes.button, 'relative pl-12 text-white mt-4')} onClick={() => { setNavText('trading'); history.push('/trading') }}>
                <TradingIcon className={navText === 'trading' ? classes.iconSelected : 'text-white'}></TradingIcon>
                <p className='text-10 font-400 list-item-text capitalize ml-8'>Trading</p>
                {navText === 'trading' && <div className={clsx(classes.selectedDiv, 'w-3')}></div>}
            </div>

            <div className={clsx(navText === 'wallet_traking' && classes.selected, classes.button, 'relative pl-12 text-white mt-4')} onClick={() => { setNavText('wallet_traking'); history.push('/wallet_traking') }}>
                <WalletIcon className={navText === 'wallet_traking' ? classes.iconSelected : 'text-white'}></WalletIcon>
                <p className='text-10 font-400 list-item-text capitalize ml-8'>Wallet Traking</p>
                {navText === 'wallet_traking' && <div className={clsx(classes.selectedDiv, 'w-3')}></div>}
            </div>

            <div className={clsx(navText === 'sniper' && classes.selected, classes.button, 'relative pl-12 text-white mt-4')} onClick={() => { setNavText('sniper'); history.push('/sniper') }}>
                <SnipeIcon className={navText === 'sniper' ? classes.iconSelected : 'text-white'}></SnipeIcon>
                <p className='text-10 font-400 list-item-text capitalize ml-8'>Sniper</p>
                {navText === 'wallet_traking' && <div className={clsx(classes.selectedDiv, 'w-3')}></div>}
            </div>
        </div >
    );

}

export default React.memo(Navigation);
