require('dotenv').config();
var mongoose = require('mongoose');
const db = require("../models");
const Token = db.token;

const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

var func = async () => {
    let page = 1;
    while (1) {
        let data = await CoinGeckoClient.coins.markets({ per_page: 250, page: page, vs_currency: 'usd', category: 'ethereum-ecosystem', sparkline: false });
        console.log(data.success);
        if (!data.success) {
            await sleep(10000);
            continue;
        }
        console.log(data.data.length);
        if (!data.data.length)
            break;

        for await (const item of data.data) {
            try {
                let detail = await CoinGeckoClient.coins.fetch(item.id, { tickers: false, localization: false, market_data: false, developer_data: false, sparkline: false });
                if (!detail.success) {
                    while (!detail.success) {
                        await sleep(10000);
                        detail = await CoinGeckoClient.coins.fetch(item.id, { tickers: false, localization: false, market_data: false, developer_data: false, sparkline: false });
                    }
                }

                console.log(item.id);
                const token = new Token({
                    token_id: item.id,
                    name: item.name,
                    symbol: item.symbol,
                    price: item.current_price,
                    image: item.image,
                    marketcap: item.market_cap,
                    diluted_marketcap: item.fully_diluted_valuation,
                    ath_change_percentage: item.ath_change_percentage,
                    price_change_24h: item.price_change_24h,
                    supply: item.total_supply,
                    contract_address: detail.data.platforms.ethereum,
                    release_date: detail.data.genesis_date,
                    dh_score: parseFloat(detail.data.coingecko_score) + parseFloat(detail.data.developer_score) + parseFloat(detail.data.community_score) + parseFloat(detail.data.liquidity_score),
                    website: detail.data.links.homepage[0]
                });
                token.save((err, token) => {
                    if (err) {
                        console.log(err);
                    }
                });
                await sleep(2000);
            } catch (error) {
                console.error(error);
            }
        }
        await sleep(10000); // sleep for 10 seconds
        page++;
    }
    console.log('finish');

};

func();
