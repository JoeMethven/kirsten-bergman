import React from 'react';

import { Link } from "react-router-dom";

class Item extends React.Component {
  render() {
    const { content } = this.props;
    console.log('content', content);

    const image = `data:${content.images[0].contentType};base64,${content.images[0].data}`;

    let edit = false;

    if (edit) {
      edit = <Link to={'edit/' + content.id} class="fa fa-pencil project-icon" />
    }

    return (
      <div>
        <div class="grid">
          {edit}
          <div class="grid-item grid-8 portable-grid-12 portable-grid-v-6">
            <div class="gallery shade">
              <div class="gallery-item">
                <div class="gallery-image" style={{backgroundImage: `url(${image})`}}/>
              </div>
            </div>
          </div>
          <div class="grid-item grid-4 portable-grid-12 portable-grid-v-6 card card-sidebar card-no-hover scroll">
            <h3>{content.title}</h3>
            <p>{content.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Item
