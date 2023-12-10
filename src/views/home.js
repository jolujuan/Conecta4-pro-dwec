export { home };

function home() {
  const mainWindowRow = document.createElement("div");
  // mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-3");

  mainWindowRow.innerHTML = `
   <div class="container mt-5">
    <div class="jumbotron text-center">
      <h1 class="display-4">¡Bienvenid@ de nuevo!</h1>
      <p class="lead">¿Preparados?</p>
      <hr class="my-4">
      <p class=" btn-texto">Haz clic en el botón de abajo para comenzar.</p>
      <a class="login-btn-home" href="#/login" role="button">INICIAR SESION</a>
    </div>
  </div>`;

  return mainWindowRow;
}
