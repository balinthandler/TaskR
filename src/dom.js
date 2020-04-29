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
            if (e.name == '') {
                element.textContent = `Project ${projects.indexOf(e)+1}`;
            } else {
            element.textContent = e.name;
            }
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
        if (projects[projectIndex].name == '') {
            projectH1.placeholder = 'Add Project Name...';
        } else {
            projectH1.value = projects[projectIndex].name;
        }
        projectH1.id = 'projectTitle';
        projectH1.setAttribute('autocomplete', 'off');
        projectH1.setAttribute('spellcheck', false);
        projectH1.setAttribute('data-index', projectIndex);
        projectNameContainer.appendChild(delProject);
        projectNameContainer.appendChild(projectH1);
        content.appendChild(projectNameContainer);

    //Navbar
    const navbar = document.createElement('div');
        navbar.id = 'navbar';
        content.appendChild(navbar);
    //Upcoming Button
    const upcoming = document.createElement('button');
        if (taskFilter == 'upcoming') {
            upcoming.classList.add('activeNav');
        }
        upcoming.classList.add('navButtons');
        upcoming.id = 'upcoming';
        upcoming.innerHTML = 'Show Upcoming';
        navbar.appendChild(upcoming);
    //Completed Button
    const completed = document.createElement('button');
        if (taskFilter == 'completed') {
            completed.classList.add('activeNav');
        }
        completed.classList.add('navButtons');
        completed.id = 'completed';
        completed.innerHTML = 'Show Completed';
        navbar.appendChild(completed);
    //All Button
    const all = document.createElement('button');
        if (taskFilter == 'all') {
            all.classList.add('activeNav');
        }
        all.classList.add('navButtons');
        all.id = 'all';
        all.innerHTML = 'Show All';
        navbar.appendChild(all);


        showTasks(projects[projectIndex]);
        showTaskDetails(projects[projectIndex]);
        //Add Task Button
        if (taskFilter == 'upcoming' || taskFilter == 'all'){
            const addTask = document.createElement('button');
                addTask.id = 'addTask';
            const addTaskIcon = document.createElement('button');
                addTaskIcon.id = 'addTaskIcon';
                addTaskIcon.textContent= '+';
            addTask.appendChild(addTaskIcon);
            content.appendChild(addTask);
        }
        deleteTask();
        newTask();
        completeTask();
        filters();
        taskRenameListener();


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

            document.activeElement.blur();
        }
        const inp = document.querySelector('#projectTitle');
        renameProject(inp.value, inp.getAttribute('data-index'));
        showProjects();
})}

//Task filters 
const filters = () => {
    const filterButtons = document.querySelectorAll('.navButtons');
    filterButtons.forEach(e => e.addEventListener('click', () => {
        if (e.id == 'upcoming') {
            taskFilter = 'upcoming';

        } else if (e.id == 'completed') {
            taskFilter = 'completed';
        } else if (e.id == 'all') {
            taskFilter = 'all';
            e.id = 'asd';
        }
        showSelectedProject(activeProjectID);
        console.log(taskFilter);
    }))

}

