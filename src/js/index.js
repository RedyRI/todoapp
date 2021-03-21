import { menuContainer as sideMenu } from './sideMenu';
import { formContainer as form, formContainer} from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeTable'
// initialize
const tasks = []

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
const formBtn = formContainer.querySelector('input[type=submit]')
const cancelForm = formContainer.querySelector('.cancel')

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
tasksContainer.appendChild(form)

// functions 
function showMenu(e) {
    console.log(e);
    e.target.classList.toggle('rotate')
    e.target.parentNode.classList.toggle('show')
}

function hide(e) {
    if(e.target.classList.contains('form-container') || e.target == cancelForm) {
        formContainer.style.display = 'none'
        arrow.style.pointerEvents = 'all';
    }
}

function showForm(e) {
    formContainer.style.display = 'flex';
    arrow.style.pointerEvents = 'none';
    if(arrow.classList.contains('rotate')) {
        arrow.classList.toggle('rotate')
        menuContainer.classList.toggle('show')
    }
}

function addTask(e) {
    e.preventDefault();
    let allOk = true; 
    let task = {}
    let items = e.target.parentNode.children;
    for (let i = 0; i < items.length; i++) {
        if(items[i].classList.contains('info')) {
            let id = items[i].getAttribute('id'); 
            if(items[i].value == '') {
                alert(`${id} missing`);
                allOk = false; 
                break;
            } else {
                task[id] = items[i].value;
                if(id == 'title' || id == 'description') {
                    items[i].value = ''
                }
            }
        }
    }

    if(allOk) {
        let t = new Task(task.title, task.priority, task.description, task.category);
        tasks.push(t)
        formContainer.style.display = 'none';
        console.log(tasks);
        render(t)
        arrow.style.pointerEvents = 'all';
    } else {
        let val = task.title == undefined ? '': task.title; 
        items[1].value = val;
    }
}

function render(t) {
    let m = mode.value == 1 ? renderAsCards : renderAsTable;
    m(t)
}

function renderAsCards(t) {
    let c = createCard();
    console.log(c);
    fillCard(c, t)
    tasksContainer.appendChild(c)
}

function deleteOrUpdateCard(e) {
    console.log(e.target);
    if(e.target.classList.contains('delete-btn')) {
        tasks.splice(tasks.findIndex(item => item.id == e.target.parentNode.getAttribute('data-id')),1)
        tasksContainer.removeChild(e.target.parentNode)
        console.log(tasks);
    } else if (e.target.classList.contains('s')){
        if(e.target.parentNode.lastElementChild.textContent=='pending') {
            e.target.parentNode.lastElementChild.textContent = 'done';
        } else {
            e.target.parentNode.lastElementChild.textContent = 'pending';
        }
        e.target.parentNode.classList.toggle('.status-done')
    }
}
