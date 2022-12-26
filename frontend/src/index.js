import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Pages from './pages/index'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

import 'typeface-muli';
import './styles/index.css';

function getLibrary(provider) {
    return new Web3(provider)
}

ReactDOM.render(
    <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Router>
                <Pages />
            </Router>
        </Web3ReactProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
