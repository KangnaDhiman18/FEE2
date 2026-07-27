(function() {

const todos = [];
const todocontainer = document.getElementById("todo");

const inputtask = document.createElement("input");
inputtask.placeholder = "Enter task..";
inputtask.type = "text";

const addbtn = document.createElement("button");
addbtn.textContent = "Add";

const todolist = document.createElement("div");
todolist.style.border = "2px solid black";

todocontainer.append(inputtask, addbtn, todolist);

function rendertask(currentTask) {

    const todoitem = document.createElement("div");
    todoitem.style.border = "2px solid red";
    todoitem.style.margin = "10px";

    const p = document.createElement("p");
    p.textContent = currentTask;

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";

    const completebtn = document.createElement("button");
    completebtn.textContent = "Complete";

    completebtn.addEventListener("click",function() {
        todoitem.style.backgroundColor = "green" ;
    })

    editbtn.addEventListener("click", function () {

        const editinput = document.createElement("input");
        editinput.type = "text";
        editinput.value = currentTask;

        const savebtn = document.createElement("button");
        savebtn.textContent = "Save";

        todoitem.prepend(editinput, savebtn);
        editinput.focus();

        savebtn.addEventListener("click", function () {

            const updatedtask = editinput.value.trim();

            if (!updatedtask) {
                return;
            }

            p.textContent = updatedtask;

            const index = todos.indexOf(currentTask);

            if (index !== -1) {
                todos[index] = updatedtask;
            }

            currentTask = updatedtask;

            editinput.remove();
            savebtn.remove();

            console.log(todos);
        });

    });

    deletebtn.addEventListener("click", function () {

        todoitem.remove();

        const index = todos.indexOf(currentTask);

        if (index !== -1) {
            todos.splice(index, 1);
        }

        console.log(todos);
    });

    todoitem.append(p, deletebtn, editbtn , completebtn);
    todolist.prepend(todoitem);
}

function addtodo() {

    const task = inputtask.value.trim();

    if (!task) {
        return;
    }

    todos.unshift(task);
    console.log(todos);

    rendertask(task);

    inputtask.value = "";
    inputtask.focus();
}

addbtn.addEventListener("click", addtodo);

inputtask.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addtodo();
    }
});

})();