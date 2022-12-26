import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useUser } from 'store/hooks';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ExitToApp } from '@material-ui/icons';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ConnectWalletModal from 'components/ConnectWalletModal';
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles(() => ({
    button: {
        borderRadius: '12px',
    },
    paper: {
        backgroundColor: '#494B4F'
    },
    menuItem: {
        padding: '6px 25px',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)'
        },
        "& .MuiTouchRipple-root span": {
            backgroundColor: 'rgba(255,255,255,0.7)'
        }
    }
}));

function UserMenu() {
    const classes = useStyles();
    const [userMenu, setUserMenu] = useState(null);
    const [showDlg, setShowDlg] = useState(false);
    const { logOut } = useUser();
    const { account } = useWeb3React();
    const history = useHistory();

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    const handleLogout = async () => {
        setUserMenu(null);
        await logOut();
        history.go(0);
    }

    const onClickAccount = () => {
        if (account && account.length > 0) {

        }
        else
            setShowDlg(true);
    }

    return (
        <>
            <Button className={clsx(classes.button, "min-w-40 px-0 md:px-16 py-0 md:py-6")} onClick={userMenuClick}>
                <Avatar className="mx-4" alt="user photo" src={'/assets/images/avatar.png'} />
            </Button>
            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: clsx('py-4', classes.paper)
                }}
            >
                <MenuItem
                    onClick={() => onClickAccount()}
                    className={classes.menuItem}
                >
                    <ListItemIcon style={{ minWidth: '35px' }}>
                        <WalletIcon className='text-white'></WalletIcon>
                    </ListItemIcon>
                    <ListItemText className='text-white' primary={account && account.length > 0 ? account.substring(0, 6) + '...' + account.substring(account.length - 4) : "Add Account"} />
                </MenuItem>
                <MenuItem
                    onClick={() => handleLogout()}
                    className={classes.menuItem}
                >
                    <ListItemIcon style={{ minWidth: '35px' }}>
                        <ExitToApp className='text-white'></ExitToApp>
                    </ListItemIcon>
                    <ListItemText className='text-white' primary="Logout" />
                </MenuItem>
            </Popover>
            <ConnectWalletModal setShowDlg={setShowDlg} showDlg={showDlg}></ConnectWalletModal>
        </>
    );
}

export default UserMenu;
