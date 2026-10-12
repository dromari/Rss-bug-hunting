const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  // [Баг 2]
  const text = input.value.trim();
  if (!text) {
    errorEl.textContent = "Введите текст задачи";
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  // [Баг 5]
  if (task) {
    task.done = !task.done;
    render();
  }
}

function deleteTask(id) {
  // [Баг 6]
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  // [Баг 10]
  tasks = tasks.filter((t) => !t.done);
  render();
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((t) => !t.done);
  }
  // [Баг 8]
  if (currentFilter === "done") {
    return tasks.filter((t) => t.done);
  }
  return tasks;
}

function updateCounter() {
  // [Баг 7]
  const activeCount = tasks.filter((t) => !t.done).length;
  counter.textContent = "Активных задач: " + activeCount;
}

function render() {
  // [Баг 9]
  list.innerHTML = "";

  const visible = getVisibleTasks();

  // [Баг 3]
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";

    // [Баг 4]
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

// [Баг 1]
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
