import './styles/main.scss';
import {createPage, showProjects, sidebarProjectClickListener, newProject, deleteProject, projectRename} from './dom';
import {projects, projectToProjects, createProject, taskToProject, createTask} from './projects';



createPage();
showProjects(projects);
newProject();
sidebarProjectClickListener();
deleteProject();
projectRename();


