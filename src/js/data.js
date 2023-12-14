export {mostrarData};
function mostrarData() {
  //Declaramos las variables.
  let mostrarFecha = document.getElementById('fecha');
  let mostrarReloj = document.getElementById('reloj');
  let fecha = new Date();
  
  //Guardamos los dias de la semana y la de los meses en 2 variables.
  let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  //Mostramos el mensaje pasado por pantalla, para eso es el "get".
  mostrarFecha.innerHTML = `${semana[fecha.getDay()]}, ${fecha.getDate()} de ${mes[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  
  //Inicializamos el intervalo para mostrar la hora.
  setInterval(() => {
    let hora = new Date();
    mostrarReloj.innerHTML = hora.toLocaleTimeString();
  }, 1000);  
}