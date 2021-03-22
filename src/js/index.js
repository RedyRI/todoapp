import { menuContainer as sideMenu } from './sideMenu';
import { createForm } from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeCard'
// initialize
const tasks = []
const addFormContainer = createForm('Add new Task', 'submit', 'n')
addFormContainer.classList.add('add-form-container')
const editFormContainer = createForm('Edit task', 'save changes', 'e')
editFormContainer.classList.add('edit-form-container')
const cardsContainer = document.createElement('div')
cardsContainer.classList.add('cards-container')

//  constructor(title, priority, description, category)
let t1 = new Task('task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1', 'urgent', 'this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one ', 'home')
let t2 = new Task('task 2', 'important', 'this is the task number two', 'work')
let t3 = new Task('task 3', 'not important', 'this is the task number three', 'school')
let t4 = new Task('task 4', 'important', 'this is the task number four', 'shopping')
let t5 = new Task('task 5', 'urgent', 'this is the task number five', 'work')

// cacheDOM
const header = document.querySelector('.header')
const addBtn = header.querySelector('.add');
const mode = header.querySelector('.mode')
const content = document.querySelector('.content')
const menuContainer =  content.querySelector('.content__side');
const arrow = menuContainer.querySelector('.arrow')
const tasksContainer =  content.querySelector('.content__tasks')
const formBtn = addFormContainer.querySelector('#n')
const saveChangsBtn = editFormContainer.querySelector('#e');
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
saveChangsBtn.addEventListener('click', edit)

// render the initial content
menuContainer.appendChild(sideMenu)
tasksContainer.appendChild(addFormContainer)
tasksContainer.appendChild(editFormContainer)
tasksContainer.appendChild(cardsContainer)

// functions 
function showMenu(e) {
    e.target.classList.toggle('rotate')
    e.target.parentNode.classList.toggle('show')
}

function hide(e) {
    if(e.target.classList.contains('form-container') || e.target == cancelForm || e.target == cancelEditForm) {
        addFormContainer.style.display = 'none'
        editFormContainer.style.display = 'none'
        arrow.style.pointerEvents = 'all';
        cancelEdit();
        resetForm(tasksContainer)
    }
}

function showForm(e) {
    addFormContainer.style.display = 'flex';
    checkSideMenu();
}

function checkSideMenu() {
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
        addFormContainer.style.display = 'none';
        tasks.push(t)
        render(t)
    }
}

function render(t) {
    let m = mode.value == 1 ? renderAsCards : renderAsTable;
    m(t)
}

function renderAsCards(t) {
    let c = createCard();
    fillCard(c, t, 'new')
    cardsContainer.appendChild(c)
}

function deleteOrUpdateCard(e) {
    if(e.target.classList.contains('delete-btn')) {
        deleteCard(e)
    } else if (e.target.classList.contains('s')){
        console.log(tasks);
        updateState(e)
    } else if (e.target.classList.contains('edit-btn')) {
        let dataId = e.target.parentNode.getAttribute('data-id');
        let t = tasks.findIndex(task => task.id == dataId)
        tasks[t].edit = true; 
        showEditForm();
    }
}

function cancelEdit() {
    tasks.forEach(item => {item.edit = false})
}

function deleteCard(e) {
    console.log(e.target.parentNode);
    tasks.splice(tasks.findIndex(item => item.id == e.target.parentNode.getAttribute('data-id')),1)
    cardsContainer.removeChild(e.target.parentNode)
}

function updateState(e) {
    let cardId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id')
    // console.log(cardId);
    let task = tasks.find(item => item.id == cardId)
    // console.log(task);
    if(e.target.parentNode.lastElementChild.textContent=='pending') {
        e.target.parentNode.lastElementChild.textContent = 'done';
        e.target.parentNode.firstElementChild.style.backgroundColor = 'rgb(0, 255, 0)'
        task.done = true;
    } else {
        e.target.parentNode.lastElementChild.textContent = 'pending';
        e.target.parentNode.firstElementChild.style.backgroundColor = 'rgb(196, 32, 32)'
        task.done = false;
    }
    console.log(tasks);
}

function edit(e) {
    e.preventDefault();
    let editedTask = getTask(e);
    if (editedTask != undefined) {
        editTask(editedTask);
    }
}

function showEditForm() {
    let t = tasks.find(item => item.edit == true)
    checkSideMenu()
    // addFormContainer.querySelector.
    editFormContainer.querySelector('#etitle').value = t.title
    editFormContainer.querySelector('#epriority').value = t.priority
    editFormContainer.querySelector('#ecategory').value = t.category
    editFormContainer.querySelector('#edescription').value = t.description
    editFormContainer.style.display = 'flex';
}

function editTask(editedTask) {
    let t = tasks.find(item => item.edit == true)
    let cards = [...tasksContainer.querySelectorAll('.card')];
    let cardToEdit = cards.find(item => item.getAttribute('data-id') == t.id)
    editFormContainer.style.display = 'none';
    for (let k in editedTask) {
        if(k != 'id') {
            if(k != 'edit') {
                t[k] = editedTask[k];
            } else {
                t[k] = false;
            }
        }
    }
    fillCard(cardToEdit, t, 'edit')
}


function getTask(e) {
    let allOk = true; 
    let task = {}
    
    let form = e.target.parentNode.parentNode
    let info  = form.querySelectorAll('.info')

    for (let element of info) {
        console.log(element.name, element.value);
        if(element.name == 'title' || element.name == 'description') {
            if(element.value == '') {
                alert(`${element.name} missing`);
                allOk = false;
            }
        }
        task[element.name] = element.value;
    }

    if(allOk) {
        let t = new Task(task.title, task.priority, task.description, task.category)
        arrow.style.pointerEvents = 'all';
        resetForm(form)
        return t
    } else {
        info[0].value = task.title == undefined ? '': task.title; 
    }

}

function resetForm(form) {
    let info = form.querySelectorAll('.info')
    info[0].value = ''
    info[1].value = 'urgent'
    info[2].value = 'work'
    info[3].value = ''
}