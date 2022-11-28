import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TokensTable from 'components/TokensTable';
import MyCopyTrade from 'components/MyCopyTrade';
import MyPortfolio from 'components/MyPortfolio';

function HomePage() {
    return (
        <>
            <div className='w-full secondary-background rounded-8 lg:py-16 lg:px-24 sm:p-12 p-6'>
                <div className='relative'>
                    <input className='w-full primary-background px-8 py-6 outline-none rounded-6' placeholder='Search by Address / Txn / Token'>
                    </input>
                    <div className='button-back absolute h-full right-0 top-0 w-24 rounded-tr-6 rounded-br-6 flex justify-center items-center cursor-pointer'>
                        <SearchIcon className='text-black'></SearchIcon>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-4 md:mt-8 lg:mt-16 gap-4 md:gap-8 lg:gap-16">
                <MyCopyTrade></MyCopyTrade>
                <MyPortfolio></MyPortfolio>
            </div>

            <div className='secondary-background w-full rounded-md mt-4 md:mt-8 lg:mt-16 lg:p-24 p-16'>
                <p className='text-12'>Token Lists</p>
                <TokensTable />
            </div>
        </>
    );
}

export default React.memo(HomePage);
