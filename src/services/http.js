import { route } from "../router.js";
import { popup, showPopup } from "../views/showPopup.js";

export {
  saveGameState,
  getData,
  updateData,
  login,
  register,
  createProfile,
  logoutSupabase,
  fileRequest,
  getFileRequest
  //downloadGameState,
};


const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludWt1c3R2cGV4bWN3ZW5lYWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0NTcsImV4cCI6MjAxNDg0MjQ1N30.ksa3cR4UrMi4LxHkLuWaeimAVqpct-papFpsFLTQTtA";

const urlBase = 'https://ynukustvpexmcweneabc.supabase.co';

const headers = {
  apiKey: SUPABASE_KEY,
  "Content-Type": "application/json",
};

/* 
///METODO GENERAL PARA GUARDAR DATOS EN EL SERVIDOR///
 */
async function supaRequest(url, method, headers, body) {

  let response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  /* Verificar si el token sigue activo */
  if (response.status === 401) { 
    const responseData = await response.json();
    if (responseData && responseData.code === 'PGRST301') { 
      
      const main = document.querySelector("#container");
      main.append(popup('expira'));
      showPopup();
      route('#/login');

      return Promise.reject(responseData); // Rechazar la promesa con los detalles del error
    }
  }

  if (response.status >= 200 && response.status < 300) { // En cas d'error en el servidor
    if (response.headers.get('content-type')) { // Si retorna un JSON
      return await response.json();
    }
    return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
  }
  return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}

/* 
///FUNCIONES GENERICAS///
*/
async function saveGameState(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'post', headersAux, data)
  return response;
}

async function updateData(URI, token, body) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const data = await supaRequest(url, 'PATCH', headersAux, body)
  return data;
}

async function getData(URI, token) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  const data = await supaRequest(url, 'get', headersAux)
  return data;
}


/* 
///REGISTRAR USUARIOS///
*/
async function login(email, password) {
  const url = `${urlBase}/auth/v1/token?grant_type=password`;
  const data = await supaRequest(url, 'post', headers, { email, password })
  return data;
}

async function register(email, password) {
  const url = `${urlBase}/auth/v1/signup`;
  const data = await supaRequest(url, 'post', headers, { email, password })
  return data;
}

async function createProfile(token, body) {
  const url = `${urlBase}/rest/v1/profiles`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  return await supaRequest(url, 'post', headersAux, body);
}

async function logoutSupabase(token) {
  const url = `${urlBase}/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'post', headersAux, {});
  return data;
}

/* 
///OBTENER STORAGE///
*/
async function fileRequest(url, body, token) {
  const headersFile = {
    apiKey: SUPABASE_KEY,
    Authorization: `Bearer ${token}`,
    'x-upsert': true, // Necessari per a sobreescriure
  };
  const response = await fetch(`${urlBase}${url}`, {
    method: 'POST',
    headers: headersFile,
    body,
  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get('content-type')) {
      const datos = await response.json(); // Retorna un json amb la ruta relativa.
      datos.urlAvatar = `${urlBase}${url}`; // El que
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}

async function getFileRequest(url, token) {
  const headersFile = {
    apiKey: SUPABASE_KEY,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: headersFile,

  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get('content-type')) {
      const datos = await response.blob();
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}
