import {
    projects, 
    createProject, 
    eraseProject,
    renameProject,
    projectToProjects, 
    createTask, 
    renameTask,
    eraseTask,
    taskToProject
} from './projects';

let activeProjectID = '';
let taskFilter = 'upcoming';
//Creating Main Page
const createPage = () => {
    const body = document.querySelector('body');
    //Header
    const header = document.createElement('div');
        header.id = 'header';
        header.textContent = 'TaskR';
        body.appendChild(header);

    //Container
    const container = document.createElement('div');
        container.id = 'container';
        body.appendChild(container);
        //Projects sidebar
        const sidebar = document.createElement('div');
            sidebar.id = 'sidebar';
            container.appendChild(sidebar);
        //Main container
        const main = document.createElement('div');
        main.id = 'main';
        container.appendChild(main);
            const content = document.createElement('div');
            content.id = 'content';
            main.appendChild(content);
}
//Display Projects in sidebar        
const showProjects = () => {
    const sidebar = document.querySelector('#sidebar');
        sidebar.innerHTML = '';
    const label = document.createElement('label');
        label.id = 'titleLabel';
        label.textContent = 'Projects';
        sidebar.appendChild(label);
    const addProject = document.createElement('button');
        addProject.id = 'addProject';
        addProject.textContent = '+';
        sidebar.appendChild(addProject);
    projects.forEach(e => {
        const element = document.createElement('span');
            element.classList.add('projectsElements');
            element.textContent = e.name;
            element.setAttribute('data-index', projects.indexOf(e));
            sidebar.appendChild(element);    
    })
}

//Display selected Project
const showSelectedProject = (projectIndex) => {
        const content = document.querySelector('#content');
        content.innerHTML = '';
        const projectNameContainer = document.createElement('div');
            projectNameContainer.id = 'projectNameContainer';
        const delProject = document.createElement('button');
            delProject.id = 'delProject';
            delProject.textContent = '-';
            delProject.setAttribute('data-index', projectIndex);
        const projectH1 = document.createElement('input');
        projectH1.value = projects[projectIndex].name;
        projectH1.id = 'projectTitle';
        projectH1.setAttribute('spellcheck', false);
        projectH1.setAttribute('data-index', projectIndex);
        projectNameContainer.appendChild(delProject);
        projectNameContainer.appendChild(projectH1);
        content.appendChild(projectNameContainer);

    //Navbar
    const navbar = document.createElement('div');
        navbar.id = 'navbar';
        content.appendChild(navbar);
    //Add Task Button
    const addTask = document.createElement('button');
        addTask.textContent = 'Add Task';
        addTask.id = 'addTask';
        addTask.classList.add('navButtons')
        navbar.appendChild(addTask);
        //Upcoming Button
    const upcoming = document.createElement('button');
        upcoming.classList.add('navButtons');
        upcoming.id = 'upcoming';
        upcoming.innerHTML = '&#9744; Show Upcoming';
        navbar.appendChild(upcoming);
    //Completed Button
    const completed = document.createElement('button');
        completed.classList.add('navButtons');
        completed.id = 'completed';
        completed.innerHTML = '&#9745; Show Completed';
        navbar.appendChild(completed);
    //All Button
    const all = document.createElement('button');
        all.classList.add('navButtons');
        all.id = 'all';
        all.innerHTML = '&#9776; Show All';
        navbar.appendChild(all);
        showTasks(projects[projectIndex]);
        showTaskDetails(projects[projectIndex]);
        deleteTask();
        newTask();
        completeTask();

}

//EventListener on Sidebar Project Items
const sidebarProjectClickListener = () => {customEventListener('.projectsElements', 'click', () =>{
    const projectsElements = document.querySelectorAll('.projectsElements');
        projectsElements.forEach(e => e.addEventListener('click', () => {
            showSelectedProject(e.getAttribute('data-index'));
            activeProjectID = e.getAttribute('data-index');
        }));
    })
}

//Rename Project with input field 
const projectRename = () => {customEventListener('#projectTitle', 'keyup', () =>{
    if (event.keyCode == 13) {
        const inp = document.querySelector('#projectTitle');
        if (inp.value != '') {
        renameProject(inp.value, inp.getAttribute('data-index'));
        showProjects();
        }else{
            alert('Can\'t be empty!');
        }
    }
})}

