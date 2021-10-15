class Usuario {
  constructor(nombre_ing, edad_ing, pais_ing, email_ing) {
    if (edad_ing===undefined && pais_ing===undefined  && email_ing===undefined ){ // parameter was omitted in call
      nombre_ing && Object.assign(this, nombre_ing);
      this.print();
    }else{
      this.nombre = String(nombre_ing);
      this.edad = edad_ing;
      this.pais = pais_ing;
      this.email = email_ing;
    }
      
  }
  

  print() {
    console.log("Nombre: " +  this.nombre + ", Edad: " + this.edad + ", Pais: " + this.pais + ", Email: " + this.email);
  }
  getNombre() {
    return this.nombre;
  }
  speak() {
    console.log(`${this.nombre} makes a noise.`);
  }
}
Usuario.prototype.valueOf = function() {
return this.nombre;
};
 
 // Class that holds a collection of players and properties and functions for the group
class Usuarios {
  constructor(){
    this.usuarios = [];
  }
  
  // crea un nuevo usuario y lo guarda enb el array usuarios
  nuevoUsuario(nombre, edad, pais, email){
    let usr = new Usuario(nombre, edad, pais, email);
    //usr.print(); era para debugear
    this.usuarios.push(usr);
    
    return usr;
  }

eliminarUsuario(nombre){
  let i=0;
  let encontrado=false;
  let removed=null;
  while(i<=(this.usuarios.length-1) && encontrado != true){
    if(this.usuarios[i].getNombre().localeCompare(nombre) == 0){
        removed=this.usuarios.splice(i, 1)
        //console.log(i);
        encontrado=true;
    }
    i=i+1;
    //console.log(i);
  }
  return removed;
  }

  get allUsuarios(){
    return this.usuarios;
  }
  // this could include summary stats like average score, etc. For simplicy, just the count for now
  get numberOfUsuarios(){
      return this.usuarios.length;
  }
}

let button = document.getElementById("enviar");
let button2 = document.getElementById("btn_resultados");
let modal;
let backdrop;
let grid;
let subgrid;
let inputNombre;
let lista = new Usuarios();

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
  text_modal.textContent= "Estas seguro de enviar tus datos?";
  modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", ingresarDato);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);
  

  let buttonCancel = document.createElement("button");
  buttonCancel.textContent="Cancelar";
  buttonCancel.addEventListener("click", cerrarModal);
  buttonCancel.className="bg-red-500 p-2 rounded-md text-white";
  modal.append(buttonCancel);

  document.body.append(modal);

}

const cerrarModal = () => {
  backdrop.remove();
  backdrop=null;
  modal.remove();
  modal=null;
}


const ingresarDato = () => {
  backdrop.remove();
  backdrop=null;
  modal.remove();
  modal=null;

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const pais = document.getElementById("pais").value;
  const email = document.getElementById("email").value;
  
  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);

let text_modal;
text_modal = document.createElement("p");

if((nombre.localeCompare("") == 0) || (edad.localeCompare("") == 0) || (pais.localeCompare("") == 0) || (email.localeCompare("") == 0)){
  text_modal.textContent= "Uno de los campos esta vacio, por favor ingrese todos los datos requeridos o te pego un tiro";

}else{
  lista.nuevoUsuario(nombre, edad, pais, email);
  text_modal.textContent= "Se ha ingresado los datos";

  

  
}
modal.append(text_modal);
  let buttonAccept = document.createElement("button");
buttonAccept.textContent="Aceptar";
buttonAccept.addEventListener("click", cerrarModal);
buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
modal.append(buttonAccept);

document.body.append(modal);

}


const mostrarResultado = () => {
if (modal) return;
  
  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);

  //grid
  grid=document.createElement("div");
  grid.className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4";

  //grid colour
  

  //lista.nuevoUsuario(nombre, edad, pais, email);
  //text
  let text_modal;
if(lista.usuarios.length == 0){
  
  text_modal = document.createElement("p");
    //persona.print();
  text_modal.textContent= "Esta vacio la lista de usuarios, ingrese datos cabeza";

  modal.append(text_modal);
}else{
  lista.usuarios.forEach(function(element) {
      subgrid=document.createElement("div");
      subgrid.className="bg-gray-700 rounded-lg shadow-x1 text-white h-24";
      
      text_modal = document.createElement("p");
      //persona.print();
      text_modal.textContent= "Nombre: " +  element.getNombre() + ", Edad: " + element.edad + ", Pais: " + element.pais + ", Email: " + element.email;
      subgrid.append(text_modal);
      grid.append(subgrid);
  })
  modal.append(grid);
  
  let buttonDelete = document.createElement("button");
  buttonDelete.textContent="Eliminar Datos";
  buttonDelete.addEventListener("click", busqueda_Dato_a_borrar);
  buttonDelete.className="bg-red-500 p-2 rounded-md text-white";
  modal.append(buttonDelete);
}
  
  
  
  //modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", cerrarModal);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);

  document.body.append(modal);

}

const busqueda_Dato_a_borrar = () => {
  backdrop.remove();
  backdrop=null;
  modal.remove();
  modal=null;

  
  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);


  //text
  let text_modal;

  text_modal = document.createElement("p");
    //persona.print();
  text_modal.textContent= "Ingrese nombre del usuario a borrar";

  modal.append(text_modal);


inputNombre=document.createElement("input");
  inputNombre.className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
inputNombre.setAttribute("type", "text");
inputNombre.setAttribute("id", "inputNombre");
inputNombre.setAttribute("placeholder", " ");

modal.append(inputNombre);
  
  //modal.append(text_modal);

  //Botones

  let buttonDelete = document.createElement("button");
  buttonDelete.textContent="Aceptar";
  buttonDelete.addEventListener("click", borrarDato);
  buttonDelete.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonDelete);


let buttonCancel = document.createElement("button");
  buttonCancel.textContent="Cancelar";
  buttonCancel.addEventListener("click", cerrarModal);
  buttonCancel.className="bg-red-500 p-2 rounded-md text-white";
  modal.append(buttonCancel);

  document.body.append(modal);
}

const borrarDato = () => {
const nombre = document.getElementById("inputNombre").value;

  backdrop.remove();
  backdrop=null;
  modal.remove();
  modal=null;


  
  modal=document.createElement("div");
  modal.className= "modal";

  //backdrop

  backdrop=document.createElement("div");
  backdrop.className="backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", cerrarModal);


  //text
  let text_modal;
let eliminado = lista.eliminarUsuario(nombre);

  text_modal = document.createElement("p");
    //persona.print();
  
if(eliminado == null){
  text_modal.textContent= "No se ha encontrado al usuario "+nombre+" dentro de la lista";
}else{
  text_modal.textContent= "Se ha eliminado al usuario "+nombre+" de la lista";
}
  

  modal.append(text_modal);


  //modal.append(text_modal);

  //Botones

  let buttonAccept = document.createElement("button");
  buttonAccept.textContent="Aceptar";
  buttonAccept.addEventListener("click", cerrarModal);
  buttonAccept.className="bg-green-500 p-2 rounded-md text-white";
  modal.append(buttonAccept);



  document.body.append(modal);
}


button.addEventListener("click", desplegar);
button2.addEventListener("click", mostrarResultado);