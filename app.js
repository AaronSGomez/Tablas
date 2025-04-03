let personas = JSON.parse(localStorage.getItem("personas")) || [];
//[{"nombre":"Ana","edad":30}{"nombre":"Ana","edad":30}{"nombre":"Ana","edad":30}]  esto se guarda en el local storage en este formato
let editIndex = -1;
window.onload = ()=>{
  actualizarTabla();
}

/* AGREGAR CAMPO */
document.getElementById('Agregar').addEventListener('click',()=>{
  let nombre = document.getElementById('nombre').value.trim();
  let edad = document.getElementById('edad').value.trim();
  let ocupacion = document.getElementById('ocupacion').value.trim();
  let generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  let genero = generoSeleccionado ? generoSeleccionado.value : "No seleccionado";
  
  if(nombre==='' && edad==='' && ocupacion===''){
    alert('Rellene los campos');
    return;
  }
  
  let persona= {
    nombre :nombre,
    edad: edad,
    ocupacion: ocupacion,
    genero: genero
  }
  personas.push(persona);
  guardarLocalStorage();
  limpiarFormulario();

actualizarTabla();
})

//LIMPIAR FORMULARIO
function limpiarFormulario(){
  document.getElementById('nombre').value='';
  document.getElementById('edad').value='';
  document.getElementById('ocupacion').value='';
  let radios= document.querySelectorAll('input[name="genero"]');
  radios.forEach(radio=>{
    radio.checked=false;
  })
}

/* ELIMINAR CAMPO */
function eliminar(index){
  personas.splice(index,1);
  actualizarTabla();
  guardarLocalStorage();
}

/* EDITAR TABLA */
function editarPersona(index){
  let persona=  personas[index];
  document.querySelector('#nombre').value=persona.nombre;
  document.querySelector('#edad').value=persona.edad;
  document.querySelector('#ocupacion').value=persona.ocupacion;
  let radios= document.querySelectorAll('input[name="genero"]');
  radios.forEach(radio=>{
    if(radio.value===persona.genero){
      radio.checked=true;
    }else{
      radio.checked=false;
    }
  })
  document.querySelector('#Agregar').style.display='none';
  document.querySelector('#Actualizar').style.display='block';
  editIndex = index;
  guardarLocalStorage();
}

/* ACTUALIZAR CAMPO */
document.querySelector('#Actualizar').addEventListener('click',()=>{
  let nombre = document.getElementById('nombre').value.trim();
  let edad = document.getElementById('edad').value.trim();
  let ocupacion = document.getElementById('ocupacion').value.trim();
  let generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  let genero = generoSeleccionado ? generoSeleccionado.value : "No seleccionado";
  
  if(nombre==='' && edad==='' && ocupacion===''){
    alert('Rellene los campos');
    return;
  }
  
  let persona= {
    nombre :nombre,
    edad: edad,
    ocupacion: ocupacion,
    genero: genero
  }
  personas[editIndex]=persona;
  guardarLocalStorage();
  limpiarFormulario();
  
 document.querySelector('#Agregar').style.display='block';
 document.querySelector('#Actualizar').style.display='none';
 guardarLocalStorage();
 actualizarTabla();
})

/* ACTUALIZAR TABLA */
function actualizarTabla(){
  const tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  for(let i=0; i<personas.length; i++){
    let fila = `<tr>
    <td>${personas[i].nombre}</td>
    <td>${personas[i].edad}</td>
    <td>${personas[i].ocupacion}</td>
    <td>${personas[i].genero}</td>
    <td class="acciones">
    <button class="edit" onclick="editarPersona('${i}')">Modificar</button>
    <button class="delete" onclick="eliminar('${i}')">Eliminar</button>
    </td>
    </tr>`;
    tabla.innerHTML += fila;
  }
}

//GUARDAR EN LOCAL STORAGE
function guardarLocalStorage(){
  localStorage.setItem("personas",JSON.stringify(personas));
}

//DESCARGAR XML
function descargarXML(){
  let xml= '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<personas>';
  personas.forEach(p =>{
    xml+= `<persona>
        <nombre>${p.nombre}</nombre>
        <edad>${p.edad}</edad>
        <ocupacion>${p.ocupacion}</ocupacion>
        <genero>${p.genero}</genero>
        </persona>`;
  })
  xml+= '</personas>';
  const blob= new Blob([xml],{type:'application/xml'});

  const a = document.createElement("a"); //creamos elemento enlace a
  a.href = URL.createObjectURL(blob); //asignamos url
  a.download = "personas.xml"; //asignamos nombre y extension al archivo para que no descargue un sin nombre
  a.click(); //hacemos evento click para disparar el evento

}

//IMPORTAR XML

//event.target
//event.target.
document.getElementById("fileInput").addEventListener("change", function(event){
   const file = event.target.files[0];
      if(!file){ 
        alert("No se selecciono ningun archivo"); 
        return
      }
   const reader = new FileReader();

});