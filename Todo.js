(function () {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

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

    function saveTodos() {
        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );
    }

    function updateStats() {
        totalTasks.textContent =
            `📝 Total : ${todos.length}`;
        let completed =
            todos.filter(todo => todo.completed).length;
        completedTasks.textContent =
            `✅ Completed : ${completed}`;
    }

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
            complete.onclick=function(){
                todo.completed =
                    !todo.completed;
                saveTodos();
                render();
            };

            del.onclick=function(){
                if(confirm("Delete this task?")){
                    todos.splice(index,1);
                    saveTodos();
                    render();
                }
            };

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

    function render(){
        renderTasks();
        updateStats();
        showMessage();
    }
    render();
})();