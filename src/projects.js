//Create empty array for holding Projects
const projects = [];

//Project factory function for creating new Projects
const createProject = (name) => {
    return {
        name, 
        tasks: [],
    }
}

//Delete Project from [Projects]
const eraseProject = (index) => {
    projects.splice(index,1);
}
//Renaming Proejct
const renameProject = (newname, projectID) => {
    projects[projectID].name = newname;
}
//Put Project to [Projects] aggregator array
const projectToProjects = (project) => {
    projects.unshift(project);
}

//Task factory function for creating new Tasks
const createTask = (title, description, duedate) => {

    return{
        title,
        description,
        duedate,
        flag: 'upcoming'
    }
}
//Put Task in corresponding Project [tasks] array
const taskToProject = (task, projectIndex) => {
    projects[projectIndex].tasks.push(task);
}
//Task rename
const renameTask = (newTitle, projectIndex, taskIndex) => {
    projects[projectIndex].tasks[taskIndex].title = newTitle;
}
//Erasing task
const eraseTask = (projectIndex, taskIndex) => {
    projects[projectIndex].tasks.splice(taskIndex,1);
}






export {
    projects, 
    createProject, 
    eraseProject,
    renameProject,
    projectToProjects, 
    createTask,
    renameTask,
    eraseTask, 
    taskToProject

}