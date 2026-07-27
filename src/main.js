const tasks = [
  { id: 1, title: 'Plan the week', category: 'Work', done: false },
  { id: 2, title: '30 minute walk', category: 'Health', done: true },
  { id: 3, title: 'Pay utilities', category: 'Money', done: false },
];

const taskList = document.querySelector('#task-list');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const searchInput = document.querySelector('#search');
const taskCount = document.querySelector('#task-count');
const taskDetail = document.querySelector('#task-detail');
const openCount = document.querySelector('#open-count');

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => `${task.title} ${task.category}`.toLowerCase().includes(query));
  taskList.innerHTML = '';

  visibleTasks.forEach((task) => {
    const item = document.createElement('article');
    item.className = `task-item${task.done ? ' complete' : ''}`;
    item.innerHTML = `
      <button class="check" aria-label="Toggle ${task.title}">✓</button>
      <div><strong></strong><span></span></div>
      <button class="delete" aria-label="Delete ${task.title}">×</button>
    `;
    item.querySelector('strong').textContent = task.title;
    item.querySelector('span').textContent = task.category;
    item.querySelector('.check').addEventListener('click', () => toggleTask(task.id));
    item.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));
    taskList.append(item);
  });

  const openTasks = tasks.filter((task) => !task.done).length;
  taskCount.textContent = tasks.length;
  taskDetail.textContent = `${openTasks} still open`;
  openCount.textContent = openTasks;
}

function addTask(event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;
  tasks.unshift({ id: Date.now(), title, category: 'Personal', done: false });
  taskInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);
  task.done = !task.done;
  renderTasks();
}

function deleteTask(id) {
  const index = tasks.findIndex((item) => item.id === id);
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
searchInput.addEventListener('input', renderTasks);
renderTasks();
