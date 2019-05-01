import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '../style/style.sass';

import Layout from '../view/decorators/Layout'

const root = document.getElementById('root')

ReactDOM.render(<Router><Layout/></Router>, root)
