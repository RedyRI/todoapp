function createForm(title, btn, type) {
  
  const formContainer = document.createElement('div')
  formContainer.classList.add('form-container');
  const cancel = document.createElement('div');
  cancel.classList.add('cancel');
  cancel.textContent = 'x'
  let form = document.createElement('form');
  form.classList.add('form');

  let date = type == 'n' ? 'Choose': 'Edit';

  let formContent = `
  <label for="${type}title">Task title:</label>
  <input class="info form-title" placeholder="My task..." type="text" id="${type}title" name="title">
  <label for="${type}priority">Priority :</label>
  <select class="info form-priority" name="priority" id="${type}priority">
  <option value="urgent" selected>urgent</option>
  <option value="important">important</option>
  <option value="not important">not important</option>
  </select>
  <label for="${type}category">Category :</label>
  <select class="info form-category" name="category" id="${type}category">
  <option value= "home" selected>Home tasks</option>
  <option value="school">School tasks</option>
  <option value="shopping">Shopping tasks</option>
  <option value="work">Work tasks</option>
  </select>
  <label for="${type}description" class='desc'>Task description: </label>
  <textarea class="info form-description" placeholder="Describe your task..." id="${type}description" name="description" rows="4" cols="50"></textarea>
  <label for="${type}date">${date} the date: </label>
  <input class="info form-date" type="date" value="" id="${type}date" name="date" autocomplete>
  <input type="submit" value="${btn}" id="${type}">
  `
  form.innerHTML = formContent;
  const h2 = document.createElement('h2');
  h2.textContent = `${title}`
  formContainer.appendChild(cancel);
  formContainer.appendChild(h2);
  formContainer.appendChild(form);
  
  return formContainer;

}
  export { createForm }

  // <option value="NUI" selected>NOT urgent OR important</option>
  // <option value="UNI">Urgent NOT important</option>
  // <option value="INU">Important NOT urgent</option>
  // <option value="UAI">Urgent AND important</option>