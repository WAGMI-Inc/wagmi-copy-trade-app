import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import ConnectedWalletsTableHead from './ConnectedWalletsTableHead';
import { useGlobal } from 'store/hooks';
import NumberFormat from 'react-number-format';
import CopyIcon from '@material-ui/icons/FileCopy';

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

function ConnectedWalletsTable() {
    const classes = useStyles();
    const { connectedWallets } = useGlobal();

    return (
        <div className="flex flex-col overflow-auto">
            <Table>
                <ConnectedWalletsTableHead />
                {
                    connectedWallets.length > 0 &&
                    <TableBody>
                        {
                            connectedWallets.map((n, index) => {
                                return (
                                    <TableRow
                                        className={clsx("h-20 cursor-pointer", classes.tableRow)}
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <StyledTableCell component="td" scope="row">
                                            <div className="flex items-center">
                                                <img src={n.image} alt="" className=' w-16 h-16'></img>
                                                <p className='ml-5 text-white'>{n.name}
                                                </p>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <p className='text-left'>{n.ticker}</p>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className="flex items-center">
                                                <p>{n.contractAddress}</p>
                                                <CopyIcon className='ml-5 text-white' style={{ width: '18px' }}
                                                    onClick={() => { navigator.clipboard.writeText(n.contractAddress) }}
                                                ></CopyIcon>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <NumberFormat value={n.transactions} displayType={'text'} thousandSeparator={true} />
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row">
                                            <div className='flex justify-center w-full items-center'>
                                                <img src="/assets/images/link1.png" alt=""></img>
                                                <img src="/assets/images/link2.png" className='ml-2' alt=""></img>
                                                <img src="/assets/images/link3.png" className='ml-2' alt=""></img>
                                                <img src="/assets/images/link4.png" className='ml-2' alt=""></img>
                                            </div>
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

export default withRouter(ConnectedWalletsTable);
