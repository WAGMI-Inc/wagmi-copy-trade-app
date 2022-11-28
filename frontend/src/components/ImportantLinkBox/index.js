import React from 'react';
import { OpenInNew } from '@material-ui/icons';
import { useToken } from 'store/hooks';

function ImportantLinkBox() {
    const { selectedAnalytic } = useToken();

    return (
        <div className='w-full secondary-background rounded-8 py-16'>
            <div className='px-12 md:px-24 border-b-1 border-white border-opacity-10 pb-10'>
                <p className='text-white text-12'>Important links</p>
            </div>
            <div className='px-12 md:px-24 text-white'>
                <div className='py-10 border-b-1 border-white border-opacity-10 flex items-center'>
                    <img src='/assets/images/dextools.png' alt="" className='w-24'></img>
                    <p className='ml-6'>Dextools</p>
                    <a target="_blank" rel="noopener noreferrer" href="https://dextools.io">
                        <OpenInNew className='ml-6' style={{ width: '12px', color: "#36B1BF" }}></OpenInNew>
                    </a>
                </div>
                <div className='py-10 border-b-1 border-white border-opacity-10 flex items-center'>
                    <img src='/assets/images/etherscan.png' alt="" className='w-24'></img>
                    <p className='ml-6'>Etherscan</p>
                    <a target="_blank" rel="noopener noreferrer" href={selectedAnalytic.contract_address && selectedAnalytic.contract_address.length > 0 ?
                        "https://etherscan.io/tokens/" + selectedAnalytic.contract_address : "https://etherscan.io"}>
                        <OpenInNew className='ml-6' style={{ width: '12px', color: "#36B1BF" }}></OpenInNew>
                    </a>
                </div>
                <div className='py-10 border-b-1 border-white border-opacity-10 flex items-center'>
                    <img src='/assets/images/uniswap.png' alt="" className='w-24'></img>
                    <p className='ml-6'>Uniswap</p>
                    <a target="_blank" rel="noopener noreferrer" href="https://app.uniswap.io">
                        <OpenInNew className='ml-6' style={{ width: '12px', color: "#36B1BF" }}></OpenInNew>
                    </a>
                </div>
                <div className='py-10 border-b-1 border-white border-opacity-10 flex items-center'>
                    <img src='/assets/images/telegram.png' alt="" className='w-24'></img>
                    <p className='ml-6'>Telegram</p>
                    <a target="_blank" rel="noopener noreferrer" href="https://web.telegram.org">
                        <OpenInNew className='ml-6' style={{ width: '12px', color: "#36B1BF" }}></OpenInNew>
                    </a>
                </div>
                <div className='py-10 border-b-1 border-white border-opacity-10 flex items-center'>
                    <img src='/assets/images/logo.png' alt="" className='w-24'></img>
                    <p className='ml-6'>Website</p>
                    <a target="_blank" rel="noopener noreferrer" href={selectedAnalytic.website}>
                        <OpenInNew className='ml-6' style={{ width: '12px', color: "#36B1BF" }}></OpenInNew>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ImportantLinkBox);
