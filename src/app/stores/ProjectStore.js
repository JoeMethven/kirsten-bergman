import data from '../../data/projects.json'
import { EventEmitter } from "events";

class ProjectStore extends EventEmitter {
  constructor() {
    super()
    this.projects = data;
  }

  getProjectFromId(id) {
    let pos = this.projects.map(x => x.id).indexOf(parseInt(id));
    return this.projects[pos];
  }

  getAll() {
    return this.projects;
  }
}

const projectStore = new ProjectStore;
export default projectStore;
