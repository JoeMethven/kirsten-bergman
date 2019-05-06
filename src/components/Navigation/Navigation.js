import React from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active"><i class="fa fa-heart"></i></NavLink>
          </li>
          <li>
            <NavLink to="/projects" activeClassName="active"><i class="fa fa-photo"></i></NavLink>
          </li>
          <li>
            <NavLink to="/literature" activeClassName="active"><i class="fa fa-pencil"></i></NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active"><i class="fa fa-user"></i></NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
