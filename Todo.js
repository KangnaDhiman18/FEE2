
/*
(function () {

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const todocontainer = document.getElementById("todo");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const message = document.getElementById("message");
const searchTask = document.getElementById("searchTask");



const selectRow = document.createElement("div");
selectRow.className = "selectRow";

const category = document.createElement("select");

category.innerHTML = `
<option value="Personal">Personal</option>
<option value="Work">Work</option>
<option value="Study">Study</option>
<option value="Shopping">Shopping</option>
`;

const dueDate = document.createElement("input");
dueDate.type = "date";

selectRow.append(category, dueDate);

todocontainer.append(selectRow);


const mainInput = document.createElement("div");
mainInput.classList.add("mainInput");

const inputtask = document.createElement("input");
inputtask.type = "text";
inputtask.placeholder = "Enter task...";

const addbtn = document.createElement("button");
addbtn.textContent = "Add";

mainInput.append(inputtask, addbtn);

todocontainer.append(mainInput);



const todolist = document.getElementById("taskList");


const clearBtn = document.createElement("button");
clearBtn.id = "clearCompleted";
clearBtn.textContent = "Clear Completed";

todocontainer.append(clearBtn);



function savetolocal() {

    localStorage.setItem("todos", JSON.stringify(todos));

}


function updateStats() {

    totalTasks.textContent =
        `📝 Total : ${todos.length}`;

    const completed =
        todos.filter(todo => todo.completed).length;

    completedTasks.textContent =
        `✅ Completed : ${completed}`;

}

function showMessage() {

    const completed =
        todos.filter(todo => todo.completed).length;

    if (todos.length === 0) {

        message.textContent =
            "📝 Add your first task.";

    }

    else if (completed === todos.length) {

        message.textContent =
            "🎉 Amazing! All tasks completed.";

    }

    else if (completed > 0) {

        message.textContent =
            "🔥 Keep Going!";

    }

    else {

        message.textContent =
            "💪 Let's get started!";

    }

}


function searchTodos() {

    const value =
        searchTask.value.toLowerCase();

    const items =
        document.querySelectorAll(".todoItem");

    items.forEach(function (item) {

        const text =
            item.querySelector("p")
                .textContent
                .toLowerCase();

        if (text.includes(value)) {

            item.style.display = "flex";

        }

        else {

            item.style.display = "none";

        }

    });

}

searchTask.addEventListener("input", searchTodos);

function refresh() {

    todolist.innerHTML = "";

    todos.forEach(function (todo) {

        rendertask(todo);

    });

    updateStats();

    showMessage();

    searchTodos();

}

function rendertask(todo) {

    const todoitem =
        document.createElement("div");

    todoitem.classList.add("todoItem");

    if (todo.completed) {

        todoitem.classList.add("completed");

    }

    const p =
        document.createElement("p");

    p.textContent = todo.task;

    const cat =
        document.createElement("div");

    cat.className = "category";
    cat.textContent =
        "Category : " + todo.category;

    const date =
        document.createElement("div");

    date.className = "date";

    date.textContent =
        "Due : " +
        (todo.dueDate || "None");



    const buttons =
        document.createElement("div");

    buttons.classList.add("buttons");

    const deletebtn =
        document.createElement("button");

    deletebtn.textContent = "Delete";
    deletebtn.classList.add("delete");

    const editbtn =
        document.createElement("button");

    editbtn.textContent = "Edit";
    editbtn.classList.add("edit");

    const completebtn =
        document.createElement("button");

    completebtn.classList.add("complete");

    completebtn.textContent =
        todo.completed ? "Undo" : "Complete";



    completebtn.addEventListener("click", function () {

        todo.completed = !todo.completed;

        if (todo.completed) {

            todoitem.classList.add("celebrate");

            setTimeout(function () {

                todoitem.classList.remove("celebrate");

            }, 600);

        }

        savetolocal();

        refresh();

    });


    deletebtn.addEventListener("click", function () {

        if (!confirm("Delete this task?")) {

            return;

        }

        const index =
            todos.indexOf(todo);

        if (index !== -1) {

            todos.splice(index, 1);

        }

        savetolocal();

        refresh();

    });



    editbtn.addEventListener("click", function () {

        const editinput =
            document.createElement("input");

        editinput.classList.add("editInput");

        editinput.value = todo.task;

        const savebtn =
            document.createElement("button");

        savebtn.classList.add("save");

        savebtn.textContent = "Save";

        p.style.display = "none";
        cat.style.display = "none";
        date.style.display = "none";

        editbtn.style.display = "none";
        deletebtn.style.display = "none";
        completebtn.style.display = "none";

        todoitem.prepend(editinput, savebtn);

        editinput.focus();

        savebtn.addEventListener("click", function () {

            const updated =
                editinput.value.trim();

            if (!updated) {

                return;

            }

            todo.task = updated;

            savetolocal();

            refresh();

        });

    });

    buttons.append(
        deletebtn,
        editbtn,
        completebtn
    );

    todoitem.append(
        p,
        cat,
        date,
        buttons
    );

    todolist.append(todoitem);

}



    function addtodo() {

        const task = inputtask.value.trim();

        if (!task) {

            alert("Please enter a task.");

            return;

        }

        const newtodo = {

            task: task,

            completed: false,

            category: category.value,

            dueDate: dueDate.value

        };

        todos.unshift(newtodo);

        savetolocal();

        refresh();

        inputtask.value = "";

        dueDate.value = "";

        category.selectedIndex = 0;

        inputtask.focus();

    }

  

    addbtn.addEventListener("click", addtodo);


    inputtask.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            addtodo();

        }

    });


    clearBtn.addEventListener("click", function () {

        const completedCount =
            todos.filter(todo => todo.completed).length;

        if (completedCount === 0) {

            alert("No completed tasks found.");

            return;

        }

        if (!confirm("Remove all completed tasks?")) {

            return;

        }

        for (let i = todos.length - 1; i >= 0; i--) {

            if (todos[i].completed) {

                todos.splice(i, 1);

            }

        }

        savetolocal();

        refresh();

    });

    refresh();

})();*/

