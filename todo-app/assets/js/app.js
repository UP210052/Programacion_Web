// Elementos HTML
const userSelect = document.getElementById("select-users");
const userContainer = document.getElementById("user-container");
const taskContainer = document.getElementById("task-container");
const buttonTask = document.getElementById("updateTask");
let userName = document.getElementById("name");
let userEmail =  document.getElementById("email");
let userTask = document.getElementById("tasks");
let userId = '';


// Codígo nesesario para mostrar información

userSelect.addEventListener("change", (evento) => {
  getInfoUser(evento.target.value);
  userTask.innerHTML = "";
});

buttonTask.addEventListener("click", () => {
  getAllTasks().then((datos) => {
    let task ='';
    for (let i = 0; i < datos.length; i++) {
      if(userId == datos[i].userId){
        if(datos[i].completed) {
          task += '<li> <span>'+ datos[i].title +'</span><input type="checkbox" checked> </li>';
        } else {
          task += '<li> <span>'+ datos[i].title +'</span><input type="checkbox"> </li>';
        }
        
      }
    }
    console.log(task);
    //taskContainer.children[1].innerHTML = task;
    document.getElementById("tasks").innerHTML = task
  });
});

document.addEventListener("DOMContentLoaded", () =>{
  getAllUsers().then((datos) => {
    for (let i = 0; i < datos.length; i++) {
      let option = document.createElement("option");
      option.text = datos[i].firstname;
      option.value = datos[i].id;
      userSelect.add(option);
    }
    userName.innerText = datos[0].firstname + " " + datos[0].lastname;
    userEmail.innerText = datos[0].email;
    userId = datos[0].id;
  });
  getInfoUser(userSelect.value);
})

function getInfoUser(id){
    getAllUsers().then((datos) => {
        console.log(id);
        for (let i = 0; i < datos.length; i++) {
          if(id == datos[i].id) {
            // userContainer.children[1].children[0].children[0].innerText = datos[i].firstname + " " + datos[i].lastname;
            userName.innerText = datos[i].firstname + " " + datos[i].lastname;
            // userContainer.children[1].children[1].children[0].innerText = datos[i].email;
            userEmail.innerText = datos[i].email;
            
            userId = datos[i].id;
            console.log(datos[i]);
            break;
          }
        }
    });
}

// Fin de codígo

// Funciones
/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('http://localhost')
    .then(resp => resp.json());
}

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('http://localhost/tasks.php')
    .then(resp => resp.json());
}



/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador unico del usuario
 * @property {string} firstname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electronico del usuario
 */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador unico de la tarea
 * @property {number} userId IDentificador del uaurio a quien corresponde la tarea
 * @property {string} title Titulo de la tarea
 * @property {boolean} completed Estado de la tarea si esta completada o no
 */
