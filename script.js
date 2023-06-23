// BRING IN ELEMENTS FROM HTML
const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e);
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;
    todo?todoText = todo.text: null;
    // console.log(todoText);
    if (todoText) {
        const todoEL = document.createElement("li");
        if (todo && todo.completed) {
            todoEL.classList.add("completed");
        };

        // MAKE THE TEXT OF THE LIST ITEM THE SAME AS THE INPUT
        todoEL.innerText = todoText;

        // APPEND TODO LIST ITEM TO THE TODO UNORDERED LIST
        todoUL.appendChild(todoEL);

        // CLEAR OUT AFTER ENTRY
        input.value = "";

        // ADDING "COMPLETED" CLASS TO LIST ELEMENTS THAT WERE (LEFT) CLICKED
        todoEL.addEventListener("click", ()=> {
            todoEL.classList.toggle("completed");
            updateLS();
        });

        // "CONTEXTMENU" IS BASICALLY THE RIGHT CLICK (OR "TWO-FINGER CLICK" ON TRACKPADS)
        todoEL.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            // REMOVE THE LIST ITEM
            todoEL.remove();
            updateLS();
        });
    };
    updateLS();
};

function updateLS() {
    const todosEl = document.querySelectorAll("li"); //NOTES LIST
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
};