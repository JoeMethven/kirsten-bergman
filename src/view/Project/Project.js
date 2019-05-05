import React from 'react';

import Item from './Item';

class Project extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    fetch(`/api/projects/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(json => {
          console.log('json', json);

          this.setState({
            data: json
          })
        });
  }

  render() {
    let item = null;

    console.log('this.state.data', this.state.data);

    if (this.state.data) {
      item = <Item key={this.props.match.params.id} content={this.state.data} />;
    }

    return item;
  }
}

export default Project
