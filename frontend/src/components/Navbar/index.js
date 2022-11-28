import React from 'react';
import Logo from 'components/Logo';
import Navigation from 'components/Navigation';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#161616',
    },
    content: {
        overflowX: 'hidden',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        backgroundColor: '#161616',
        backgroundAttachment: 'local, scroll'
    },
}));

function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={clsx('flex flex-col overflow-hidden h-full', classes.root, props.className)}>
            <div className="flex flex-row items-center flex-shrink px-8">
                <div className="flex flex-1 min-h-40 w-full">
                    <Logo />
                </div>
            </div>

            <Navigation layout="vertical" />
        </div>
    );
}

export default React.memo(Navbar);
