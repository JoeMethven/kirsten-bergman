import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './style/style.sass';

import Layout from './view/decorators/Layout';

const root = document.getElementById('root');
const history = createBrowserHistory();

ReactDOM.render(<Router history={history}><Layout/></Router>, root);