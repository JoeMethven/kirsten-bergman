import React from "react";

import Item from "./Item";
// import ProjectStore from "../../app/stores/ProjectStore";

export default class Gallery extends React.Component {
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
    const items = this.state.items
      .sort((a, b) => a.created < b.created)
      .map((data, i) => <Item key={data._id} content={data}/>);

    return (
      <div class="horizontal">
        {items}
      </div>
    );
  }
}
