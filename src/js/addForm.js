const formContainer = document.createElement('div')
formContainer.classList.add('form-container');
const cancel = document.createElement('div');
cancel.classList.add('cancel');
cancel.textContent = 'x'
let form = document.createElement('form');
form.classList.add('form');

let formContent = `
<label for="title">Task title:</label>
<input class="info" placeholder="My task..." type="text" id="title" name="title">
<label for="priority">Priority :</label>
<select class="info" name="priority" id="priority">
  <option value="NI" selected>NOT urgent OR important</option>
  <option value="UNI">Urgent NOT important.</option>
  <option value="INU">Important NOT urgent.</option>
  <option value="UAI">Urgent AND important.</option>
</select>
<label for="category">Category :</label>
<select class="info" name="category" id="category">
  <option value= "home" selected>Home tasks</option>
  <option value="school">School tasks</option>
  <option value="shopping">Shopping tasks</option>
  <option value="work">Work tasks</option>
</select>
<label for="description">Task description: </label>
<textarea class="info" placeholder="Describe your task..." id="description" name="description" rows="4" cols="50"></textarea>
<input type="submit" value="Submit">
`
form.innerHTML = formContent;
const h2 = document.createElement('h2');
h2.textContent = 'New task :'
formContainer.appendChild(cancel);
formContainer.appendChild(h2);
formContainer.appendChild(form);

export { formContainer }