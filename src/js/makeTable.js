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
    card.appendChild(deleteBtn);
    
    return card
}

function fillCard(card, task) {

    card.setAttribute('data-id', task.id)
    card.querySelector('.title').textContent = task.title
    card.querySelector('.priority').textContent = task.priority
    card.querySelector('.category').textContent = task.category
    card.querySelector('.description').textContent = task.description
    card.querySelector('.date').textContent = task.date

}

export {
    createCard,
    fillCard,
}