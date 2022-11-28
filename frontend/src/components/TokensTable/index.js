import _ from 'lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import TokensTableHead from './TokensTableHead';
import { useToken } from 'store/hooks';
import TablePaginationActions from 'components/TablePaginationActions'
import Avatar from '@material-ui/core/Avatar';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const StyledTableCell = withStyles(() =>
    createStyles({
        body: {
            color: "white",
            fontWeight: '500',
            border: "0px solid white",
            whiteSpace: "nowrap",
            padding: '0.3rem 4px',
            verticalAlign: 'center',
            ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                padding: '0.5rem 8px'
            },
        },
    }),
)(TableCell);

const useStyles = makeStyles(() => ({
    plusText: {
        color: "#27AE60"
    },
    minusText: {
        color: "#EB5757"
    },
    numberInput: {
        backgroundColor: '#272727',
        border: '0.5px solid #494747',
        width: 'calc((100% - 1px - 2.2rem) / 2)'
    },
    lastNumberInput: {
        backgroundColor: '#272727',
        border: '0.5px solid #494747',
        width: 'calc((100% - 1px - 2.2rem) / 2)',
        ['@media (min-width:1280px)']: { // eslint-disable-line no-useless-computed-key
            width: 'calc((100% - 1.2rem) / 2)',
        },
    },
    textGray: {
        color: '#B9B9B9'
    },
    filterBox: {
        width: 'calc((100% - 2px - 3rem) / 2 + 1rem + 1px)',
        marginTop: '10px',
        ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
            width: 'calc((100% - 3px - 5rem) / 3 + 1rem + 1px)',
        },
        ['@media (min-width:1280px)']: { // eslint-disable-line no-useless-computed-key
            width: 'calc((100% - 5px - 10rem) / 6 + 1rem + 1px)',
        },
    },
    lastfilterBox: {
        width: 'calc((100% - 2px - 3rem) / 2 + 1rem + 1px)',
        marginTop: '10px',
        ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
            width: 'calc((100% - 3px - 5rem) / 3 + 1rem + 1px)',
        },
        ['@media (min-width:1280px)']: { // eslint-disable-line no-useless-computed-key
            width: 'calc((100% - 5px - 10rem) / 6)',
        },
    },
    split: {
        width: '1px',
        backgroundColor: '#494747',
        height: '16px'
    }
}));

