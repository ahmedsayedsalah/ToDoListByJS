
let input= document.querySelector(".input");
let btn= document.querySelector(".Add");
let tasksDiv= document.querySelector(".tasks");
let clearAll= document.querySelector(".delAll span");

let arrOfTasks=[];

GetDataFromLocalStorage();

// add tasks
btn.addEventListener("click",function(){
    if(input.value !== "")
    {
        addTaskToArray(input.value);
        input.value = "";
    }
});

tasksDiv.addEventListener("click",function(e){
    // delete specific task
    if(e.target.classList.contains("del"))
    {
        deleteDataFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    // task is completed
    if(e.target.classList.contains("task"))
    {
        toggleStatusTask(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});

// delete all of tasks
clearAll.addEventListener("click",function()
{
    tasksDiv.innerHTML= "";
    arrOfTasks= [];
    localStorage.clear();
});

function addTaskToArray(taskText)
{
    let task={
        id: Date.now(),
        title: taskText,
        completedTask: false
    };
    arrOfTasks.push(task);
    addElementsToPage(arrOfTasks);
    addDataToLocalStorage(arrOfTasks);
}

function addElementsToPage(arr)
{
    tasksDiv.innerHTML="";
    arr.forEach(task => {
        let div= document.createElement("div");
        div.className= "task";
        if(task.completedTask)
            div.className= "task done";
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span= document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorage(arr)
{
    localStorage.setItem("tasks",JSON.stringify(arr));
}

function GetDataFromLocalStorage()
{
    if(localStorage.getItem("tasks"))
        {
            arrOfTasks= JSON.parse(localStorage.getItem("tasks"));
            addElementsToPage(arrOfTasks);
        }
}

function deleteDataFromLocalStorage(taskId)
{
    arrOfTasks= arrOfTasks.filter(task => task.id != taskId);
    addDataToLocalStorage(arrOfTasks);
}

function toggleStatusTask(taskId)
{
    arrOfTasks.forEach(task=>
    {
        if(task.id == taskId)
        (task.completedTask == false)? task.completedTask = true:task.completedTask = false;
    }
    );
    addDataToLocalStorage(arrOfTasks);
}