const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');
const html = document.querySelector('html');
const toggleSwitch = document.querySelector('#toggle-switch');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    input.value = '';
  }
});

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const noteText = noteInput.value.trim();
  if (noteText !== '') {
    const noteItem = createNoteItem(noteText);
    noteList.appendChild(noteItem);
    noteInput.value = '';
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

function createNoteItem(text) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const deleteButton = document.createElement('button');
  p.textContent = text;
  deleteButton.textContent = 'Delete';
  li.appendChild(p);
  li.appendChild(deleteButton);
  deleteButton.addEventListener('click', function() {
    li.remove();
  });
  return li;
}
