export { saveGame, updateGame, downloadGame, obtainAllGames };
import { getData, saveGameState, updateData } from "./http.js";

/* 
///ESTADO JUEGO///
*/

async function saveGame(state, uid) {
    const token = localStorage.getItem('access_token');
    return saveGameState(`STATE`, token, { game_state: state, user_id: uid });
}

async function updateGame(state, gameId) {
    const token = localStorage.getItem('access_token');
    updateData(`STATE?id=eq.${gameId}`, token, { game_state: state })
}

function downloadGame(gameId) {
    const token = localStorage.getItem('access_token');
    return getData(`STATE?select=game_state&id=eq.${gameId}`, token)
}

/* 
///OBTENER PARTIDAS///
*/


async function obtainAllGames(uid) {
    const token = localStorage.getItem('access_token');
    return getData(`STATE?select=*&user_id=eq.${uid}&order=created_at.desc&limit=5`, token);
}
