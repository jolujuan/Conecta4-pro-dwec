import { login, register, logoutSupabase, addInput } from "./http.js";
export { loginUser, registerUser,addInputRegister, logout };

function expirationDate(expires_in, extraSeconds) {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const newExpirationTime = currentTimeInSeconds + expires_in + extraSeconds;
  return newExpirationTime;
}

async function loginUser(email, password) {
  const status = { success: false };
  try {
    const dataLogin = await login(email, password);

    localStorage.setItem('access_token', dataLogin.access_token);
    localStorage.setItem('email', dataLogin.user.email);
    localStorage.setItem('uid', dataLogin.user.id);
    /* dos horas expirara */
    localStorage.setItem('expirationDate', expirationDate(dataLogin.expires_in, 7200));

    status.success = true;
  } catch (err) {
    console.log(err);
    status.success = false;
    status.errorText = obtenerMensajeError(err);
  }
  return status;
}


async function registerUser(email, password) {
  const status = { success: false };
  try {
    // Espera a que la función register complete y luego actualiza el estado
    const dataRegister = await register(email, password);
    console.log(dataRegister);
    status.success = true;

  } catch (err) {
    console.log(err);
    status.success = false;
    status.errorText = err.error_description;
  }
  
  return status;
}

async function addInputRegister(nickname) {
  const status = { success: false };
  try {
    // Espera a que la función register complete y luego actualiza el estado
    const dataRegister = await addInput(nickname);
    console.log(dataRegister);
    status.success = true;

  } catch (err) {
    console.log(err);
    status.success = false;
    status.errorText = err.error_description;
  }
  return status;
}


function obtenerMensajeError(error) {
  // Ejemplo básico de mapeo de mensajes de error
  switch (error.error_description) {
    case 'Invalid login credentials':
      return 'Usuario o contraseña incorrectos.';
    case 'Email not confirmed':
      return 'Correo electrónico no verificado.';
    default:
      return 'Error al iniciar sesión.';
  }
}

function logout() {
  const accessToken = localStorage.getItem('access_token');

  // Verificar si el token de acceso existe
  if (accessToken) {
    logoutSupabase(accessToken).then((lOData) => {
      console.log(lOData);
      localStorage.clear();
    }).catch((error) => {
      console.error('Error durante el logout:', error);
    });
  }
}
