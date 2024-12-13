// Sélection des éléments
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

let counterTaskComplete = document.querySelectorAll('.completed').length;
let counterTaskNotComplete = document.querySelectorAll('li').length;


document.getElementById("notComplete").textContent = counterTaskNotComplete;
document.getElementById("complete").textContent = counterTaskComplete;

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = prompt("Entrez la description de la tâche :");
    if (taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        addButtons(li);
        taskList.appendChild(li);
        counterTaskComplete = document.querySelectorAll('.completed').length;
        counterTaskNotComplete = (document.querySelectorAll('li').length - counterTaskComplete);
        document.getElementById("notComplete").textContent = counterTaskNotComplete;
        document.getElementById("complete").textContent = counterTaskComplete;
    }
}

// Fonction pour ajouter des boutons Modifier et Supprimer
function addButtons(task) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifier";
    editBtn.className = "btn";
    editBtn.addEventListener("click", () => editTask(task));
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.className = "btn";
    deleteBtn.addEventListener("click", () => {
        if(confirm("Souhaitez-vous supprimer cette tâche ?")) {
            task.remove();
        }
    });  
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);
}

// Écouteur d’événement sur le bouton Ajouter
addTaskBtn.addEventListener("click", addTask);

// Fonction pour marquer une tâche comme terminée
taskList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
        counterTaskComplete = document.querySelectorAll('.completed').length;
        counterTaskNotComplete = (document.querySelectorAll('li').length - counterTaskComplete);
        document.getElementById("notComplete").textContent = counterTaskNotComplete;
        document.getElementById("complete").textContent = counterTaskComplete;
    }
});

// Fonction pour modifier une tâche
function editTask(task) {
    const newText = prompt("Modifiez la description :",
    task.firstChild.textContent);
    if (newText) {
        task.firstChild.textContent = newText;
    }
}

// Barre de recherche
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (event) => {
    const filter = event.target.value.toLowerCase();
    const tasks = taskList.getElementsByTagName("li");
    Array.from(tasks).forEach((task) => {
        const text = task.firstChild.textContent.toLowerCase();
        task.style.display = text.includes(filter) ? "" : "none";
    });
});