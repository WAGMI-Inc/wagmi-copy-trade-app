import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: "#232323",
            color: "#B9B9B9",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontWeight: "medium",
            border: 'none',
            padding: "0.5rem",
            ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                padding: "0.7rem",
            },
        },
    }),
)(TableCell);

const rows = [
    {
        align: 'left',
        label: 'Telegram Group',
        sort: false,
    },
    {
        align: 'center',
        label: 'Members',
        sort: false,
    },
    {
        align: 'center',
        label: 'Comments',
        sort: false,
    },
    {
        align: 'center',
        label: 'Member increase',
        sort: false,
    }
];

function TelegramStatsTableHead() {
    return (
        <TableHead>
            <TableRow className="h-12">
                {rows.map((row, index) => {
                    return (
                        <StyledTableCell
                            key={index}
                            align={row.align}
                        >
                            {row.label}
                        </StyledTableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default TelegramStatsTableHead;
