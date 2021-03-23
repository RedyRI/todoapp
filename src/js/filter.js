let filterValues = [];

function filter(value, cards, tasks) {
  let filteredCards;
  let orderedCards;
  let orderedTasks;
  if(filterValues.indexOf(value) == -1) {
    if(value== 'ascendant' || value == 'descendant') {
      if(value == 'ascendant') {
        console.log(tasks);
        console.log('value is ascendant');
        orderedTasks = tasks.sort((a,b) => a.date > b.date ? 1: -1);
      } else {
        console.log('value is descendant');
        orderedTasks = tasks.sort((a,b) => a.date > b.date ? -1: 1);
      }
      let i = 1;
      console.log(tasks);
      orderedTasks.forEach(task => {
        let idToOrder = cards.find(card => card.getAttribute('data-id') == task.id);
        if(idToOrder) {
          idToOrder.style.order = `${i}`;
          i++;
        }
       });
      console.log(orderedTasks);
      filterValues.push('ascendant')
      filterValues.push('descendant')
      filteredCards = cards;
    } else {

      filterValues.push(value)
      let option = getOption(value)
      
      // if(val == 'home' || val == 'shopping' || val == 'school' || val == 'work') {
      //   option = 'category'
      // } else if (val == 'not important' || val == 'important' || val == 'urgent') {
      //   option = 'priority'
      // } else if(val == 'pending' || val == 'done'){
      //   option = 'done'
      // } else {
      //   option = 'date'
      // }
      
      filteredCards = cards.filter(card => {
        let cardOption = card.querySelector(`.${option}`);
        if(cardOption.textContent != value) {
          card.style.display = 'none'
        } else {
          card.style.display = 'flex'
        }
        return cardOption.textContent == value
      })
      console.log(filteredCards);
    }
    return filteredCards;
  }
}

function addFilterLabel(cont,ref, value) {
  console.log(filterValues);
  if(filterValues.indexOf(value) == -1) {
    let optionContainer = document.createElement('div');
    optionContainer.textContent = value;
    let val = value == 'not important' ? 'not-important': value;
    optionContainer.classList.add(`${val}`);
    let filterHeader = cont.querySelector('.filter-header'); 
    if( filterHeader == null) {    
      const filterHeader = document.createElement('div')
      filterHeader.classList.add('filter-header')
      let content = `
      filter : <span class='count'></span> <span class='close'></span> 
      `
      filterHeader.innerHTML = content;  
      cont.insertBefore(filterHeader, ref)
      filterHeader.appendChild(optionContainer)
    } else {
      filterHeader.appendChild(optionContainer)
    }
  }
}

function removeFilterLabel(cont) {
  if(cont.querySelector('.filter-header')) {
    cont.removeChild(cont.querySelector('.filter-header'))
  }
  filterValues = [];
}

function updateCount(cont, value) {
  cont.querySelector('.count').textContent = `(${value})`;
}

function getOption(val) {
  let option;
  if(val == 'home' || val == 'shopping' || val == 'school' || val == 'work') {
    option = 'category'
  } else if (val == 'not important' || val == 'important' || val == 'urgent') {
    option = 'priority'
  } else if(val == 'pending' || val == 'done'){
    option = 'done'
  } else {
    option = 'date'
  }
  return option;
}

export {
  filter,
  addFilterLabel,
  removeFilterLabel,
  updateCount,
  getOption,
}
