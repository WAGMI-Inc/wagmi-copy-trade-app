import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: "#232323",
            color: "#B9B9B9",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontWeight: "medium",
            border: 'none',
            textTransform: 'uppercase',
            padding: "0.3rem",
            ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                padding: "0.5rem",
            },
        },
    }),
)(TableCell);

const rows = [
    {
        id: 'wallet',
        align: 'center',
        label: 'Wallets',
        sort: false,
    },
    {
        id: 'pl',
        align: 'center',
        label: 'P/L',
        sort: true,
    },
    {
        id: 'tradeVolume',
        align: 'center',
        label: 'Trade Volume (DAY)',
        sort: true,
    },
    {
        id: 'gasFee',
        align: 'center',
        label: 'Gas Fees (DAY)',
        sort: true,
    },
];

function RecentTradesTableHead(props) {

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="rounded-6">
                {rows.map((row, index) => {
                    return (
                        <StyledTableCell
                            key={index}
                            align={row.align}
                        >
                            {row.sort ? (
                                <Tooltip
                                    title={"Sort By " + row.label}
                                    placement='bottom-start'
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        className="text-sm"
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            ) : (
                                <span className="text-sm">
                                    {row.label}
                                </span>
                            )}
                        </StyledTableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default RecentTradesTableHead;
