import _ from 'lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import RecentTradesTableHead from './RecentTradesTableHead';
import { useGlobal } from 'store/hooks';
import TablePaginationActions from 'components/TablePaginationActions'
import NumberFormat from 'react-number-format';

const StyledTableCell = withStyles(() =>
    createStyles({
        body: {
            color: "white",
            fontWeight: '500',
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            whiteSpace: "nowrap",
            padding: '0.5rem',
            textAlign: 'center',
            verticalAlign: 'center',
            ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                padding: '0.7rem'
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
    }
}));

function RecentTradesTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'id'
    });

    const { recentTrades } = useGlobal();

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
        <div className="flex flex-col overflow-auto h-full">
            <Table>
                <RecentTradesTableHead
                    order={order}
                    onRequestSort={handleRequestSort}
                />
                {
                    recentTrades.length > 0 &&
                    <TableBody>
                        {_.orderBy(
                            recentTrades,
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
                                            {n.wallet}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className='flex items-center w-full justify-center'>
                                                {
                                                    n.pl > 0 ? <>
                                                        <p className={classes.plusText}>{n.pl}%</p>
                                                        <img src="/assets/images/walletUpState.png" alt="" className='ml-1'></img>
                                                    </> :
                                                        <>
                                                            <p className={classes.minusText}>{Math.abs(n.pl)}%</p>
                                                            <img src="/assets/images/walletDownState.png" alt="" className='ml-1'></img>
                                                        </>
                                                }
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.tradeVolume} displayType={'text'} thousandSeparator={true} prefix='$' />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.gasFee} displayType={'text'} thousandSeparator={true} prefix='$' />
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                }
            </Table>
            {
                recentTrades.length > 10 && <div className="flex justify-center mt-auto pagination w-full">
                    <TablePagination
                        style={{ color: "white" }}
                        className="flex-shrink-0 text-base"
                        component="div"
                        count={recentTrades.length}
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
        </div >
    );
}

export default withRouter(RecentTradesTable);
