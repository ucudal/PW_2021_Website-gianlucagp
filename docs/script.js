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
    get allUsuarios(){
      return this.usuarios;
    }
    // this could include summary stats like average score, etc. For simplicy, just the count for now
    get numberOfUsuarios(){
        return this.usuarios.length;
    }
 }

let button = document.getElementById("enviar");
let modal;
let backdrop;
let grid;
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
    buttonAccept.addEventListener("click", mostrarResultado);
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


const mostrarResultado = () => {
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

    //grid
    grid=document.createElement("div");
    grid.className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4";
   
    lista.nuevoUsuario(nombre, edad, pais, email);
    //text
    let text_modal;

    lista.usuarios.forEach(function(element) {
      text_modal = document.createElement("p");
      //persona.print();
      text_modal.textContent= "Nombre: " +  element.getNombre() + ", Edad: " + element.edad + ", Pais: " + element.pais + ", Email: " + element.email;
      grid.append(text_modal);
    })

    modal.append(grid);
    
    
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