//Display Tasks inside selected Project
const showTasks = (project) => {
    project.tasks.forEach(e => {
        const showFilteredTasks = () => {    
            //Task + Description Holder
            const taskAndDetailsHolder = document.createElement('div');
                taskAndDetailsHolder.classList.add('taskAndDetailsHolder');
            //Task + Check + Delete Container
            const taskContainer = document.createElement('div');
                taskContainer.classList.add('taskContainer');
                taskContainer.setAttribute('data-index', project.tasks.indexOf(e));
            //Check Sign Container
            const checkboxContainer = document.createElement('span');
                if (e.flag == 'completed'){
                    checkboxContainer.classList.add('checkboxContainerCompleted');
                } else {
                    checkboxContainer.classList.add('checkboxContainer');
                }
                checkboxContainer.setAttribute('data-index', project.tasks.indexOf(e));
                //Check Icon
                const isDoneIcon = document.createElement('button');
                    isDoneIcon.setAttribute('type', 'checkbox');
                    isDoneIcon.classList.add('isDone');
                    isDoneIcon.innerHTML = '&#10004';
            //Task Title Span
            const taskTitleContainer = document.createElement('span');
                taskTitleContainer.setAttribute('data-taskindex', project.tasks.indexOf(e));
                taskTitleContainer.classList.add('taskTitleContainer');
                //Task Title Input
                const taskTitle = document.createElement('input');
                    taskTitle.setAttribute('data-taskindex', project.tasks.indexOf(e));
                    taskTitle.classList.add('taskTitle');
                    if (e.title == '') {
                        taskTitle.placeholder = 'Add Title here';
                    } else {
                        taskTitle.value = e.title;
                    }
                    taskTitle.setAttribute('spellcheck', false);
                    taskTitle.setAttribute('autocomplete', 'off');
                    taskTitle.setAttribute('data-index', project.tasks.indexOf(e));
            //Erase Icon Container
            const eraseTaskHolder = document.createElement('span');
                eraseTaskHolder.setAttribute('data-index', project.tasks.indexOf(e));
                eraseTaskHolder.classList.add('eraseTaskHolder');
                //Erase Icon
                const eraseTaskIcon = document.createElement('button');
                    eraseTaskIcon.classList.add('eraseTask');
                    eraseTaskIcon.textContent= '-';
            //Task Details Icon Holder
            const detailsIconHolder = document.createElement('button');
                detailsIconHolder.classList.add('detailsIconHolder');
                detailsIconHolder.setAttribute('data-index', project.tasks.indexOf(e));
                //TaskDetailsIcon  
                const detailsIcon = document.createElement('p');
                detailsIcon.classList.add('detailsIcon');
                detailsIcon.textContent = '...';

            //Task Details Span
            const taskDetails = document.createElement('span');
                taskDetails.classList.add('taskDetails');
                taskDetails.setAttribute('data-index', project.tasks.indexOf(e));
                //Task Details Text
                const detailText = document.createElement('p');
                    if (e.description == ''){
                        detailText.placeholder = 'Add description here...';
                    }else {
                        detailText.innerHTML = e.description;
                    }
                    detailText.classList.add('detailText');
                    detailText.setAttribute('autocomplete', 'off');
                    detailText.setAttribute('data-index', project.tasks.indexOf(e));
                    detailText.setAttribute('spellcheck', false);
                    detailText.setAttribute('contenteditable', 'true');


            //Appending Elements to Content
            checkboxContainer.appendChild(isDoneIcon);
            eraseTaskHolder.appendChild(eraseTaskIcon);
            taskContainer.appendChild(checkboxContainer);
            detailsIconHolder.appendChild(detailsIcon);
            taskContainer.appendChild(detailsIconHolder);
            taskTitleContainer.appendChild(taskTitle);
            taskContainer.appendChild(taskTitleContainer);
            taskContainer.appendChild(eraseTaskHolder);
            taskAndDetailsHolder.appendChild(taskContainer);
            taskDetails.appendChild(detailText);
            taskAndDetailsHolder.appendChild(taskDetails);
            content.appendChild(taskAndDetailsHolder);
        }    
        if (taskFilter == 'all'){
            showFilteredTasks();

        } else if (e.flag == taskFilter){
            showFilteredTasks();

        }
    })

}


//Display Task details under task
const showTaskDetails = (project) => {
    const detailsIconHolder = document.querySelectorAll('.detailsIconHolder');
    detailsIconHolder.forEach(e => e.addEventListener('click', () => {
        let currentIndex = (e.getAttribute('data-index'));
        e.classList.toggle("detailsToggle");

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
                        taskUpdateWatcher();
                    }
                }
            })
    }))
}

//Create New Task
const newTask = () => {
    if (taskFilter == 'upcoming' || taskFilter == 'all'){
        const newTaskButton = document.querySelector('#addTask');
        newTaskButton.addEventListener('click', () => {
            const task = createTask('', '');
            
            taskFilter = 'upcoming';
            taskToProject(task, activeProjectID);
            showSelectedProject(activeProjectID);
        })
    }
}
//Complete task
const completeTask = () => {
    const completeButton = document.querySelectorAll('.checkboxContainer, .checkboxContainerCompleted');
    completeButton.forEach(e => e.addEventListener('click', () => {
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
        if (event.keyCode == 13) {
            e.blur();
        }
        renameTask(e.value, activeProjectID, e.getAttribute('data-index'));
        console.log(e.value)
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
    const taskDetails = document.querySelectorAll('.taskDetails');
    const detailText = document.querySelectorAll('.detailText');
    taskDetails.forEach(elem => elem.addEventListener('click', () => {
        detailText.forEach((e) => {
            if (elem.getAttribute('data-index') == e.getAttribute('data-index')) {
                e.focus();
            }
        })       
    }));
    detailText.forEach(e => e.addEventListener('keyup', () => {
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
        let newProj = createProject('');
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