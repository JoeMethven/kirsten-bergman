import React from 'react';
import { Link } from "react-router-dom";

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

  deleteProject() {
      fetch(`/api/projects/delete/${this.state.data._id}`, {
          method: 'DELETE'
      }).then(res => {
          history.back();
      }).catch(err => new Error(err));
  }

  render() {
    const { data } = this.state;

    let project = null;
    let actions = null;
    let editable = true;
    let deletable = true;

    if (this.state.data) {
      const image = `data:${data.images[0].contentType};base64,${data.images[0].data}`;
      const editAction = <Link to={'edit/' + data._id} class="action-icon"><div class="fa fa-pencil"></div></Link>;
        const deleteAction = <div onClick={this.deleteProject.bind(this)} class="action-icon"><div class="fa fa-trash"></div></div>;

      if (editable || deletable) {
        actions = <div class="actions">{editAction}{deleteAction}</div>
      }

      project = (
          <div className="project">
            {actions}
            <div className="project-image">
              <div style={{backgroundImage: `url(${image})`}}></div>
            </div>
            <div className="project-details card card-sidebar card-no-hover scroll">
              <h3>
                <div>{data.title}</div>
                <span>{data.created.formatted}</span></h3>
              <p>{data.body}</p>
            </div>
          </div>
      );
    }

    return project;
  }
}

export default Project
