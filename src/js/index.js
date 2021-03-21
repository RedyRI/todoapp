import { menuContainer as sideMenu } from './sideMenu';
import { createForm } from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeTable'
// initialize
const tasks = []
const addFormContainer = createForm('Add new Task', 'submit', 'n')
addFormContainer.classList.add('add-form-container')
const editFormContainer = createForm('Edit task', 'save changes', 'e')
editFormContainer.classList.add('edit-form-container')

//  constructor(title, priority, description, category)
let t1 = new Task('task 1', 'UNI', 'this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one ', 'home')
let t2 = new Task('task 2', 'INU', 'this is the task number two', 'work')
let t3 = new Task('task 3', 'UAI', 'this is the task number three', 'school')
let t4 = new Task('task 4', 'NUI', 'this is the task number four', 'work')
let t5 = new Task('task 5', 'NUI', 'this is the task number five', 'work')

// cacheDOM
const header = document.querySelector('.header')
const addBtn = header.querySelector('.add');
const mode = header.querySelector('.mode')
const content = document.querySelector('.content')
const menuContainer =  content.querySelector('.content__side');
const arrow = menuContainer.querySelector('.arrow')
const tasksContainer =  content.querySelector('.content__tasks')
const formBtn = addFormContainer.querySelector('#n')
const cancelForm = addFormContainer.querySelector('.cancel')
const cancelEditForm = editFormContainer.querySelector('.cancel')

tasks.push(t1)
tasks.push(t2)
tasks.push(t3)
tasks.push(t4)
tasks.push(t5)

tasks.forEach(task => {
    render(task)
})

// bind events
window.addEventListener('click', hide);
addBtn.addEventListener('click', showForm);
formBtn.addEventListener('click', addTask);
cancelForm.addEventListener('click',hide);
arrow.addEventListener('click', showMenu);
tasksContainer.addEventListener('click', deleteOrUpdateCard);

// render the initial content
menuContainer.appendChild(sideMenu)
tasksContainer.appendChild(addFormContainer)
tasksContainer.appendChild(editFormContainer)

// functions 
function showMenu(e) {
    console.log(e);
    e.target.classList.toggle('rotate')
    e.target.parentNode.classList.toggle('show')
}

function hide(e) {
    if(e.target.classList.contains('form-container') || e.target == cancelForm || e.target == cancelEditForm) {
        addFormContainer.style.display = 'none'
        editFormContainer.style.display = 'none'
        arrow.style.pointerEvents = 'all';
    }
}

function showForm(e) {
    addFormContainer.style.display = 'flex';
    arrow.style.pointerEvents = 'none';
    if(arrow.classList.contains('rotate')) {
        arrow.classList.toggle('rotate')
        menuContainer.classList.toggle('show')
    }
}

function addTask(e) {
    e.preventDefault();
    let t = getTask(e);
    if(t != undefined) {
        console.log(t);
        addFormContainer.style.display = 'none';
        tasks.push(t)
        render(t)
    }
    // let allOk = true; 
    // let task = {}
    // let items = e.target.parentNode.children;
    // for (let i = 0; i < items.length; i++) {
    //     if(items[i].classList.contains('info')) {
    //         let id = items[i].getAttribute('id'); 
    //         if(items[i].value == '') {
    //             alert(`${id} missing`);
    //             allOk = false; 
    //             break;
    //         } else {
    //             task[id] = items[i].value;
    //             if(id == 'newtitle' || id == 'newdescription') {
    //                 items[i].value = ''
    //             }
    //         }
    //     }
    // }

    // if(allOk) {
    //     console.log(task);
    //     let t = new Task(task.newtitle, task.newpriority, task.newdescription, task.newcategory);
    //     tasks.push(t)
    //     addFormContainer.style.display = 'none';
    //     console.log(tasks);
    //     render(t)
    //     arrow.style.pointerEvents = 'all';
    // } else {
    //     let val = task.title == undefined ? '': task.title; 
    //     items[1].value = val;
    // }
}

function render(t) {
    let m = mode.value == 1 ? renderAsCards : renderAsTable;
    m(t)
}

function renderAsCards(t) {
    let c = createCard();
    console.log(c);
    fillCard(c, t, 'new')
    tasksContainer.appendChild(c)
}

function deleteOrUpdateCard(e) {
    console.log(e.target);
    if(e.target.classList.contains('delete-btn')) {
        deleteCard(e)
    } else if (e.target.classList.contains('s')){
        updateState(e)
    } else if (e.target.classList.contains('edit-btn')) {
        let dataId = e.target.parentNode.getAttribute('data-id');
        let cardToEdit = e.target.parentNode;
        console.log('you need to edit the card');
        console.log(dataId);
        let t = tasks.findIndex(task => task.id == dataId)
        console.log(t);
        showEditForm(cardToEdit, t)
    }
}

function deleteCard(e) {
    tasks.splice(tasks.findIndex(item => item.id == e.target.parentNode.getAttribute('data-id')),1)
    tasksContainer.removeChild(e.target.parentNode)
    console.log(tasks);
}

function updateState(e) {
    if(e.target.parentNode.lastElementChild.textContent=='pending') {
        e.target.parentNode.lastElementChild.textContent = 'done';
        e.target.parentNode.firstElementChild.style.backgroundColor = 'rgb(0, 255, 0)'
    } else {
        e.target.parentNode.lastElementChild.textContent = 'pending';
        e.target.parentNode.firstElementChild.style.backgroundColor = 'rgb(196, 32, 32)'
    }
}

function showEditForm(cardToEdit, t) {
    // addFormContainer.querySelector.
    let saveChangsBtn = editFormContainer.querySelector('#e');
    editFormContainer.querySelector('#etitle').value = tasks[t].title
    editFormContainer.querySelector('#epriority').value = tasks[t].priority
    editFormContainer.querySelector('#ecategory').value = tasks[t].category
    editFormContainer.querySelector('#edescription').value = tasks[t].description
    editFormContainer.style.display = 'flex';
    saveChangsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let editedTask = getTask(e);
        if (editedTask != undefined) {
            editTask(cardToEdit, t, editedTask);
        }
    })
}

function editTask(cardToEdit, t, editedTask) {
    console.log('need to edit task');
    editFormContainer.style.display = 'none';
    console.log(editedTask);
    console.log(tasks[t]);
    for (let k in editedTask) {
        if(k != 'id') {
            tasks[t][k] = editedTask[k];
        }
    }
    console.log(tasks[t]);
    fillCard(cardToEdit, tasks[t], 'edit')
}


function getTask(e) {
    let allOk = true; 
    let task = {}
    let items = e.target.parentNode.children;
    for (let i = 0; i < items.length; i++) {
        if(items[i].classList.contains('info')) {
            let id = items[i].getAttribute('id').slice(1,); 
            if(items[i].value == '') {
                alert(`${id} missing`);
                allOk = false; 
                break;
            } else {
                task[id] = items[i].value;
                if(id == `title` || id == `description`) {
                    items[i].value = ''
                }
            }
        }
    }

    if(allOk) {
        let t = new Task(task.title, task.priority, task.description, task.category)
        arrow.style.pointerEvents = 'all';
        return t
    } else {
        let val = task.title == undefined ? '': task.title; 
        items[1].value = val;
    }
}