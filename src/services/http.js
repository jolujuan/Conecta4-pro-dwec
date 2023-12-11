export {
  saveGameState,
  getData,
  updateData,
  login,
  register,
  addInput,
  logoutSupabase,
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
Prefer: "return=representation",

fetch('https://tu_dominio.supabase.co/tu_endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({campo1: 'valor1', campo2: 'valor2'})
})
.then(response => response.json())
.then(data => console.log(data)); // Aquí 'data' contiene la representación del recurso creado
*/

/* async function getLastId(url, method, headers) {
  let response = await fetch(url, {
    method,
    headers,
  });

  if (response.status >= 200 && response.status < 300) {
    let data = await response.json();
    return data[0].id; // Obtener el elemento devuelto del array
  } else {
    if (response.headers.get("Content-Type").includes("application/json")) {
      const errorResponse = await response.json();
      return Promise.reject(errorResponse);
    } else {
      return Promise.reject({
        error: "Error in response",
        status: response.status,
      });
    }
  }
} */

/* 
///METODO GENERAL PARA GUARDAR DATA EN EL SERVIDOR///
 */
async function supaRequest(url, method, headers, body) {

  let response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  }); 

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
async function saveGameState(token, data) {
  const url = `${urlBase}/rest/v1/STATE`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'post', headersAux, data)
  return response;
}

async function updateData(URI,token, state) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const data = await supaRequest(url, 'PATCH', headersAux, state)
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

async function addInput(nickname) {
  const url = `${urlBase}/rest/v1/user_profiles`;
  const data = await supaRequest(url, 'post', headers, { name: nickname })
  return data;
}

async function logoutSupabase(token) {
  const url = `${urlBase}/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'post', headersAux, {});
  return data;
}

/* 
///OBTENER PARTIDAS///
*/

