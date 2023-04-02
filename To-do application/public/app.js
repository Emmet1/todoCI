const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

const html = document.querySelector('html');

const toggleSwitch = document.querySelector('#toggle-switch');
const toggleLabel = document.querySelector('#toggle-label');

const deleteAllButton = document.getElementById('delete-all');
const deleteAllNotesButton = document.getElementById('delete-all-notes');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleLabel.textContent = 'Light Mode 🌕';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleLabel.textContent = 'Dark Mode 🌑';
  }    
});

// When the page loads, retrieve any saved to-do items, dark mode and notes from local storage
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled')) || false;
const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

// Display the saved to-do items, dark mode and notes on the page
savedTodos.forEach((todoText) => {
  const todoItem = createTodoItem(todoText);
  todoList.appendChild(todoItem);
});

if (darkModeEnabled) {
  html.setAttribute('data-theme', 'dark');
  toggleSwitch.checked = true;
}

savedNotes.forEach((noteText) => {
  const noteItem = createNoteItem(noteText);
  noteList.appendChild(noteItem);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    input.value = '';

    // Save the to-do item to local storage
    savedTodos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
  }
});

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const noteText = noteInput.value.trim();
  if (noteText !== '') {
    const noteItem = createNoteItem(noteText);
    noteList.appendChild(noteItem);
    noteInput.value = '';

    // Save the note to local storage
    savedNotes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  }
});

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('darkModeEnabled', true);
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('darkModeEnabled', false);
  }
});

deleteAllButton.addEventListener('click', function() {
  // Remove all to-do items from the list
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  // Remove all to-do items from local storage
  localStorage.removeItem('todos');
});

deleteAllNotesButton.addEventListener('click', function() {
  // Remove all note items from the list
  while (noteList.firstChild) {
    noteList.removeChild(noteList.firstChild);
  }

  // Remove all note items from local storage
  localStorage.removeItem('notes');
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

    // Remove the to-do item from local storage
    savedTodos.splice(savedTodos.indexOf(text), 1);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
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

    // Remove the note from local storage
    savedNotes.splice(savedNotes.indexOf(text), 1);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  });
  return li;
}