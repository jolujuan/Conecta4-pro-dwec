//template del juego
export { getBoardTemplate };
const getBoardTemplate = () => {
    const template = `<div id="container">
    <h2>Coloca 4</h2>
    <table id="tabla"></table>
    <div id="jugadores">
        <div class="jugador 1">
            <span>Jugador 1</span>
            <span class="j1">0</span>
        </div>
        <div class="jugador 2">
            <span>Jugador 2</span>
            <span class="j2">0</span>
        </div>
    </div>
</div>`;

    const wraper = document.createElement('div');
    wraper.innerHTML = template;
    return wraper;
};