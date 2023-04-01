const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const html = document.querySelector('html');
const toggleSwitch = document.querySelector('#toggle-switch');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    const todoItem = createTodoItem(todoText);
    list.appendChild(todoItem);
    input.value = '';
  }
});

toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  });

function createTodoItem(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  span.textContent = text;
  deleteButton.textContent = 'Delete';
  li.appendChild(span);
  li.appendChild(deleteButton);
  deleteButton.addEventListener('click', function() {
    li.remove();
  });
  return li;
}
