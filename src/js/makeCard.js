function createCard() {
    
    const card = document.createElement('div');
    card.classList.add('card')
    
    const h2 = document.createElement('h2');
    h2.classList.add('title')
    
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    const priority = document.createElement('div')
    priority.classList.add('priority')
    const category = document.createElement('div')
    category.classList.add('category')
    
    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('description-container')
    const description = document.createElement('p')
    description.classList.add('description')
    
    const cardStatus = document.createElement('div')
    cardStatus.classList.add('card-status')
    const status = document.createElement('div')
    status.classList.add('status')
    const btnStatus = document.createElement('button')
    btnStatus.classList.add('s')
    const textStatus = document.createElement('span')
    textStatus.classList.add('s')
    textStatus.textContent = 'pending'
    const date = document.createElement('div')
    date.classList.add('date')
    status.appendChild(btnStatus)
    status.appendChild(textStatus)
    cardStatus.appendChild(status)
    cardStatus.appendChild(date)
    
    const expandBtn = document.createElement('button')
    expandBtn.classList.add('expand-btn')
    expandBtn.textContent = 'expand';

    const editBtn = document.createElement('span')
    editBtn.classList.add('edit-btn')
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    
    detailsContainer.appendChild(priority)
    detailsContainer.appendChild(category)

    descriptionContainer.appendChild(description)

    card.appendChild(h2);
    card.appendChild(detailsContainer);
    card.appendChild(descriptionContainer);
    card.appendChild(cardStatus);
    card.appendChild(expandBtn);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);
    
    return card
}

function fillCard(card, task, type) {

    card.setAttribute('data-id', task.id)
    card.querySelector('.title').textContent = task.title

    let taskpBackColor = task.priority == 'urgent' ? '#ffdddd':
    task.priority == 'important' ? '#ffffcc': '#ddffdd';

    let taskcBackColor = task.category == 'work' ? '#ff5722':
    task.category == 'school' ? '#ff9800':
    task.category == 'home' ? '#7dadc3': '#e91e63';

    card.querySelector('.priority').textContent = task.priority
    card.querySelector('.priority').style.backgroundColor = taskpBackColor;

    card.querySelector('.category').textContent = task.category
    card.querySelector('.category').style.backgroundColor = taskcBackColor;
    card.querySelector('.category').style.fontWeigth = 'bolder';
    
    card.querySelector('.description').textContent = task.description
    card.querySelector('.date').textContent = task.date
    if (type == 'edit') {
        let e = card.querySelector('.edited-warning');
        if(!e) {
            console.log('add an edited mark');
            let edited = document.createElement('div')
            let cont = card.querySelector('.details-container')
            cont.style.justifyContent = 'space-between'
            edited.classList.add('edited-warning')
            edited.textContent = 'e'
            cont.appendChild(edited)
        } else {
            console.log('edited already exists');
        }
    }
}

export {
    createCard,
    fillCard,
}