const activeNavlink = document.getElementById("activeCategory");
const allNavlink = document.getElementById("allCategory");
const completedNavlink = document.getElementById("completedCategory");

const activeDiv = document.getElementsByClassName("activeTasks")[0];
const allDiv = document.getElementsByClassName("allTasks")[0];
const completedDiv = document.getElementsByClassName("completedDiv")[0];

const newTask = document.forms["newTask"];
const activeTasks = localStorage.getItem("activeTasks")
  ? JSON.parse(localStorage.getItem("activeTasks"))
  : [];
const completedTasks = localStorage.getItem("completedTasks")
  ? JSON.parse(localStorage.getItem("completedTasks"))
  : [];

const renderTodos = () => {
  if (activeTasks) {
    activeDiv.innerHTML = "";
    activeTasks.map((task, index) => {
      const divtoInsert = document.createElement("div");
      divtoInsert.setAttribute("id", index);
      divtoInsert.innerHTML = `<input type="checkbox" id=${index} /><p class="task">${task}</p>`;
      activeDiv.appendChild(divtoInsert);
    });
  }

  if (completedTasks) {
    completedDiv.innerHTML = "";
    completedTasks.map((task, index) => {
      const divtoInsert = document.createElement("div");
      divtoInsert.setAttribute("id", index);
      divtoInsert.innerHTML = `<div class="alignDiv">
              <div>
                  <input type="checkbox" id=${index} checked />
                  <p class="completedTask task">${task}</p>
              </div>
              <span class="material-icons" data-type="deletetask" id=${index} style="color: #BDBDBD"
                  >
                  delete
              </span>
          </div>`;
      completedDiv.appendChild(divtoInsert);
    });
  }
};

const toggleVisibility = (div) => {
  if (div == activeDiv) {
    activeDiv.style.display = "block";
    completedDiv.style.display = "none";
    activeNavlink.className = "taskCategory active";
    completedNavlink.className = "taskCategory";
    allNavlink.className = "taskCategory";
  } else if (div == completedDiv) {
    completedDiv.style.display = "block";
    activeDiv.style.display = "none";
    completedNavlink.className = "taskCategory active";
    allNavlink.className = "taskCategory";
    activeNavlink.className = "taskCategory";
  } else {
    activeDiv.style.display = "block";
    completedDiv.style.display = "block";
    allNavlink.className = "taskCategory active";
    activeNavlink.className = "taskCategory";
    completedNavlink.className = "taskCategory";
  }
  renderTodos();
};

const addTodo = (todo) => {
  if (todo != "") {
    activeTasks.push(todo);
  }
  localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  renderTodos();
};

window.onload = renderTodos;

activeNavlink.addEventListener("click", () => toggleVisibility(activeDiv));

allNavlink.addEventListener("click", () => toggleVisibility(allDiv));

completedNavlink.addEventListener("click", () =>
  toggleVisibility(completedDiv)
);

document.addEventListener("click", (event) => {
  if (event.target.type == "checkbox") {
    if (event.target.checked) {
      const done = activeTasks.splice(event.target.id, 1);
      completedTasks.push(done);
      localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
    renderTodos();
  }
});

newTask.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(event.target[0].value);
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type == "deletetask") {
    const index = event.target.id;
    completedTasks.splice(index, 1);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    renderTodos();
  }
});
