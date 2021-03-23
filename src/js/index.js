import { compareAsc,compareDesc, format } from 'date-fns'
import { createForm } from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeCard'
import { addMenuAnimation } from './submenuTransition'
import { startFilter } from './filter'
import { filter } from './filter'

// initialize
addMenuAnimation();
const tasks = []
const addFormContainer = createForm('Add new Task', 'Add task', 'n')
addFormContainer.classList.add('add-form-container')
const editFormContainer = createForm('Edit task', 'save changes', 'e')
editFormContainer.classList.add('edit-form-container')
const cardsContainer = document.createElement('div')
cardsContainer.classList.add('cards-container')

//  constructor(title, priority, description, category)
let t1 = new Task('task 1', 'urgent', 'this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one this is the task number one ', 'home', `${format(new Date(), 'yyyy-MM-dd')}`)
let t2 = new Task('task 2', 'important', 'this is the task number two', 'work', `${format(new Date(), 'yyyy-MM-dd')}`)
let t3 = new Task('task 3', 'not important', 'this is the task number three', 'school', `${format(new Date(), 'yyyy-MM-dd')}`)
let t4 = new Task('task 4', 'important', 'this is the task number four', 'shopping', `${format(new Date(), 'yyyy-MM-dd')}`)
let t5 = new Task('task 5', 'urgent', 'this is the task number five', 'work', `${format(new Date(), 'yyyy-MM-dd')}`)

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
const submenuItems = [...document.querySelectorAll('.submenu-item')]

tasks.push(t1)
tasks.push(t2)
tasks.push(t3)
tasks.push(t4)
tasks.push(t5)

tasks.forEach(task => {
    renderAsCards(task)
})

// bind events
window.addEventListener('click', hide);
addBtn.addEventListener('click', showForm);
formBtn.addEventListener('click', addTask);
cancelForm.addEventListener('click',hide);
arrow.addEventListener('click', showMenu);
tasksContainer.addEventListener('click', deleteOrUpdateCard);
saveChangsBtn.addEventListener('click', edit)
mode.addEventListener('change', checkMode)
submenuItems.forEach(item => { item.addEventListener('click', filter) })

// render the initial content
tasksContainer.appendChild(addFormContainer)
tasksContainer.appendChild(editFormContainer)
tasksContainer.appendChild(cardsContainer)

// functions 

function checkMode(e) {
    cardsContainer.classList.toggle('cards-container')
    cardsContainer.classList.toggle('tables-container')
}

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
    addFormContainer.querySelector('.form-date').setAttribute('value', `${format(new Date(), 'yyyy-MM-dd')}`)
    addFormContainer.querySelector('.form-date').setAttribute('min', `${format(new Date(), 'yyyy-MM-dd')}`)
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
    let task = getTask(e);
    if(task != undefined) {
        addFormContainer.style.display = 'none';
        tasks.push(task)
        renderAsCards(task)
    }
}

// function render(task) {
//     let renderMode = mode.value == 1 ? renderAsCards : renderAsTable;
//     renderMode(task)
// }

function renderAsCards(task) {
    let card = createCard();
    fillCard(card, task, 'new')
    cardsContainer.appendChild(card)
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
    } else if (e.target.classList.contains('expand-btn')) {
        console.log('asd');
        console.log(e.target.previousSibling.previousSibling);
        e.target.parentNode.classList.toggle('card-grow')
        e.target.previousSibling.previousSibling.classList.toggle('show-description-container')
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
    editFormContainer.querySelector('#edate').value = t.date
    editFormContainer.querySelector('#edate').setAttribute('min', `${format(new Date(), 'yyyy-MM-dd')}`)

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
        let t = new Task(task.title, task.priority, task.description, task.category, task.date)
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
