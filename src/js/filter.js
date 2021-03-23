let filterValues = [];

function filter(value, cards) {
  if(filterValues.indexOf(value) == -1) {
    filterValues.push(value)
    let filteredCards;
    let option;
    let val = value;
    
    if(val == 'home' || val == 'shopping' || val == 'school' || val == 'work') {
      option = 'category'
    } else if (val == 'not important' || val == 'important' || val == 'urgent') {
      option = 'priority'
    } else if(val == 'pending' || val == 'done'){
      option = 'done'
    } else {
      option = 'date'
    }
    
    filteredCards = cards.filter(card => {
      let cardOption = card.querySelector(`.${option}`);
      console.log(cardOption);
      console.log(cardOption.textContent);
      if(cardOption.textContent != val) {
        card.style.display = 'none'
      } else {
        card.style.display = 'flex'
      }
      return cardOption.textContent == val
    })
    console.log(filteredCards);
    return filteredCards;
  }
}

function addFilterLabel(cont,ref, value) {
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
      filter : <span class='count'></span> 
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
export {
  filter,
  addFilterLabel,
  removeFilterLabel,
  updateCount,
}
