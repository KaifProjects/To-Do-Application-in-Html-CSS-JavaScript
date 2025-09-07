const inputBox = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");
const counter = document.getElementById("counter");

// Add task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Please write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // cross sign
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
  updateCounter();
}

// Mark / delete task
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    updateCounter();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
    updateCounter();
  }
}, false);

// Save tasks
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Show tasks on load
function showData() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
showData();
updateCounter();

// Clear all tasks
function clearAll() {
  listContainer.innerHTML = "";
  saveData();
  updateCounter();
}

// Update counter
function updateCounter() {
  let total = listContainer.getElementsByTagName("li").length;
  let completed = listContainer.getElementsByClassName("checked").length;
  counter.innerText = `${total} task${total !== 1 ? "s" : ""} (${completed} completed)`;
}
