import React from "react";
import { Link } from "react-router-dom";

export default class Item extends React.Component {
  render() {
    const { content } = this.props;
    let image = content.images.length ? `data:${content.images[0].contentType};base64,${content.images[0].data}` : null,
        project = "projects/" + content._id;

    return (
      <Link to={project} class="projects-item card">
        <div className="projects-image" style={image ? {backgroundImage: `url(${image})`} : {}}/>
        <div className="projects-info">
          <h3>
            <div>{content.title}</div>
            <span>{content.created.formatted}</span></h3>
          <p>{content.excerpt}</p>
        </div>
      </Link>
    );
  }
}
