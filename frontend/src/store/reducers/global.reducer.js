import { GLOBAL } from '../types';

const initialState = {
    isProgressing: false,
    notiState: null,
    navText: 'home',
    notiOptions: {
        message: 'Hi',
        variant: null
    },
    showNavBar: true,
    foldOpen: false,
    showMobileNav: false,
    twitterStats: [
        { hashtags: '#TSUKA', tweets: 1000, tweets_change: 56, likes: 100000, comments: 96, retweets: 95 },
        { hashtags: '#TSUKA', tweets: 1000, tweets_change: 56, likes: 100000, comments: 96, retweets: 95 },
        { hashtags: '#TSUKA', tweets: 1000, tweets_change: -23, likes: 100000, comments: 96, retweets: 95 }
    ],
    telegramStats: [
        { group_image: '/assets/images/group1.png', telegram_group: 'ICO Speker', members: 100000, comments: 56, member_increase: 10 },
        { group_image: '/assets/images/group2.png', telegram_group: 'DeFi Million', members: 150000, comments: 56, member_increase: 10 },
        { group_image: '/assets/images/group3.png', telegram_group: 'IEO Polls', members: 200000, comments: 56, member_increase: -10 },
    ],
    connectedWallets: [
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', name: 'Ethereum', ticker: 'ETH', contractAddress: '0xf82ac593*****c862f9bc', transactions: 4 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', name: 'Tether', ticker: 'USDT', contractAddress: '0xf82ac593*****c862f9bc', transactions: 4 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', name: 'Dogecoin', ticker: 'DOGE', contractAddress: '0xf82ac593*****c862f9bc', transactions: 4 },
    ],
    firstBuyers: [
        { order: 1, walletAddress: "0xf82*****5937", holding: 1.5, amountSold: 271.48, walletAge: '360 days 7 hrs ago', dhScore: 8, fromCex: 100000000 },
        { order: 3, walletAddress: "0xf82*****5937", holding: 1.5, amountSold: 271.48, walletAge: '360 days 7 hrs ago', dhScore: 8, fromCex: 100000000 },
        { order: 5, walletAddress: "0xf82*****5937", holding: 1.5, amountSold: 271.48, walletAge: '360 days 7 hrs ago', dhScore: 8, fromCex: 100000000 },
    ],
    blocklists: [
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', name: 'Ethereum', ticker: 'ETH', contractAddress: '0xc5fb36dd2fb59d3b98deff88425a3f425ee469ed' },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', name: 'Tether', ticker: 'USDT', contractAddress: '0xc5fb36dd2fb59d3b98deff88425a3f425ee469ed' },
    ],
    recentTrades: [
        { wallet: 10, pl: 25, tradeVolume: 200, gasFee: 120 },
        { wallet: 6, pl: -25, tradeVolume: 200, gasFee: 120 },
        { wallet: 8, pl: 25, tradeVolume: 200, gasFee: 120 },
        { wallet: 3, pl: -25, tradeVolume: 200, gasFee: 120 },
    ],
    followings: [
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', name: 'Daddy Shark', address: '0xf82ac593*****c862f9bc', pl: 25, tradeVolume: 200, numberofTrades: 25, projectTraded: 500 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', name: 'Dot Digby', address: '0xf82ac593*****c862f9bc', pl: -25, tradeVolume: 400, numberofTrades: 15, projectTraded: 500 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', name: 'Space Neko', address: '0xf82ac593*****c862f9bc', pl: 25, tradeVolume: 300, numberofTrades: 35, projectTraded: 500 },
    ],
    tradeList: [
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', name: 'Ethereum', ticker: 'ETH', address: '0xf82ac593*****c862f9bc', pl: 25, tradeVolume: 200, numberofTrades: 25, projectTraded: 500 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', name: 'Tether', ticker: 'USDT', address: '0xf82ac593*****c862f9bc', pl: -25, tradeVolume: 400, numberofTrades: 15, projectTraded: 500 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', name: 'Dogecoin', ticker: 'DOGE', address: '0xf82ac593*****c862f9bc', pl: 25, tradeVolume: 300, numberofTrades: 35, projectTraded: 500 },
        { image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png', name: 'Polkadot', ticker: 'DOT', address: '0xf82ac593*****c862f9bc', pl: 25, tradeVolume: 300, numberofTrades: 35, projectTraded: 500 },
    ],
};

export default function globalReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GLOBAL.PROGRESS_CHANGE:
            return {
                ...state,
                isProgressing: payload,
            };
        case GLOBAL.SET_NOTIFICATION_VALUE:
            return {
                ...state,
                notiState: payload.notiState,
                notiOptions: payload.notiOptions,
            };
        case GLOBAL.SET_SHOW_NAVBAR:
            return {
                ...state,
                showNavBar: payload
            }
        case GLOBAL.SET_FOLD_OPEN:
            return {
                ...state,
                foldOpen: payload,
            }
        case GLOBAL.SET_SHOW_MOBILE_NAV:
            return {
                ...state,
                showMobileNav: payload,
            }
        case GLOBAL.SET_NAV_TEXT:
            return {
                ...state,
                navText: payload,
            }
        default:
            return state;
    }
}
