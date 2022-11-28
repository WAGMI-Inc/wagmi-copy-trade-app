import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        '& .logo-icon': {
            width: 100,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        },
    },
}));

function Logo() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, 'flex items-end w-full justify-center')}>
            <img className="logo-icon" src="assets/images/logo.png" alt="logo" />
        </div>
    );
}

export default Logo;
