import React from "react";

import Item from "./Item";
import ProjectStore from "../../app/stores/ProjectStore";

export default class Gallery extends React.Component {
  constructor() {
    super()
    this.state = {
      items: ProjectStore.getAll()
    }
  }

  render() {
    const items = this.state.items
      .sort((a, b) => a.id < b.id)
      .map((data, i) => <Item key={data.id} content={data}/>);

    return (
      <div class="horizontal">
        {items}
      </div>
    );
  }
}