function TokensTable() {
    const classes = useStyles();
    const [minMarketcap, setMinMarketcap] = useState('');
    const [maxMarketcap, setMaxMarketcap] = useState('');
    const [minDHScore, setMinDHScore] = useState('');
    const [maxDHScore, setMaxDHScore] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [minATHChange, setMinATHChange] = useState('');
    const [maxATHChange, setMaxATHChange] = useState('');
    const [minPriceChange, setMinPriceChange] = useState('');
    const [maxPriceChange, setMaxPriceChange] = useState('');
    const [minLiqMC, setMinLiqMC] = useState('');
    const [maxLiqMC, setMaxLiqMC] = useState('');
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'id'
    });

    const { tokens, getAllTokens } = useToken();

    useEffect(() => {
        const init = async () => {
            await getAllTokens();
        }
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    return (
        <>
            <div className='flex items-center justify-center mb-12 flex-wrap'>
                <div className={classes.filterBox}>
                    <p className={clsx(classes.textGray, 'text-md')}>Marketcap</p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minMarketcap}
                            onChange={e => setMinMarketcap(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none ml-12 mr-10')} placeholder="Max"
                            value={maxMarketcap}
                            onChange={e => setMaxMarketcap(e.target.value)}
                            type="number"></input>
                        <div className={classes.split}></div>
                    </div>
                </div>

                <div className={clsx(classes.filterBox, "ml-10")}>
                    <p className={clsx(classes.textGray, 'text-md')}>Diamond Hand Metric</p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minDHScore}
                            onChange={e => setMinDHScore(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none ml-12 mr-10')} placeholder="Max"
                            value={maxDHScore}
                            onChange={e => setMaxDHScore(e.target.value)}
                            type="number"></input>
                        <div className={clsx(classes.split, 'hidden sm:block')}></div>
                    </div>
                </div>

                <div className={clsx(classes.filterBox, "ml-0 sm:ml-10")}>
                    <p className={clsx(classes.textGray, 'text-md')}>Days old</p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minAge}
                            onChange={e => setMinAge(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none ml-12 mr-10')} placeholder="Max"
                            value={maxAge}
                            onChange={e => setMaxAge(e.target.value)}
                            type="number"></input>
                        <div className={clsx(classes.split, 'block sm:hidden lg:block')}></div>
                    </div>
                </div>

                <div className={clsx(classes.filterBox, "ml-10 sm:ml-0 lg:ml-10")}>
                    <p className={clsx(classes.textGray, 'text-md')}>Corrected from ATH</p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minATHChange}
                            onChange={e => setMinATHChange(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none ml-12 mr-10')} placeholder="Max"
                            value={maxATHChange}
                            onChange={e => setMaxATHChange(e.target.value)}
                            type="number"></input>
                        <div className={clsx(classes.split, 'hidden sm:block')}></div>
                    </div>
                </div>
                <div className={clsx(classes.filterBox, "ml-0 sm:ml-10")}>
                    <p className={clsx(classes.textGray, 'text-md')}>Daily Price </p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minPriceChange}
                            onChange={e => setMinPriceChange(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.numberInput, 'px-4 py-5 rounded-2 outline-none ml-12 mr-10')} placeholder="Max"
                            value={maxPriceChange}
                            onChange={e => setMaxPriceChange(e.target.value)}
                            type="number"></input>
                        <div className={classes.split}></div>
                    </div>
                </div>
                <div className={clsx(classes.lastfilterBox, "ml-10")}>
                    <p className={clsx(classes.textGray, 'text-md')}>Liq/MC</p>
                    <div className='flex items-center mt-4'>
                        <input className={clsx(classes.lastNumberInput, 'px-4 py-5 rounded-2 outline-none')} placeholder="Min"
                            value={minLiqMC}
                            onChange={e => setMinLiqMC(e.target.value)}
                            type="number"></input>
                        <input className={clsx(classes.lastNumberInput, 'px-4 py-5 rounded-2 outline-none ml-12')} placeholder="Max"
                            value={maxLiqMC}
                            onChange={e => setMaxLiqMC(e.target.value)}
                            type="number"></input>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-auto h-full">
                <Table>
                    <TokensTableHead
                        order={order}
                        onRequestSort={handleRequestSort}
                    />
                    {
                        tokens.length > 0 &&
                        <TableBody>
                            {_.orderBy(
                                tokens.filter(item =>
                                    parseFloat(item.marketcap) >= (!minMarketcap.length ? 0 : parseFloat(minMarketcap)) &&
                                    parseFloat(item.marketcap) <= (!maxMarketcap.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxMarketcap)) &&
                                    parseFloat(item.dh_score) >= (!minDHScore.length ? 0 : parseFloat(minDHScore)) &&
                                    parseFloat(item.dh_score) <= (!maxDHScore.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxDHScore)) &&
                                    parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) >= (!minAge.length ? 0 : parseFloat(minAge)) &&
                                    parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) <= (!maxAge.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxAge)) &&
                                    parseFloat(item.ath_change_percentage) >= (!minATHChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minATHChange)) &&
                                    parseFloat(item.ath_change_percentage) <= (!maxATHChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxATHChange)) &&
                                    parseFloat(item.price_change_24h) >= (!minPriceChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minPriceChange)) &&
                                    parseFloat(item.price_change_24h) <= (!maxPriceChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxPriceChange))
                                ),
                                [
                                    o => {
                                        return o[order.id];
                                    }
                                ],
                                [order.direction]
                            ).slice(page * 10, page * 10 + 10)
                                .map((n, index) => {
                                    return (
                                        <TableRow
                                            // style={index % 2 === 0 ? { background: "#3A3D40" } : { background: "transparent" }}
                                            className={clsx("h-20 cursor-pointer", classes.tableRow)}
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <StyledTableCell component="td" scope="row">
                                                <div className='flex items-center'>
                                                    <Avatar alt="token image" src={n.image} style={{ width: '30px', height: '30px' }} />
                                                    <p className='ml-4 text-white'>{n.name}</p>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                <p className="uppercase">{n.symbol}</p>
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                <NumberFormat value={n.marketcap} displayType={'text'} thousandSeparator={true} prefix='$' />
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                <NumberFormat value={parseFloat(n.dh_score).toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                {n.release_date ? moment(n.release_date).fromNow() : moment('2015/01/01').fromNow()}
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                <p className={n.ath_change_percentage > 0 ? classes.plusText : classes.minusText}>{parseFloat(n.ath_change_percentage).toFixed(2)}%</p>
                                            </StyledTableCell>
                                            <StyledTableCell component="td" scope="row">
                                                <p className={n.price_change_24h > 0 ? classes.plusText : classes.minusText}>{parseFloat(n.price_change_24h).toFixed(2)}%</p>
                                            </StyledTableCell>
                                            {/* <StyledTableCell component="td" scope="row">
                                            {n.liq_mc}%
                                        </StyledTableCell> */}
                                            <StyledTableCell component="td" scope="row">
                                                <div className='flex justify-center w-full items-center'>
                                                    <a target="_blank" rel="noopener noreferrer" href={"https://etherscan.io/token/" + n.contract_address}>
                                                        <img src="/assets/images/link1.png" className='cursor-pointer' alt=""
                                                        ></img>
                                                    </a>
                                                    <a target="_blank" rel="noopener noreferrer" href="https://dextools.io/">
                                                        <img src="/assets/images/link2.png" className='ml-2 cursor-pointer' alt=""
                                                        ></img>
                                                    </a>
                                                    <a target="_blank" rel="noopener noreferrer" href="https://app.uniswap.org/#/swap">
                                                        <img src="/assets/images/link3.png" className='ml-2 cursor-pointer' alt=""
                                                        ></img>
                                                    </a>
                                                </div>
                                            </StyledTableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    }
                </Table>
                {
                    tokens.filter(item =>
                        parseFloat(item.marketcap) >= (!minMarketcap.length ? 0 : parseFloat(minMarketcap)) &&
                        parseFloat(item.marketcap) <= (!maxMarketcap.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxMarketcap)) &&
                        parseFloat(item.dh_score) >= (!minDHScore.length ? 0 : parseFloat(minDHScore)) &&
                        parseFloat(item.dh_score) <= (!maxDHScore.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxDHScore)) &&
                        parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) >= (!minAge.length ? 0 : parseFloat(minAge)) &&
                        parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) <= (!maxAge.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxAge)) &&
                        parseFloat(item.ath_change_percentage) >= (!minATHChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minATHChange)) &&
                        parseFloat(item.ath_change_percentage) <= (!maxATHChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxATHChange)) &&
                        parseFloat(item.price_change_24h) >= (!minPriceChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minPriceChange)) &&
                        parseFloat(item.price_change_24h) <= (!maxPriceChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxPriceChange))
                    ).length > 10 && <div className="flex justify-center pagination w-full">
                        <TablePagination
                            style={{ color: "white" }}
                            className="flex-shrink-0 text-base"
                            component="div"
                            count={tokens.filter(item =>
                                parseFloat(item.marketcap) >= (!minMarketcap.length ? 0 : parseFloat(minMarketcap)) &&
                                parseFloat(item.marketcap) <= (!maxMarketcap.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxMarketcap)) &&
                                parseFloat(item.dh_score) >= (!minDHScore.length ? 0 : parseFloat(minDHScore)) &&
                                parseFloat(item.dh_score) <= (!maxDHScore.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxDHScore)) &&
                                parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) >= (!minAge.length ? 0 : parseFloat(minAge)) &&
                                parseFloat(item.release_date ? (new Date() - new Date(item.release_date)) / (24 * 60 * 60 * 1000) : (new Date() - new Date('2015/01/01')) / (24 * 60 * 60 * 1000)) <= (!maxAge.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxAge)) &&
                                parseFloat(item.ath_change_percentage) >= (!minATHChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minATHChange)) &&
                                parseFloat(item.ath_change_percentage) <= (!maxATHChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxATHChange)) &&
                                parseFloat(item.price_change_24h) >= (!minPriceChange.length ? Number.MIN_SAFE_INTEGER : parseFloat(minPriceChange)) &&
                                parseFloat(item.price_change_24h) <= (!maxPriceChange.length ? Number.MAX_SAFE_INTEGER : parseFloat(maxPriceChange))
                            ).length}
                            rowsPerPage={10}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            rowsPerPageOptions={[]}
                            onChangePage={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </div>
                }
            </div>
        </>
    );
}

export default withRouter(TokensTable);
