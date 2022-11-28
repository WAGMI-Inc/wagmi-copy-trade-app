import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import TokensTableHead from './TwitterStatesTableHead';
import { useGlobal } from 'store/hooks';
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

function TwitterStatsTable() {
    const classes = useStyles();
    const { twitterStats } = useGlobal();

    return (
        <div className="flex flex-col overflow-auto mt-16 mb-8">
            <Table>
                <TokensTableHead />
                {
                    twitterStats.length > 0 &&
                    <TableBody>
                        {
                            twitterStats.map((n, index) => {
                                return (
                                    <TableRow
                                        className={clsx("h-20 cursor-pointer", classes.tableRow)}
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <StyledTableCell component="td" scope="row">
                                            {n.hashtags}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className="flex items-center justify-center">
                                                <NumberFormat value={n.tweets} displayType={'text'} thousandSeparator={true} />
                                                <p className={clsx(n.tweets_change > 0 ? classes.plusText : classes.minusText, 'text-xs ml-5')}>
                                                    {n.tweets_change}%
                                                </p>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.likes} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.comments} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.retweets} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                }
            </Table>
        </div>
    );
}

export default withRouter(TwitterStatsTable);
