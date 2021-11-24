
let button = document.getElementById("boton_info");
let nom_empresa=document.getElementById("nom_empresa");
let btn_contacto=document.getElementById("btn_contacto");
let modal;
let backdrop;
let grid;
let subgrid;
let inputNombre;

function contacto(mensaje) {
  if (modal) return;

  //modal

  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);

  //text

  let text_modal = document.createElement("p");
  text_modal.textContent= mensaje;
  text_modal.innerHTML = text_modal.innerHTML.replace(/\n/g, '<br>\n'); //permite registrar los saltos de linea dentro del html
  modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", cerrarModal);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);

  document.body.append(modal);

}

function desplegar(mensaje) {
  if (modal) return;

  //modal

  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);

  //text

  let text_modal = document.createElement("p");
  text_modal.textContent= mensaje;
  text_modal.innerHTML = text_modal.innerHTML.replace(/\n/g, '<br>\n'); //permite registrar los saltos de linea dentro del html
  modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", cerrarModal);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);

  document.body.append(modal);

}

const cerrarModal = () => {
  backdrop.remove();
  backdrop=null;
  modal.remove();
  modal=null;
}



//btn_contacto.addEventListener("click", contacto("pruebaaaa"));

//button.addEventListener("click", desplegar);

button.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'http://localhost:3000/experiencia-laboral/'+ nom_empresa.textContent);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      console.log("connection was a success");
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      desplegar("Se connecto al servidor, pero retorno un error"); 
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    desplegar("No se pudo conectar al servidor"); 
    console.log("Connection error");
  };

  ourRequest.send();
});

btn_contacto.addEventListener("click", function() {
  desplegar("No se pudo conectar al servidor"); 
});


function renderHTML(data) {

  if (modal) return;

  //modal

  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);

  //text

  let text_modal = document.createElement("p");
  //console.log(data.empresa);
  text_modal.textContent="Nombre Empresa: "+data.empresa + "\nPuesto: "+data.puesto + "\nDescripcion: "+data.descripcion + "\nFecha Inicio: "+data.fechaInicio + "\nFecha Fin:"+data.fechaFin;
  //text_modal.textContent= "Rol de programador junior en la empresa \n Razon de despido: robar la comida de otros empleados\n \n";
  text_modal.innerHTML = text_modal.innerHTML.replace(/\n/g, '<br>\n'); //permite registrar los saltos de linea dentro del html
  modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", cerrarModal);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);

  document.body.append(modal);
}