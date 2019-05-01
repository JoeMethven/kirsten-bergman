import React from "react";
import { Link } from "react-router-dom";

export default class Item extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {content} = this.props;
    let description = this.props.content.info,
        project = "gallery/" + content.id;

    return (
      <div class="grid-item grid-3 laptop-grid-4 portable-grid-11 gallery">
        <div class="project card">
          <Link to={project} class="gallery-item">
            <div class="gallery-image gallery-image-with-info" style={{backgroundImage: "url(" + content.featuredImage.image + ")"}}></div>
            <div class="gallery-info">
              <h3> <div>{content.title}</div> <span>{content.date}</span></h3>
              <p>{description}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
