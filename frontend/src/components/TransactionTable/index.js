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
import TransactionTableHead from './TransactionTableHead';
import TablePaginationActions from 'components/TablePaginationActions'
import NumberFormat from 'react-number-format';
import { useUser } from 'store/hooks';
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
}));

function TransactionTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'id'
    });

    const { userTransactions } = useUser();

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
                <TransactionTableHead
                    order={order}
                    onRequestSort={handleRequestSort}
                />
                {
                    userTransactions.length > 0 &&
                    <TableBody>
                        {_.orderBy(
                            userTransactions,
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
                                        className={clsx("h-20 cursor-pointer", classes.tableRow)}
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <StyledTableCell component="td" scope="row">
                                            <a href={"https://goerli.etherscan.io/tx/" + n.hash} target="_blank">{n.hash.substring(0, 16)}...</a>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            {n.to.substring(0, 4)}...{n.to.substring(n.to.length - 4, n.to.length)}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            {
                                                n.type === "Deposit" ?
                                                    <p className={classes.plusText}>Deposit</p> :
                                                    <p className={classes.minusText}>Withdraw</p>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            {n.value}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            {n.date ? moment(n.date).fromNow() : moment('2015/01/01').fromNow()}
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                }
            </Table>
            {
                userTransactions.length > 10 && <div className="flex justify-center pagination w-full">
                    <TablePagination
                        style={{ color: "white" }}
                        className="flex-shrink-0 text-base"
                        component="div"
                        count={userTransactions.length}
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
    );
}

export default withRouter(TransactionTable);
