import React from 'react';
import { Link } from 'react-router-dom';

import Item from './Item';

export default class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(json => this.setState({
        items: json
      }));
  }

  render() {
    const items = [].concat(this.state.items)
      .sort((a, b) => new Date(b.created.original) - new Date(a.created.original))
      .map((data, i) => <Item key={data._id} content={data}/>);

    let creatable = true;
    let createAction = null;

    if (creatable) {
      createAction = (
        <div class="actions">
          <Link to={'projects/create'} className="action-icon">
            <i class="fa fa-plus" />
          </Link>
        </div>
      )
    }

    return (
      <div class="projects">
        { createAction }
        { items }
      </div>
    );
  }
}
