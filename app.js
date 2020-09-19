//declaration
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const todoOption = document.querySelector(".filter-todo");

const d = new Date();
const Mo = d.getUTCMonth();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[d.getDay()];
const dayy = d.getUTCDay();
const H = d.getUTCHours() + 1;
const M = d.getUTCMinutes();
const S = d.getUTCSeconds();

// addEventListener
addBtn.addEventListener("click", addtodo);
todoList.addEventListener("click", deleteElemnt);
todoList.addEventListener("click", checkElemnt);
todoOption.addEventListener("click", todoFilter);
document.addEventListener("DOMContentLoaded", showSaved);
document.addEventListener("DOMContentLoaded", showChecked);

//function
//add todos to the list
function addtodo(e) {
  e.preventDefault();
  if (todoInput.value != "") {
    creatElement();
  } else {
    const errorFill = document.querySelector(".errorfill");
    const errortext = document.createElement("h2");
    if (errorFill.hasChildNodes() == false) {
      errorFill.appendChild(errortext);
      errortext.innerText =
        " so are you sure you have nothing to do  \n ==>the field is empty <==";
      setTimeout(() => {
        errortext.remove();
      }, 1000);
    }
  }
}

function creatElement() {
  //creat Element
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoLi = document.createElement("li");
  todoLi.innerHTML =
    todoInput.value +
    " (" +
    Mo +
    "/" +
    dayy +
    " " +
    day +
    H +
    ":" +
    M +
    ":" +
    S +
    ")";
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);
  //save the todos locale
  saveToLocale(todoLi.innerText);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" >  <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>';
  completedBtn.classList.add("completed-btn");
  todoDiv.appendChild(completedBtn);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML =
    '  <svg  xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"><path d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z"/></svg>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  //add to the ul
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteElemnt(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const itemldelete = item.parentElement;
    itemldelete.classList.add("delete-anime");
    deleteFromLocale(itemldelete);
    todoList.addEventListener("transitionend", () => {
      itemldelete.remove();
    });
  }
}
//check todo
function checkElemnt(e) {
  const item = e.target;

  if (item.classList[0] === "completed-btn") {
    let itemlcheck = item.parentElement;
    itemlcheck.classList.toggle("check-anime");
    saveChecked(itemlcheck);
  }
}

//todo filter
function todoFilter(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "complete":
        if (todo.classList.contains("check-anime")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!todo.classList.contains("check-anime")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "all":
        todo.style.display = "flex";
        break;
    }
  });
}

//save in local storage
function saveToLocale(todo) {
  let todosArray;
  //check if alredy there is somthing
  if (localStorage.getItem("todosArray") === null) {
    todosArray = [];
  } else {
    todosArray = JSON.parse(localStorage.getItem("todosArray"));
  }

  todosArray.push(todo);
  localStorage.setItem("todosArray", JSON.stringify(todosArray));
}

//delete from localestorage
function deleteFromLocale(todo) {
  let todosArray;
  //check if alredy there is somthing
  if (localStorage.getItem("todosArray") === null) {
    todosArray = [];
  } else {
    todosArray = JSON.parse(localStorage.getItem("todosArray"));
  }

  const todosIndex = todo.children[0].innerText;
  const index = todosArray.indexOf(todosIndex);

  // console.log(todosIndex);
  todosArray.splice(index, 1);
  localStorage.setItem("todosArray", JSON.stringify(todosArray));
}

//show the saved todos
function showSaved(todo) {
  let todosArray;
  //check if alredy there is somthing
  if (localStorage.getItem("todosArray") === null) {
    todosArray = [];
  } else {
    todosArray = JSON.parse(localStorage.getItem("todosArray"));
  }

  todosArray.forEach(function (todo) {
    //creat Element
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoLi = document.createElement("li");
    todoLi.innerHTML = todo;

    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" >  <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML =
      '  <svg  xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"><path d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z"/></svg>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //add to the ul
    todoList.appendChild(todoDiv);
  });
}

/////////////////
function saveChecked(itemlcheck) {
  const todoLichecked = itemlcheck.classList.contains("check-anime");
  let todosArraychecked = [];

  if (todoLichecked) {
    //check if alredy there is somthing
    if (localStorage.getItem("todosArraychecked") === null) {
      todosArraychecked = [];
    } else {
      todosArraychecked = JSON.parse(localStorage.getItem("todosArraychecked"));
    }
    if (!todosArraychecked.includes(itemlcheck.firstChild.innerText)) {
      todosArraychecked.push(itemlcheck.firstChild.innerText);
      localStorage.setItem(
        "todosArraychecked",
        JSON.stringify(todosArraychecked)
      );
    }
  }
}

//dirlha event listner on load
function showChecked(todosChecked) {
  let todosArraychecked;
  //check if alredy there is somthing
  if (localStorage.getItem("todosArraychecked") === null) {
    todosArraychecked = [];
  } else {
    todosArraychecked = JSON.parse(localStorage.getItem("todosArraychecked"));
  }

  const todoitem = document.querySelectorAll(".todo-item");
  let todoitemi;
  var i = 0;
  for (i = 0; i < todoitem.length; i++) {
    todoitemi = todoitem[i].innerText;
    let todosss;
    todosArraychecked.forEach((element) => {
      todosss = element;
      if (todosss == todoitemi) {
        todoitem[i].parentElement.classList.add("check-anime");
      }
    });
  }
}
