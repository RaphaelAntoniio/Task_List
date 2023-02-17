const inputTask = document.querySelector('.inputTask');
const btnAddTask = document.querySelector('.btnAddTask');
const taskList = document.querySelector('.task-list');

function createTaskElement(taskText) {
  const taskElement = document.createElement('li');
  taskElement.innerText = taskText;
  return taskElement;
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete');
  return deleteButton;
}

function appendTaskElement(taskElement, taskList) {
  taskList.appendChild(taskElement);
}

function appendDeleteButtonToTaskElement(deleteButton, taskElement) {
  taskElement.appendChild(deleteButton);
}

function cleanInput() {
  inputTask.value = '';
  inputTask.focus();
}

function saveTasks() {
  const taskElements = taskList.querySelectorAll('li');
  const taskTexts = Array.from(taskElements).map((element) =>
    element.innerText.replace('Delete', '').trim()
  );
  const taskJson = JSON.stringify(taskTexts);
  localStorage.setItem('tasks', taskJson);
}

function readTasks() {
  const taskJson = localStorage.getItem('tasks');
  if (taskJson) {
    const taskTexts = JSON.parse(taskJson);
    taskTexts.forEach((taskText) => {
      const taskElement = createTaskElement(taskText);
      const deleteButton = createDeleteButton();
      appendDeleteButtonToTaskElement(deleteButton, taskElement);
      appendTaskElement(taskElement, taskList);
    });
  }
}

function addTask() {
  const taskText = inputTask.value;
  if (taskText) {
    const taskElement = createTaskElement(taskText);
    const deleteButton = createDeleteButton();
    appendDeleteButtonToTaskElement(deleteButton, taskElement);
    appendTaskElement(taskElement, taskList);
    cleanInput();
    saveTasks();
  }
}

function deleteTask(element) {
  if (element.classList.contains('delete')) {
    element.parentElement.remove();
    saveTasks();
  }
}

inputTask.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

btnAddTask.addEventListener('click', addTask);

taskList.addEventListener('click', (event) => {
  deleteTask(event.target);
});

readTasks();
