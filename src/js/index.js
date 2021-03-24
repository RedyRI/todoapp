import { compareAsc,compareDesc, format } from 'date-fns'
import { createForm } from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeCard'
import { addMenuAnimation } from './submenuTransition'
import { filter, addFilterLabel, removeFilterLabel, updateCount, getOption } from './filter'

// initialize
addMenuAnimation();
const tasks = []
let filteredCards = ['start']
if(!window.localStorage.getItem('idCount')) {
    window.localStorage.setItem('idCount', 0)
}
// var myStorage = window.localStorage;
const addFormContainer = createForm('Add new Task', 'Add task', 'n')
addFormContainer.classList.add('add-form-container')
const editFormContainer = createForm('Edit task', 'save changes', 'e')
editFormContainer.classList.add('edit-form-container')
const cardsContainer = document.createElement('div')
cardsContainer.classList.add('cards-container')

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
const resetFiltertn = menuContainer.querySelector('.reset-filter')
const headerMenuItems = [...header.querySelectorAll('.header-menu-item')]

// bind events
window.addEventListener('click', hide);
addBtn.addEventListener('click', showForm);
formBtn.addEventListener('click', addTask);
cancelForm.addEventListener('click',hide);
arrow.addEventListener('click', showMenu);
tasksContainer.addEventListener('click', deleteOrUpdateCard);
saveChangsBtn.addEventListener('click', edit)
mode.addEventListener('change', checkMode)
submenuItems.forEach(item => { item.addEventListener('click', startFilter) })
resetFiltertn.addEventListener('click', resetFilter)
headerMenuItems.forEach(item => item.addEventListener('change', getMenuItemValue))

// render the initial content
tasksContainer.appendChild(addFormContainer)
tasksContainer.appendChild(editFormContainer)
tasksContainer.appendChild(cardsContainer)

// functions
function startApp(myStorage)  {
    if(myStorage.length > 0) {
        for(let key in myStorage) {
            console.log(key);
            if(!isNaN(key)) {
                console.log(key);
                let task = JSON.parse(window.localStorage.getItem(key))
                tasks.push(task)
                console.log(task);
                renderAsCards(task)
            }
        }
    }
}

startApp(window.localStorage);
setInitialState(tasks)

function getIdCount() {
    return  +window.localStorage.getItem('idCount')
}
function setIdCount(id) {
    window.localStorage.setItem('idCount', id)
}
function setTaskId() {
    let id = getIdCount();
    setIdCount(id + 1)
    return id + 1

}

function getMenuItemValue(e) {
    let value = e.target.value;
    if(value != '-') {
        startFilter(value)
    }
}

function resetFilter(e) {
    let cards = [...cardsContainer.querySelectorAll('.card')]
    cards.forEach(card => card.style.display = 'flex')
    filteredCards = ['start'];
    headerMenuItems.forEach(item => item.value = '-')
    removeFilterLabel(tasksContainer);
}
function startFilter(e) {
    let value = typeof(e) == 'string' ? e : e.target.textContent;
    if(typeof(e) != 'string') {
        let opt = getOption(value);
        headerMenuItems.find(item => item.name == opt).value = value
    }

    // let value = e.target.textContent;
    addFilterLabel(tasksContainer, cardsContainer, value)
    if(filteredCards.indexOf('start') == 0) {
        filteredCards = [...cardsContainer.querySelectorAll('.card')];
    }
    // let cards = [...cardsContainer.querySelectorAll('.card')];
    console.log(tasks);
    let returnedValue = filter(value, filteredCards, tasks);
    console.log(tasks);
    filteredCards = returnedValue == undefined ? filteredCards : returnedValue; 
    updateCount(tasksContainer, filteredCards.length)
    // console.log(filteredTasks);
}

function checkMode(e) {
    cardsContainer.classList.toggle('cards-container')
    cardsContainer.classList.toggle('tables-container')
    checkSideMenu();
    arrow.style.pointerEvents = 'all';
}

function showMenu(e) {
    e.target.classList.toggle('rotate')
    e.target.parentNode.classList.toggle('show')
}

function hide(e) {
    let targetClasslist = e.target.classList;
    if(targetClasslist.contains('form-container') || e.target == cancelForm || e.target == cancelEditForm) {
        addFormContainer.style.display = 'none'
        editFormContainer.style.display = 'none'
        arrow.style.pointerEvents = 'all';
        cancelEdit();
        resetForm(tasksContainer)
        addBtn.style.display = 'block'
        arrow.style.display = 'flex'
    }

    if(targetClasslist.contains('content__side') || targetClasslist.contains('submenu-btn') || targetClasslist.contains('submenu-item') || targetClasslist.contains('arrow') || targetClasslist.contains('submenu-arrow' || targetClasslist.contains('menu')) || targetClasslist.contains('submenu')) {
    } else {
        checkSideMenu();
        arrow.style.pointerEvents = 'all';
    }

    if(e.target.classList.contains('close')) {
        resetFilter();
    }
}

