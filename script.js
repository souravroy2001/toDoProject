let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];


document.addEventListener("DOMContentLoaded", function () {
  createTask(taskArray);
});

document.querySelector("form").addEventListener("submit", submitToDo);


function submitToDo(event) {
  event.preventDefault();
  const task = document.querySelector("input[type='text']").value;
  const priority = document.querySelector("select").value;

  const taskObj = {
    taskName: task,
    priority: priority,
  };

  taskArray.push(taskObj);
  updateLocalStorage();
  createTask(taskArray);
  document.querySelector("input[type='text']").value = ""
}

function createTask(taskArray) {
  document.querySelector("tbody").innerHTML = "";
  taskArray.forEach((element, index) => {
    document.querySelector("tbody").innerHTML += `
      <tr>
        <td>${element.taskName}</td>
        <td>${element.priority}</td>
        <td class="deleteItem" data-index="${index}">delete</td>
      </tr>
    `;
  });
}


document.querySelector("tbody").addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteItem")) {
    deleteTask(event.target);
  }
});

function deleteTask(deleteBtn) {
  const taskIndex = deleteBtn.getAttribute("data-index");
  taskArray.splice(taskIndex, 1);
  updateLocalStorage();
  createTask(taskArray);
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
