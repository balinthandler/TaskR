//Create empty array for holding Projects
const projects = [];
//Task factory function for creating new Tasks
const createTask = (title, description, duedate) => {
    return{
        title,
        description,
        duedate
    }
}
//Project factory function for creating new Projects
const createProject = (name, color) => {
    return {
        name, 
        color,
        tasks: []
    }
}
//Put Task in corresponding Project [tasks] array
const taskToProject = (task, project) => {
    project.tasks.push(task);
}
//Put Project to [Projects] aggregator array
const projectToProjects = (project) => {
    projects.push(project)
}
//Delete Project from [Projects]
const eraseProject = (project) => {
    const pos = projects.indexOf(project);
    projects.splice(pos,pos+1);
}




export {projects, createProject, projectToProjects, taskToProject, createTask}