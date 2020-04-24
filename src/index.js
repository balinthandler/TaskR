import './styles/main.scss';
import {createPage, showProjects, showProject, showTasks} from './dom';
import {projects, projectToProjects, createProject, taskToProject, createTask} from './projects';


let proj = createProject('first', 'blue');
let proj2 = createProject('Take out the trash', 'blue');
let task1 = createTask('My first task', 'Very long description comes here as well as other important stuff.', '2020.05.05')
let tsk1 = createTask('virágszállítás', 'elvinni a-ból b-be', 'ma')
taskToProject(task1,proj);
taskToProject(tsk1,proj);

projectToProjects(proj);
projectToProjects(proj2);

createPage();
showProjects(projects);
showProject(projects[0]);
showTasks(proj);

