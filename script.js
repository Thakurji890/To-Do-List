// FORM VALIDATION

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let error = document.getElementById("error");

  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    error.style.color = "red";
    error.textContent = "All field are required";
    return;
  }
  if (!pattern.test(email)) {
    error.style.color = "red";
    error.textContent = "Invalid email Format";
    return;
  }
  error.style.color = "green";
  error.textContent = "Form submitted Successfully";
  //   CLEAR FORM
  document.getElementById("contactForm").reset();
});

// TODO LIST WITH LOCAL STORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task;

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = () => {
      tasks.splice(index, 1);
      updateStorage();
      renderTasks();
    };

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();

  if (!task) return;
  tasks.push(task);
  updateStorage();
  renderTasks();

  input.value = "";
}

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD TASKS ON PAGE LOAD
renderTasks();
