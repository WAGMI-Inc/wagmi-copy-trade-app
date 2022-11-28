import { useDispatch, useSelector } from "react-redux";
import { GLOBAL } from "../types";

export const useGlobal = () => {
    const dispatch = useDispatch();
    const { isProgressing, showNavBar, showMobileNav, foldOpen, connectedWallets, firstBuyers, blocklists, recentTrades,
        tradeList, followings, twitterStats, telegramStats, navText, avatars } = useSelector(({ global }) => global);

    const changeProgressState = (payload) => {
        dispatch({
            type: GLOBAL.PROGRESS_CHANGE,
            payload
        });
        return true;
    };

    const setShowNavbar = (payload) => {
        dispatch({ type: GLOBAL.SET_SHOW_NAVBAR, payload });
        return true;
    }

    const setFoldOpen = (payload) => {
        dispatch({ type: GLOBAL.SET_FOLD_OPEN, payload });
        return true;
    }

    const setShowMobileNav = (payload) => {
        dispatch({ type: GLOBAL.SET_SHOW_MOBILE_NAV, payload });
        return true;
    }

    const setNavText = (payload) => {
        dispatch({ type: GLOBAL.SET_NAV_TEXT, payload });
        return true;
    }

    return {
        avatars,
        isProgressing,
        showNavBar,
        showMobileNav,
        foldOpen,
        navText,
        twitterStats,
        telegramStats,
        connectedWallets,
        firstBuyers,
        blocklists,
        recentTrades,
        followings,
        tradeList,
        setNavText,
        changeProgressState,
        setShowNavbar,
        setFoldOpen,
        setShowMobileNav,
    };
};
