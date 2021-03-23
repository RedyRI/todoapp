function filter(tasks, value, cards) {
  let filteredCards;
  let option;
  let filteredTasks;
  let val = value;
  // let cards = [...field.querySelectorAll('.card')];
  console.log(cards);

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

  val = value == 'done' ? true :
  filteredTasks = tasks.filter(item => item[option] == val)
  value == 'pending' ? false : value;
  console.log(tasks);
  return filteredCards;
}

function filterCards(field, cards, filteredTasks) {

}



export {
  filter,
}