export { menu };

function menu() {
  const mainWindowRow = document.createElement("div");
  // mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-3");

  mainWindowRow.innerHTML = `
   <div class="container mt-5">
    <div class="jumbotron text-center">
      <h1 class="display-4">¡Bienvenid@</h1>
      <p class="lead">¿Preparados?</p>
      <hr class="my-4">
      <p class=" btn-texto">Selecciona el tipo de partida.</p>
      <a class="login-btn-home" href="#/game" role="button">Nueva partida</a>
      <a class="login-btn-home" href="#/allgames" role="button">Cargar partida</a>
      <a class="login-btn-home" href="#" role="button">Estadisticas</a>
    </div>
  </div>`;

  return mainWindowRow;
}

