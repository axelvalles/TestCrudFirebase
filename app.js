firebase.initializeApp({
    apiKey: "AIzaSyBmOsC829x2uLVDSsjTaMrNplclzEQBRa0",
    authDomain: "testcrud-92686.firebaseapp.com",
    projectId: "testcrud-92686"
    });

    var db = firebase.firestore();

//agregar documentos
const addCollection = () =>{

    let nombre = document.getElementById('firstName').value
    let apellido = document.getElementById('lastName').value
    let age = document.getElementById('age').value

    db.collection("users").add({
        Nombre: nombre,
        Apellido: apellido,
        Edad: age
    })
    .then(function(docRef) {
        var notification = alertify.notify("Documento agregado con el ID: " + docRef.id, 'success', 5);
    })
    .catch(function(error) {
        var notification = alertify.notify("Error al añadir documento: "+ error, 'error', 5);
    });

    document.getElementById('firstName').value =''
    document.getElementById('lastName').value =''
    document.getElementById('age').value =''
}

//leer documentos
const getCollection = () => {
    let table = document.getElementById('table')
    db.collection("users").onSnapshot((querySnapshot) => {
        table.innerHTML = ``
        querySnapshot.forEach((doc) => {
            table.innerHTML += 
            `
            <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellido}</td>
            <td>${doc.data().Edad}</td>

            <td><button class="btn btn-warning" onclick="editCollection('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido}','${doc.data().Edad}')"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
            </svg></button></td>
            
            <td><button class="btn btn-danger" onclick="deleteCollection('${doc.id}')"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></button></td>
            </tr>
            `
        });
    });
}

//borrar documentos
const deleteCollection = (id) =>{
    db.collection("users").doc(id).delete().then(function() {
        var notification = alertify.notify("Documento eliminado exitosamente: ", 'error', 5);
    }).catch(function(error) {
        var notification = alertify.notify("Error al eliminar documento :" + error, 'error', 5);
    });

}

//editar documentos
const editCollection = (id,inputNombre,inputApellido,inputEdad)=>{

    document.getElementById('firstName').value = inputNombre   
    document.getElementById('lastName').value  = inputApellido
    document.getElementById('age').value       = inputEdad

    let button = document.getElementById('button')
    button.innerHTML = 
    `
    <span>Guardar</span><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
    </svg>
    `
    
    button.onclick = ()=>{

        let item = db.collection("users").doc(id);

        let nombre = document.getElementById('firstName').value
        let apellido = document.getElementById('lastName').value
        let age = document.getElementById('age').value 

        return item.update({
            Nombre: nombre,
            Apellido: apellido,
            Edad: age
        })
        .then(function() {
            changeButton()
            var notification = alertify.notify("Documento editado exitosamente: ", 'success', 5);
        })
        .catch(function(error) {
            changeButton()
            var notification = alertify.notify("Error al editar documento :" + error, 'error', 5);
        });
        
    }

}

//cambiar icono y boton
const changeButton = ()=>{
    document.getElementById('firstName').value = ''
    document.getElementById('lastName').value = ''
    document.getElementById('age').value = '' 

    button.innerHTML = 
    `
    Agregar <span id="icon"><svg class="bi bi-person-plus-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
    <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
    </svg></span>
    `
}

//ejecutar add cuando se presione enter 
document.getElementById('age').addEventListener('keyup' , (e)=>{
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
    addCollection()
    }
})

getCollection()

//.get().then((querySnapshot)
//.onSnapshot(function(querySnapshot)