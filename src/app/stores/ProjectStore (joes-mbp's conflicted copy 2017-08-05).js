import { EventEmitter } from "events";

class ProjectStore extends EventEmitter {
  constructor() {
    super()
    this.projects = [
      {
        id: 1,
        title: 'Title 1',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        images: ['img/001.jpg', 'img/002.jpg'],
        date: '29/03/16',
        featuredImage: {
          image: 'img/001.jpg',
          style: {
            marginTop: '-105px'
          }
        }
      },
      {
        id: 2,
        title: 'Title 2',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        images: ['img/002.jpg', 'img/003.jpg'],
        date: '04/04/16',
        featuredImage: {
          image: 'img/002.jpg',
          style: {
            marginTop: '-105px'
          }
        }
      }
    ];
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