(function () {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // HTML Elements
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");

    const category = document.getElementById("category");
    const dueDate = document.getElementById("dueDate");

    const taskList = document.getElementById("taskList");
    const searchTask = document.getElementById("searchTask");

    const message = document.getElementById("message");
    const clearCompleted = document.getElementById("clearCompleted");


    // Save Data
    function saveTodos() {

        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );

    }


    // Update Statistics
    function updateStats() {

        totalTasks.textContent =
            `📝 Total : ${todos.length}`;


        let completed =
            todos.filter(todo => todo.completed).length;


        completedTasks.textContent =
            `✅ Completed : ${completed}`;

    }



    // Message
    function showMessage() {

        let completed =
            todos.filter(todo => todo.completed).length;


        if (todos.length === 0) {

            message.textContent =
                "📝 Add your first task.";

        }

        else if (completed === todos.length) {

            message.textContent =
                "🎉 Amazing! All tasks completed.";

        }

        else if (completed > 0) {

            message.textContent =
                "🔥 Keep Going!";

        }

        else {

            message.textContent =
                "💪 Let's get started!";

        }

    }



    // Render Tasks
    function renderTasks() {

        taskList.innerHTML = "";


        todos.forEach((todo,index)=>{


            const item =
                document.createElement("div");

            item.className="todoItem";


            if(todo.completed){

                item.classList.add("completed");

            }



            const content =
                document.createElement("div");

            content.className="taskContent";



            const title =
                document.createElement("h3");

            title.textContent =
                todo.task;



            const meta =
                document.createElement("div");

            meta.className="meta";


            const cat =
                document.createElement("span");

            cat.className="badge";

            cat.textContent =
                "📂 "+todo.category;



            const date =
                document.createElement("span");

            date.className="badge";

            date.textContent =
                "📅 "+(todo.dueDate || "No Date");



            meta.append(cat,date);


            content.append(title,meta);



            // Buttons

            const buttons =
                document.createElement("div");

            buttons.className="buttons";



            const edit =
                document.createElement("button");

            edit.textContent="Edit";

            edit.className="edit";



            const complete =
                document.createElement("button");

            complete.className="complete";

            complete.textContent =
                todo.completed ? "Undo" : "Complete";



            const del =
                document.createElement("button");

            del.textContent="Delete";

            del.className="delete";



            buttons.append(
                edit,
                complete,
                del
            );



            item.append(
                content,
                buttons
            );


            taskList.append(item);



            // Complete Button

            complete.onclick=function(){

                todo.completed =
                    !todo.completed;


                saveTodos();

                render();

            };



            // Delete Button

            del.onclick=function(){


                if(confirm("Delete this task?")){


                    todos.splice(index,1);


                    saveTodos();

                    render();

                }

            };



            // Edit Button

            edit.onclick=function(){


                const input =
                    document.createElement("input");


                input.className="editInput";

                input.value =
                    todo.task;



                const save =
                    document.createElement("button");


                save.className="save";

                save.textContent="Save";



                content.innerHTML="";

                content.append(
                    input,
                    save
                );


                save.onclick=function(){


                    let updated =
                        input.value.trim();


                    if(updated){


                        todo.task =
                            updated;


                        saveTodos();

                        render();

                    }

                };


            };


        });


    }




    // Search
    searchTask.addEventListener(
        "input",
        function(){

            let value =
                searchTask.value.toLowerCase();


            document
            .querySelectorAll(".todoItem")
            .forEach(item=>{


                let text =
                    item.innerText.toLowerCase();


                item.style.display =
                    text.includes(value)
                    ?
                    "flex"
                    :
                    "none";


            });


        }
    );




    // Add Todo

    function addTodo(){


        let task =
            taskInput.value.trim();



        if(task===""){

            alert("Please enter a task");

            return;

        }



        const todo={


            task:task,

            category:
                category.value,


            dueDate:
                dueDate.value,


            completed:false


        };



        todos.unshift(todo);


        saveTodos();

        render();



        taskInput.value="";

        dueDate.value="";

        category.value="Personal";


        taskInput.focus();


    }




    addBtn.addEventListener(
        "click",
        addTodo
    );



    taskInput.addEventListener(
        "keydown",
        function(e){


            if(e.key==="Enter"){

                addTodo();

            }

        }
    );





    // Clear Completed

    clearCompleted.addEventListener(
        "click",
        function(){


            let completed =
                todos.some(
                    todo=>todo.completed
                );



            if(!completed){

                alert("No completed tasks.");

                return;

            }



            if(confirm(
                "Remove all completed tasks?"
            )){


                todos =
                todos.filter(
                    todo=>!todo.completed
                );


                saveTodos();

                render();


            }


        }
    );





    // Refresh Function

    function render(){

        renderTasks();

        updateStats();

        showMessage();

    }



    // Initial Load

    render();


})();