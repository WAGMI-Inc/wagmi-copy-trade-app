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
            backgroundColor: "transparent",
            color: "#B9B9B9",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontWeight: "medium",
            border: "none",
            padding: "0 4px 10px",
            ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                padding: "0 4px 10px",
            },
        },
    }),
)(TableCell);

const rows = [
    {
        id: 'hash',
        align: 'left',
        label: 'TxHash',
        sort: false,
    },
    {
        id: 'from',
        align: 'left',
        label: 'From',
        sort: false,
    },
    {
        id: 'type',
        align: 'left',
        label: 'Tx Type',
        sort: true,
    },
    {
        id: 'value',
        align: 'left',
        label: 'Amount',
        sort: true,
    },
    {
        id: 'date',
        align: 'left',
        label: 'Date',
        sort: true,
    },
];

function TransactionTableHead(props) {

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-12">
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
                                <span className="pt-1 text-sm">
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

export default TransactionTableHead;
