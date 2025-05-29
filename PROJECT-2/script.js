let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    saveTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete" onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏</button>
        <button class="delete" onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

renderTasks();
