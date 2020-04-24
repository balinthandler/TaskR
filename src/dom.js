
const createPage = () => {
    const body = document.querySelector('body');
    //Header
    const header = document.createElement('div');
        header.id = 'header';
        body.appendChild(header);
    //Container
    const container = document.createElement('div');
        container.id = 'container';
        body.appendChild(container);
        //Projects sidebar
        const sidebar = document.createElement('div');
            sidebar.id = 'sidebar';
            container.appendChild(sidebar);
            const label = document.createElement('label');
            label.id = 'titleLabel';
            label.textContent = 'Projects';
            sidebar.appendChild(label);
            //Main container
            const main = document.createElement('div');
            main.id = 'main';
            container.appendChild(main);
            //Navbar
            const navbar = document.createElement('div');
            navbar.id = 'navbar';
            main.appendChild(navbar);
                //Navbar buttons
                const upcoming = document.createElement('button');
                const completed = document.createElement('button');
                const all = document.createElement('button');
                upcoming.classList.add('navButtons');
                completed.classList.add('navButtons');
                all.classList.add('navButtons');
                upcoming.id = 'upcoming';
                completed.id = 'completed';
                all.id = 'all';
                upcoming.textContent = 'Show Upcoming';
                completed.textContent = 'Show Completed';
                all.textContent = 'Show All';
                navbar.appendChild(upcoming);
                navbar.appendChild(completed);
                navbar.appendChild(all);
            //Content
            const content = document.createElement('div');
            content.id = 'content';
            main.appendChild(content);
}

//Show Projects in sidebar        
const showProjects = (projects) => {
    const sidebar = document.querySelector('#sidebar');
    const addProject = document.createElement('button');
    addProject.id = 'addProject';
    addProject.textContent = '+';
    sidebar.appendChild(addProject);
    projects.forEach(e => {
        const element = document.createElement('span');
        element.classList.add('projectsElements');
        element.innerHTML = e.name;
        sidebar.appendChild(element);    
    })

}
//Show Tasks inside selected Project
const showProject = (project) => {
    const content = document.querySelector('#content');
    const projectNameContainer = document.createElement('div');
    projectNameContainer.id = 'projectNameContainer';
    const delProject = document.createElement('button');
    delProject.id = 'delProject';
    delProject.textContent = '-';
    const projectH1 = document.createElement('h1');
    projectH1.textContent = project.name;
    projectNameContainer.appendChild(delProject);
    projectNameContainer.appendChild(projectH1);
    content.appendChild(projectNameContainer);

    
    
    
}
const showTasks = (project) => {
    project.tasks.forEach(e => {
        let taskContainer = document.createElement('div')
        taskContainer.id = 'taskContainer';
        taskContainer.innerHTML = e.title;

        content.appendChild(taskContainer);
    })
}


export {createPage, showProjects, showProject, showTasks}