const inputbox = document.getElementById('inputbox');
const addbtn = document.getElementById('addbtn');
const todoList = document.getElementById('todoList');
let isEditing = false;
let currentLi = null;

const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) {
        alert("Error!..Enter Task");
    } else if (isEditing) {
        currentLi.querySelector('p').innerHTML = inputText;
        updateLocalTodos(currentLi.dataset.index, inputText);
        isEditing = false;
        currentLi = null;
        addbtn.value = "Add Task";
        inputbox.value = "";
    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        const editbtn = document.createElement("i");
        editbtn.classList.add('fa-solid', 'fa-pencil', 'edit-icon');
        li.appendChild(editbtn);

        const deletebtn = document.createElement("i");
        deletebtn.classList.add('fa-solid', 'fa-trash-arrow-up', 'delete-icon');
        li.appendChild(deletebtn);

        deletebtn.addEventListener('click', () => {
            todoList.removeChild(li);
            removeLocalTodos(li.dataset.index);
        });

        editbtn.addEventListener('click', () => {
            inputbox.value = p.innerHTML;
            addbtn.value = "Edit Task";
            isEditing = true;
            currentLi = li;
        });

        li.dataset.index = saveLocalTodos(inputText);
        todoList.appendChild(li);
        inputbox.value = "";
    }
};

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return todos.length - 1;
};

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        const editbtn = document.createElement("i");
        editbtn.classList.add('fa-solid', 'fa-pencil', 'edit-icon');
        li.appendChild(editbtn);

        const deletebtn = document.createElement("i");
        deletebtn.classList.add('fa-solid', 'fa-trash-arrow-up', 'delete-icon');
        li.appendChild(deletebtn);

        deletebtn.addEventListener('click', () => {
            todoList.removeChild(li);
            removeLocalTodos(index);
        });

        editbtn.addEventListener('click', () => {
            inputbox.value = p.innerHTML;
            addbtn.value = "Edit Task";
            isEditing = true;
            currentLi = li;
        });

        li.dataset.index = index;
        todoList.appendChild(li);
    });
};

const updateLocalTodos = (index, newTodo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos[index] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeLocalTodos = (index) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener('DOMContentLoaded', getLocalTodos);
addbtn.addEventListener('click', addTodo);
