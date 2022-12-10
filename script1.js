const write_tasks = document.getElementById("write_tasks");
const submit = document.getElementById("submit_button");
const input = document.getElementById("add_details");
const todoList = document.querySelector(".todo-list");
const navbar = document.querySelector("#navbar");
const remove = document.querySelector("#remove_all");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed")

submit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
navbar.addEventListener("click", filtherTodo);
document.addEventListener('DOMContentLoaded', getTodos);



function addTodo(event) {
    event.preventDefault();
    if (input.value != 0) {
        // creat todo div
        const todoDiv =document.createElement("div");
        todoDiv.classList.add("todo");
        
        // creat completed button
        const completedButton = document.createElement("input");
        completedButton.setAttribute("type", "checkbox");
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // save local todos 
        saveLocalTodos(input.value);
        
        // add todo tasks in list
        const task = document.createElement("li");
        task.innerText = input.value;
        task.classList.add("todo-task")
        todoDiv.appendChild(task);
        
        // creat trash button
        const trashButton = document.createElement("button");
        trashButton.setAttribute("type","button")
        trashButton.classList.add("trash-btn");
        trashButton.innerText = 'X';
        todoDiv.appendChild(trashButton);
        
        todoList.appendChild(todoDiv);
        input.value = "";

    } else {
        alert("Fill the form below");
    }
}

function deleteCheck(e) {
    const item = e.target;
    // Delete task 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    // Complete task
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtherTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.nodeType == Node.ELEMENT_NODE) {
            switch(e.target.value) {
                case "all":
                    todo.style = "display: flex";
                    write_tasks.style = "display: flex";
                    all.style = "border-bottom: 4px solid #2F80ED";
                    active.style = "border-bottom:transparent";
                    completed.style = "border-bottom: transparent";
                    
                    break
                case "active":
                    if (todo.classList.contains("completed")) {
                        todo.style = "display: none";
                        
                    } else {
                        todo.style = "display: flex";
                    }
                    write_tasks.style = "display: flex";
                    all.style = "border-bottom: transparent";
                    active.style = "border-bottom: 4px solid #2F80ED";
                    completed.style = "border-bottom: transparent";
                    break
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style = "display: flex";
                    } else {
                        todo.style = "display: none";
                    }
                    write_tasks.style = "display: none";
                    all.style = "border-bottom: transparent";
                    active.style = "border-bottom: transparent";
                    completed.style = "border-bottom: 4px solid #2F80ED";
                    break
            }
        }
    })
}
all.style = "border-bottom: 4px solid #2F80ED";

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
} 

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // creat todo div
        const todoDiv =document.createElement("div");
        todoDiv.classList.add("todo");
        
        // creat completed button
        const completedButton = document.createElement("input");
        completedButton.setAttribute("type", "checkbox");
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // add todo tasks in list
        const task = document.createElement("li");
        task.innerText = todo;
        task.classList.add("todo-task")
        todoDiv.appendChild(task);
        
        // creat trash button
        const trashButton = document.createElement("button");
        trashButton.setAttribute("type","button")
        trashButton.classList.add("trash-btn");
        trashButton.innerText = 'X';
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}