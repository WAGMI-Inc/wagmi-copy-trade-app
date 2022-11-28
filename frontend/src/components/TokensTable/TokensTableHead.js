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
        align: 'left',
        label: 'Token Name',
        sort: false,
    },
    {
        id: 'symbol',
        align: 'left',
        label: 'Ticker',
        sort: false,
    },
    {
        id: 'marketcap',
        align: 'left',
        label: 'Marketcap',
        sort: true,
    },
    {
        id: 'dh_score',
        align: 'left',
        label: 'DH Score',
        sort: true,
    },
    {
        id: 'release_date',
        align: 'left',
        label: 'Age',
        sort: true,
    },
    {
        id: 'ath_change_percentage',
        align: 'left',
        label: 'From ATH%',
        sort: true,
    },
    {
        id: 'price_change_24h',
        align: 'left',
        label: 'Daily Price%',
        sort: true,
    },
    // {
    //     id: 'liq_mc',
    //     align: 'left',
    //     label: 'Liq/MC',
    //     sort: true,
    // },
    {
        align: 'center',
        label: '',
        sort: true,
    },
];

function TokensTableHead(props) {

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

export default TokensTableHead;
