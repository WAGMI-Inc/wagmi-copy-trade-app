import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import TwitterStatsTable from 'components/TwitterStatsTable';
import TelegramStatsTable from 'components/TelegramStatsTable';

const useStyles = makeStyles(() => ({
    unSelectedBox: {
        backgroundColor: "#2E2E2E",
    },
    selectedOutline: {
        border: '1px solid #FEFB76',
    },
    selectedBox: {
        backgroundColor: '#34AADF'
    }
}));

function SocialMediaStats() {
    const classes = useStyles();
    const [socialType, setSocialType] = useState('twitter');

    return (
        <div className='w-full secondary-background rounded-8 py-16 px-12 md:px-24'>
            <div className="flex justify-between items-center">
                <p className='text-white text-12'>Social media stats</p>
                <div className='flex items-center'>
                    {
                        socialType === 'twitter' ?
                            <div className={clsx(classes.selectedOutline, 'w-20 h-20 rounded-4 flex items-center justify-center cursor-pointer')}>
                                <div className={clsx(classes.selectedBox, 'w-16 h-16 rounded-4 flex justify-center items-center')}>
                                    <img src="/assets/images/twitter_outline.png" alt=""></img>
                                </div>
                            </div> :
                            <div className={clsx(classes.unSelectedBox, 'w-20 h-20 rounded-4 flex justify-center items-center cursor-pointer')}
                                onClick={() => setSocialType('twitter')}
                            >
                                <img src="/assets/images/twitter_outline.png" alt=""></img>
                            </div>
                    }
                    {
                        socialType === 'telegram' ?
                            <div className={clsx(classes.selectedOutline, 'w-20 h-20 rounded-4 flex items-center justify-center ml-4 cursor-pointer')}>
                                <div className={clsx(classes.selectedBox, 'w-16 h-16 rounded-4 flex justify-center items-center')}>
                                    <img src="/assets/images/telegram_outline.png" alt=""></img>
                                </div>
                            </div> :
                            <div className={clsx(classes.unSelectedBox, 'w-20 h-20 rounded-4 flex justify-center items-center ml-4 cursor-pointer')}
                                onClick={() => setSocialType('telegram')}
                            >
                                <img src="/assets/images/telegram_outline.png" alt=""></img>
                            </div>
                    }
                </div>
            </div>

            {
                socialType === 'twitter' ?
                    <TwitterStatsTable></TwitterStatsTable> :
                    <TelegramStatsTable></TelegramStatsTable>
            }
            <div className='flex justify-end'>
                <button className='button-back text-black p-6 rounded-4 font-semibold'>Deep Social Media Search</button>
            </div>
        </div>
    );
}

export default withRouter(SocialMediaStats);