function showForm(e) {
    addFormContainer.style.display = 'flex';
    addFormContainer.querySelector('.form-date').setAttribute('value', `${format(new Date(), 'yyyy-MM-dd')}`)
    addFormContainer.querySelector('.form-date').setAttribute('min', `${format(new Date(), 'yyyy-MM-dd')}`)
    checkSideMenu();
    addBtn.style.display = 'none'
    arrow.style.display = 'none'
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
        console.log(task);
        addFormContainer.style.display = 'none';
        tasks.push(task)
        renderAsCards(task)
        resetFilter();
        window.localStorage.setItem(task.id, JSON.stringify(task))
        console.log(window.localStorage);
    }
}

function renderAsCards(task) {
    let card = createCard();
    if(task.edited) {
        fillCard(card, task, 'edit')
    } else {
        fillCard(card, task, 'new')
    }
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
        let description = e.target.previousSibling.previousSibling.firstElementChild;
        let height = description.scrollHeight; 
        if(description.classList.contains('dropdown')) {
            description.classList.toggle('dropdown')
            description.removeAttribute('style')
            e.target.removeAttribute('style')
        }else {
            description.classList.toggle('dropdown')
            description.style.height = `${height}px`
            description.style.margin = `5px 7px`
            e.target.style.transform = 'rotate(180deg)'
        }
        console.log(e.target.previousSibling.previousSibling.firstElementChild);
    }
}

function cancelEdit() {
    tasks.forEach(item => {item.edit = false})
}

function deleteCard(e) {
    console.log(e.target.parentNode);
    tasks.splice(tasks.findIndex(item => item.id == e.target.parentNode.getAttribute('data-id')),1)
    cardsContainer.removeChild(e.target.parentNode)
    window.localStorage.removeItem(e.target.parentNode.getAttribute('data-id'))
    console.log(window.localStorage);
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
    window.localStorage.setItem(task.id, JSON.stringify(task))
    console.log(tasks);
}

function setInitialState(tasks) {
    let cards = [...cardsContainer.querySelectorAll('.card')]
    tasks.forEach(item => {
        if(item.done) {
            let cardToRender = cards.find(card => card.getAttribute('data-id') == item.id)
            cardToRender.querySelector('.status').firstElementChild.style.backgroundColor = 'rgb(0, 255, 0)';
            cardToRender.querySelector('.status').lastElementChild.textContent = 'done';
        }
    })
}

function edit(e) {
    e.preventDefault();
    let taskToEdit = getTask(e);
    if (taskToEdit != undefined) {
        editTask(taskToEdit);
    }
}

function showEditForm() {
    let t = tasks.find(item => item.edit == true)
    checkSideMenu()
    // addFormContainer.querySelector.
    addBtn.style.display = 'none'
    arrow.style.display = 'none'
    editFormContainer.querySelector('#etitle').value = t.title
    editFormContainer.querySelector('#epriority').value = t.priority
    editFormContainer.querySelector('#ecategory').value = t.category
    editFormContainer.querySelector('#edescription').value = t.description
    editFormContainer.querySelector('#edate').value = t.date
    editFormContainer.querySelector('#edate').setAttribute('min', `${format(new Date(), 'yyyy-MM-dd')}`)

    editFormContainer.style.display = 'flex';
}

function editTask(taskToEdit) {
    let task = tasks.find(item => item.edit == true)
    console.log(task);
    let cards = [...tasksContainer.querySelectorAll('.card')];
    let cardToEdit = cards.find(item => item.getAttribute('data-id') == task.id)
    editFormContainer.style.display = 'none';
    for (let key in task) {
        if(key != 'id') {
            task[key] = taskToEdit[key];
            if(key == 'edited') {
                task[key] = true
            }
            if(key == 'edit') {
                task[key] = false;
            }
            if(key == 'done') {
                task[key] = true;
            }

        }
    }
    window.localStorage.removeItem(task.id)
    fillCard(cardToEdit, task, 'edit')
    window.localStorage.setItem(task.id, JSON.stringify(task))
    console.log(tasks);
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
        let newTask = new Task(setTaskId(),task.title, task.priority, task.description, task.category, task.date)
        arrow.style.pointerEvents = 'all';
        resetForm(form)
        addBtn.style.display = 'block'
        arrow.style.display = 'flex'
        return newTask
    } else {
        info[0].value = task.title == undefined ? '': task.title; 
    }

}

function resetForm(form) {
    let info = form.querySelectorAll('.info')
    info[0].value = ''
    info[1].value = 'urgent'
    info[2].value = 'work'
    info[3].value = '';
}
