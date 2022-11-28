import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#161616',
        color: 'white',
    },
    avatar: {
        width: 72,
        height: 72,
        position: 'absolute',
        bottom: 0,
        padding: 8,
        background: '#121212',
        boxSizing: 'content-box',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        transition: 'all 300ms ease-in-out',
        '& > img': {
            borderRadius: '50%'
        }
    }
}));

function UserNavbarHeader() {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.root, "user relative flex flex-col items-center justify-center pt-16 pb-40 mb-24 z-0")}
        >
            <Avatar
                className={clsx(classes.avatar, 'avatar')}
                alt="user photo"
                src={'/assets/images/avatar.png'}
            />
        </div>
    );
}

export default UserNavbarHeader;
