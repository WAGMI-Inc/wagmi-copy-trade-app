import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProgressComponent from 'components/ProgressComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from 'consts';
import clsx from 'clsx';
import NavBarWrapper from 'components/NavBarWrapper';
import ToolbarLayout from 'components/ToolbarLayout';
import TradingPage from 'pages/trading-page';
import walletTrakingPage from './wallet-traking-page';
import LoginPage from './Auth/login';
import SignUpPage from './Auth/signup';
// import { useWeb3React } from '@web3-react/core';
// import { injected } from "../components/wallet/Connectors";
// import { useGlobal, useWallet } from 'store/hooks';
import HomePage from 'pages/home-page';
import AnalyticsPage from './analytics-page';
const { TOKEN } = LOCAL_STORAGE_KEY;

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0D0C0C',
        color: 'white',
        '&.scroll-body': {
            '& $wrapper': {
                height: 'auto',
                flex: '0 0 auto',
                overflow: 'auto'
            },
        },
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: 'calc(100% - 64px)',
        height: '100%',
        flex: '1 1 auto'
    },
}));

function Pages() {
    const classes = useStyles();
    // const { activate } = useWeb3React();
    // const { showNotification } = useGlobal();
    // const { isNetworkCorrect, switchNetwork } = useWallet();

    useEffect(() => {
        // const init = async () => {
        //     const isCorrect = await isNetworkCorrect();
        //     console.log(isCorrect);
        //     if (isCorrect === 0) {
        //         showNotification('error', 'Install Metamask!');
        //         return;
        //     }

        //     if (isCorrect === 1) {
        //         await switchNetwork();
        //     }
        //     if (localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED_WALLET) === 'Metamask') {
        //         try {
        //             await activate(injected)
        //         } catch (ex) {
        //             console.log(ex)
        //         }
        //     }
        // }
        // init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const isLoggedIn = () => {
        return localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null;
    }

    return (
        <>
            <React.Fragment>
                <>
                    {
                        isLoggedIn() ?
                            <div className={clsx(classes.root)}>
                                <div className="flex flex-1 overflow-hidden relative h-full">
                                    <NavBarWrapper />

                                    <div className={clsx(classes.wrapper, 'h-full flex flex-col')}>
                                        <ToolbarLayout />
                                        <div className='flex flex-col items-center w-full'>
                                            <div className='wrapper w-full p-4 sm:p-8 lg:p-16 flex flex-col items-center'>
                                                <Switch>
                                                    <Route exact path="/home" component={HomePage} />
                                                    <Route exact path="/analytics" component={AnalyticsPage} />
                                                    <Route exact path="/trading" component={TradingPage} />
                                                    <Route exact path="/wallet_traking" component={walletTrakingPage} />
                                                    <Redirect to="/home"></Redirect>
                                                </Switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <Switch>
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/signup" component={SignUpPage} />
                                <Redirect to="/login"></Redirect>
                            </Switch>
                    }
                </>
            </React.Fragment>
            <ProgressComponent></ProgressComponent>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Pages;
