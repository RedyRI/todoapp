function filter(e) {
  let option;
  let value = e.target.textContent;
  console.log(value);
  if(value == 'home' || value == 'shopping' || value == 'school' || value == 'work') {
    option = 'category'
  } else if (value == 'not important' || value == 'important' || value == 'urgent') {
    option = 'priority'
  } else if(value == 'pending' || value == 'done'){
    option = 'done'
  } else {
    option = 'date'
  }
  filterTasks = tasks.filter(item => item.option == value)
  console.log(filteredCards);
  return filteredCards;
}



export {
  filter,
}