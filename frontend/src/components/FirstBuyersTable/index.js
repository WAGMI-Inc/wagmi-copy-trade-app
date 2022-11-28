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
import FirstBuyersTableHead from './FirstBuyersTableHead';
import { useGlobal } from 'store/hooks';
import TablePaginationActions from 'components/TablePaginationActions'
import CopyIcon from '@material-ui/icons/FileCopy';
import NumberFormat from 'react-number-format';

const StyledTableCell = withStyles(() =>
    createStyles({
        body: {
            color: "white",
            fontWeight: '500',
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            whiteSpace: "nowrap",
            padding: '0.5rem',
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

function FirstBuyersTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: 'id'
    });

    const { firstBuyers } = useGlobal();

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
                <FirstBuyersTableHead
                    order={order}
                    onRequestSort={handleRequestSort}
                />
                {
                    firstBuyers.length > 0 &&
                    <TableBody>
                        {_.orderBy(
                            firstBuyers,
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
                                            {n.order}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className="flex items-center">
                                                <p>{n.walletAddress}</p>
                                                <CopyIcon className='ml-5 text-white' style={{ width: '18px' }}
                                                    onClick={() => { navigator.clipboard.writeText(n.walletAddress) }}
                                                ></CopyIcon>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.holding} displayType={'text'} thousandSeparator={true} suffix='%' />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.amountSold} displayType={'text'} thousandSeparator={true} prefix='$' />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            {n.walletAge}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <p className='text-center'><NumberFormat value={n.dhScore} displayType={'text'} thousandSeparator={true} /></p>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <p className='text-center'><NumberFormat value={n.fromCex} displayType={'text'} thousandSeparator={true} suffix=' CEX' /></p>
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                }
            </Table>
            {
                firstBuyers.length > 10 && <div className="flex justify-center mt-auto pagination w-full">
                    <TablePagination
                        style={{ color: "white" }}
                        className="flex-shrink-0 text-base"
                        component="div"
                        count={firstBuyers.length}
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

export default withRouter(FirstBuyersTable);
