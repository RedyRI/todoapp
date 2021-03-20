import { menuContainer as sideMenu } from './sideMenu';
import { formContainer as form, formContainer} from './addForm'; 
import '../less/index.less';
import '../static/sheep.png';
import { Task } from './task';
import { createCard, fillCard } from './makeTable'
// initialize
const tasks = []

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

// bind events
window.addEventListener('click', hide);
addBtn.addEventListener('click', showForm);
formBtn.addEventListener('click', addTask);
cancelForm.addEventListener('click',hide);
arrow.addEventListener('click', showMenu);

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
    }
}

function showForm(e) {
    formContainer.style.display = 'flex';
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