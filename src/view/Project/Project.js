import React from 'react';

import Item from './Item';
import ProjectStore from "../../app/stores/ProjectStore";

class Project extends React.Component {
  render() {
    const projectId = this.props.match.params.id,
          project = ProjectStore.getProjectFromId(projectId);

    console.log('projectId', projectId, project);

    return (
      <Item key={projectId} content={project} />
    );
  }
}

export default Project
