const inputText = document.getElementById('inputText');
const ulTask = document.getElementById('ulTask');

let task = JSON.parse(localStorage.getItem("task")) || [];

let positionEdit = undefined;

loadTask();

function addTask() {
  let text = inputText.value.trim();
  if (text != "") {
    if (positionEdit != undefined) {
      task[positionEdit] = inputText.value;
      positionEdit = undefined;
    } else {
      task.push(inputText.value);
    }
    inputText.value = "";
    saveTask();
    loadTask();
  } else {
    alert("Tarefa inválida");
  }
}

inputText.addEventListener("keypress", function (tecla) {
  if (tecla.key === "Enter") {
    addTask();
  }
});

function loadTask() {
  ulTask.innerHTML = "";
  task.forEach((task, position) => {
    const item = document.createElement('li');
    item.className = "item-list";
    item.innerHTML = `
    <span>${task}</span>
        <button id="bottonremove" onclick="editTask(${position})">Editar</button>
        <button id="bottonremove" onclick="removeTask(${position})">X</button>
    `;
    ulTask.appendChild(item);
  });
}

function removeTask(position) {
  task.splice(position, 1);
  saveTask();
  loadTask();
}

function saveTask() {
  localStorage.setItem("task", JSON.stringify(task));
}

function editTask(position) {
  positionEdit = position;
  inputText.value = task[position];
}
