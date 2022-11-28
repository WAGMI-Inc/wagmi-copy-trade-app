import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useGlobal } from 'store/hooks';
import Navbar from 'components/Navbar';

const navbarWidth = 250;

const useStyles = makeStyles(theme => ({
    wrapper: {
        flexDirection: 'column',
        zIndex: 20,
    },
    navbar: {
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        flex: '1 1 auto',
        width: navbarWidth,
        minWidth: navbarWidth,
        height: '100%',
        zIndex: 20,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create(['width', 'min-width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        }),
        left: 0,
        [theme.breakpoints.down('md')]: {
            [theme.breakpoints.up('sm')]: {
                width: 64,
                minWidth: 64,
            }
        }
    },
    foldedAndOpened: {
        width: navbarWidth,
        minWidth: navbarWidth
    },
    navbarContent: {
        flex: '1 1 auto'
    },
    foldedAndClosed: {
        [theme.breakpoints.down('md')]: {
            [theme.breakpoints.up('sm')]: {
                '& $navbarContent': {
                    '& .logo-icon': {
                        width: '50px !important',
                    },
                    '& .logo-text': {
                        display: 'none',
                    },
                    '& .list-item-text, & .arrow-icon, & .item-badge': {
                        display: 'none',
                    },
                    '& .user': {
                        '& .username, & .email': {
                            opacity: 0
                        },
                        '& .avatar': {
                            width: 40,
                            height: 40,
                            top: 32,
                            padding: 0
                        }
                    },
                }
            }
        }
    }
}));

function NavbarWrapper() {
    const classes = useStyles();
    const { showNavBar, foldOpen, setFoldOpen, showMobileNav, setShowMobileNav } = useGlobal();

    return (
        <>
            {
                showNavBar &&
                <div className={clsx(classes.wrapper, 'hidden sm:block')}>
                    <div
                        className={clsx(
                            classes.navbar,
                            foldOpen && classes.foldedAndOpened,
                            !foldOpen && classes.foldedAndClosed
                        )}
                        onMouseEnter={() => !foldOpen && setFoldOpen(true)}
                        onMouseLeave={() => foldOpen && setFoldOpen(false)}
                    >
                        <Navbar className={classes.navbarContent} />
                    </div>
                </div>
            }
            <div className={clsx(classes.wrapper, 'h-screen block sm:hidden')}>
                <SwipeableDrawer
                    anchor="left"
                    variant="temporary"
                    open={showMobileNav}
                    classes={{
                        paper: classes.navbar
                    }}
                    onClose={() => setShowMobileNav(false)}
                    onOpen={() => { }}
                    disableSwipeToOpen
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <Navbar className={classes.navbarContent} />
                </SwipeableDrawer>
            </div>
        </>
    );
}

export default React.memo(NavbarWrapper);
