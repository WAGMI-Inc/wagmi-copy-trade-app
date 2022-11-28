import React, { useEffect } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import TokenOverview from 'components/TokenOverview';
import ImportantLinkBox from 'components/ImportantLinkBox';
import HandMetricChartBox from 'components/HandMetricChartBox';
import SocialMediaStats from 'components/SocialMediaStats';
import ConnectedWalletsTable from 'components/ConnectedWalletsTable';
import FirstBuyersTable from 'components/FirstBuyersTable';
import ReactSelect from 'react-select';
import { useToken } from 'store/hooks';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    rankBox: {
        backgroundColor: 'rgba(254, 251, 118, 0.1)',
        color: '#FEFB76',
    },
    infoBox: {
        backgroundColor: '#272727',
        color: "#B9B9B9",
    }
}));

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#0D0C0C', border: 'none', color: 'white', padding: '0.3rem' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? 'red' : "#161616",
            color: 'white',
            "&:hover": {
                backgroundColor: 'gray'
            }
        }
    }
};

function AnalyticsPage() {
    const classes = useStyles();
    const { getTokenOptions, tokenOptions, getSelectedAnalytic, selectedAnalytic } = useToken();

    useEffect(() => {
        const init = async () => {
            await getTokenOptions();
        }
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = async (data) => {
        await getSelectedAnalytic(data.value);
    }

    return (
        <>
            <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24'>
                {/* <div className='relative'>
                    <input className='w-full primary-background px-8 py-6 outline-none rounded-6' placeholder='Search by Address / Txn / Token'>
                    </input>
                    <div className='button-back absolute h-full right-0 top-0 w-24 rounded-tr-6 rounded-br-6 flex justify-center items-center cursor-pointer'>
                        <SearchIcon className='text-black'></SearchIcon>
                    </div>
                </div> */}
                <p className='text-12 mb-6'>Search Token...</p>
                <ReactSelect
                    styles={colourStyles}
                    options={tokenOptions}
                    onChange={e => handleChange(e)}
                    formatOptionLabel={item => (
                        <div className='flex items-center'>
                            <img src={item.image} alt="" className='w-20 mr-4' />
                            <span className='text-white'>{item.label}</span>
                        </div>
                    )}
                />
            </div>

            <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24 mt-4 sm:mt-8 md:mt-16 flex items-center'>
                <img src={selectedAnalytic.image} className="w-32" alt=""></img>
                <div className='ml-8 flex flex-col justify-between h-full py-2'>
                    <p className='text-white'>{selectedAnalytic.name}<span className='text-gray ml-6 uppercase'>{selectedAnalytic.symbol}</span></p>
                    <div className='flex items-center'>
                        <div className={clsx('rounded-full py-2 px-6 text-xs flex justify-center', classes.rankBox)}>Rank #2</div>
                        <div className={clsx('rounded-full py-2 px-6 ml-2 text-xs flex justify-center', classes.infoBox)}>Token</div>
                        <div className={clsx('rounded-full py-2 px-6 ml-2 text-xs flex justify-center', classes.infoBox)}>On 12,716 Watchlists</div>
                    </div>
                </div>
            </div>

            <div className='mt-4 sm:mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-16 w-full'>
                <TokenOverview></TokenOverview>
                <ImportantLinkBox></ImportantLinkBox>
            </div>
            <div className='mt-4 sm:mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-16 w-full'>
                <HandMetricChartBox></HandMetricChartBox>
                <SocialMediaStats></SocialMediaStats>
            </div>
            <div className='mt-4 sm:mt-8 md:mt-16 secondary-background rounded-8 py-16 px-12 md:px-24 w-full'>
                <p className='text-12 text-white mb-12'>Connected Wallets</p>
                <ConnectedWalletsTable></ConnectedWalletsTable>
            </div>
            <div className='mt-4 sm:mt-8 md:mt-16 secondary-background rounded-8 py-16 px-12 md:px-24 w-full'>
                <p className='text-12 text-white mb-12'>First Buyers</p>
                <FirstBuyersTable></FirstBuyersTable>
            </div>
        </>
    );
}

export default React.memo(AnalyticsPage);