//Display Tasks inside selected Project
const showTasks = (project) => {
    project.tasks.forEach(e => {
        if (e.flag == taskFilter){

        const taskAndDetailsHolder = document.createElement('div');
            taskAndDetailsHolder.classList.add('taskAndDetailsHolder');
        const taskContainer = document.createElement('div');
            taskContainer.classList.add('taskContainer');
            taskContainer.setAttribute('data-index', project.tasks.indexOf(e));
        const isDoneIcon = document.createElement('button');
            isDoneIcon.setAttribute('type', 'checkbox');
            isDoneIcon.classList.add('isDone');
            isDoneIcon.innerHTML = '&#10004';
        const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkboxContainer');
            checkboxContainer.setAttribute('data-index', project.tasks.indexOf(e));
        const taskTitle = document.createElement('span');
            taskTitle.setAttribute('data-taskindex', project.tasks.indexOf(e));
            taskTitle.textContent = e.title;
            taskTitle.classList.add('taskTitle');
            taskTitle.setAttribute('spellcheck', false);
            taskTitle.setAttribute('contenteditable', 'true');
            taskTitle.setAttribute('data-index', project.tasks.indexOf(e));
        const eraseTaskIcon = document.createElement('button');
            eraseTaskIcon.classList.add('eraseTask');
            eraseTaskIcon.textContent= '-';
        const eraseTaskHolder = document.createElement('span');
            eraseTaskHolder.classList.add('eraseTaskHolder');
        const taskDetails = document.createElement('span');
            taskDetails.classList.add('taskDetails');
            taskDetails.setAttribute('data-index', project.tasks.indexOf(e));
        const detailText = document.createElement('p');
            detailText.innerHTML = e.description;
            detailText.classList.add('detailText');
            detailText.setAttribute('data-index', project.tasks.indexOf(e));
            detailText.setAttribute('spellcheck', false);
            detailText.setAttribute('contenteditable', 'true');


        //Appending Elements to Content
        eraseTaskHolder.appendChild(eraseTaskIcon);
        checkboxContainer.appendChild(isDoneIcon);
        taskContainer.appendChild(eraseTaskHolder);
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(checkboxContainer);
        taskAndDetailsHolder.appendChild(taskContainer);
        taskDetails.appendChild(detailText);
        taskAndDetailsHolder.appendChild(taskDetails);
        content.appendChild(taskAndDetailsHolder);
        }
    })
}
//Insert DOM Element After
let insertAfter = (el, referenceNode) =>{
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
}

//Display Task details under task
const showTaskDetails = (project) => {
    const taskTitle = document.querySelectorAll('.taskTitle');
    taskTitle.forEach(e => e.addEventListener('click', () => {
        let currentIndex = (e.getAttribute('data-taskindex'));
        e.classList.toggle("active");

        const details = document.querySelectorAll('.taskDetails');
        details.forEach(element => {
            if (element.getAttribute('data-index') == currentIndex) {
                    if (element.style.height){
                        element.style.height = null;
                        element.style.display = null;
                        
                    } else {
                        let eHeight = element.scrollHeight
                        element.style.height = eHeight + 'px';
                        setTimeout(() => {
                            element.style.display = 'table';
                        }, 200)
                        taskRenameListener();
                        taskUpdateWatcher();
                    }
                }
            })
    }))
}

//Create New Task
const newTask = () => {
    const newTaskButton = document.querySelector('#addTask');
    newTaskButton.addEventListener('click', () => {
        const task = createTask('New Task', '');
        taskToProject(task, activeProjectID);
        showSelectedProject(activeProjectID);
    })
}
//Complete task
const completeTask = () => {
    const completeButton = document.querySelectorAll('.checkboxContainer');
    completeButton.forEach(e => e.addEventListener('click', () => {
        console.log('yay');
        const flag = projects[activeProjectID].tasks[e.getAttribute('data-index')].flag;
        const flagSet = (flagStatus) => {
            projects[activeProjectID].tasks[e.getAttribute('data-index')].flag = flagStatus;
        }
        if (flag == 'completed') {
            flagSet('upcoming')
        } else {
            flagSet('completed')    
        }
        showSelectedProject(activeProjectID);
    }))
}
//Rename Task with Listener
const taskRenameListener = () => {
    const taskTitle = document.querySelectorAll('.taskTitle');
    taskTitle.forEach(e => e.addEventListener('keyup', () => {
        renameTask(e.textContent, activeProjectID, e.getAttribute('data-index'));
    }))
}

//Delete Task
const deleteTask = () => {
    const delBtns = document.querySelectorAll('.eraseTaskHolder');
    delBtns.forEach(e => e.addEventListener('click', () => {
        eraseTask(activeProjectID,e.getAttribute('data-index'));
        console.log(activeProjectID, + ' ' +  e.getAttribute('data-index'));
        showSelectedProject(activeProjectID);
    }))
}

//Update Task Description on textarea change
const taskUpdateWatcher = () => {
    const taskDetails = document.querySelectorAll('.detailText');
    taskDetails.forEach(e => e.addEventListener('keyup', () => {
        projects[activeProjectID].tasks[e.getAttribute('data-index')].description = e.innerHTML;
    }))
}

//Custom EL for future DOM elements
const customEventListener = (selector, event, handler) => {
    let rootElement = document.querySelector('body');
    rootElement.addEventListener(event, (evt) => {
            let targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}

//Delete Project Button
const deleteProject = () => {customEventListener('#delProject', 'click', () =>{
    let del = document.querySelector('#delProject');
    del.addEventListener('click', () => {
        let pos = del.getAttribute('data-index');
        eraseProject(pos);
        showProjects();
        if (projects.length > 0){
            if (pos > 0) {
                showSelectedProject(pos-1);
            } else { 
                showSelectedProject(0);
            }
        } else {
            const cont = document.querySelector('#content');
            cont.innerHTML = '';
        }
    });
})
}

//New Project Button
const newProject = () => {customEventListener('#addProject', 'click', () =>{
    let add = document.querySelector('#addProject');
    add.addEventListener('click', () => {
        let newProj = createProject('New Project');
        activeProjectID = '0';
        projectToProjects(newProj);
        showProjects();
        showSelectedProject(0);
        showTasks(newProj);
        sidebarProjectClickListener();

        });

    })
}



export {createPage, showProjects, newProject, sidebarProjectClickListener, deleteProject, projectRename}