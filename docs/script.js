
let button = document.getElementById("boton_info");
let modal;
let backdrop;
let grid;
let subgrid;
let inputNombre;

const desplegar = () => {
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
  text_modal.textContent= "Rol de programador junior en la empresa \n Razon de despido: robar la comida de otros empleados\n \n";
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





button.addEventListener("click", desplegar);