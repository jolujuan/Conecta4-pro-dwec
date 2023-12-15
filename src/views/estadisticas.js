export { estadisticas  };
function estadisticas() {
    const mainEstadisticas = document.createElement("div");
    mainEstadisticas.classList.add('estadisticas');


    const p = document.createElement('p');
    p.innerHTML = `  Todavia no hay suficientes datos para mostrar las estadisticas...`;
    mainEstadisticas.appendChild(p);
    return mainEstadisticas;
}