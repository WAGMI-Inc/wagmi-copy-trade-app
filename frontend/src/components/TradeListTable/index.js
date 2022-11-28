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
import TradeListTableHead from './TradeListTableHead';
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

function TradeListTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'id'
    });

    const { tradeList } = useGlobal();

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
                <TradeListTableHead
                    order={order}
                    onRequestSort={handleRequestSort}
                />
                {
                    tradeList.length > 0 &&
                    <TableBody>
                        {_.orderBy(
                            tradeList,
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
                                                <img src={n.image} alt="" className='w-20 mr-4'></img>
                                                <div className='flex flex-col items-start'>
                                                    <p className='font-medium'>{n.name}</p>
                                                    <p className='text-gray'>{n.ticker}</p>
                                                </div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <p className="flex justify-start">{n.address}</p>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className='flex items-center w-full'>
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
                                            <NumberFormat value={n.numberofTrades} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.projectTraded} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                }
            </Table>
            {
                tradeList.length > 10 && <div className="flex justify-center mt-auto pagination w-full">
                    <TablePagination
                        style={{ color: "white" }}
                        className="flex-shrink-0 text-base"
                        component="div"
                        count={tradeList.length}
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

export default withRouter(TradeListTable);
