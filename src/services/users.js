import { login, register, logoutSupabase, createProfile, getData, updateData } from "./http.js";
export { loginUser, registerUser, updateProfile, getProfile,logout };

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

    if (status.success) {

      const username='joselu';
      const full_name='jose luis juan';
      const dataUpdate = await updateProfile({ username, full_name })
      getProfile()
    }

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



async function updateProfile(profile) {
  const token = localStorage.getItem('access_token');
  const uid = localStorage.getItem('uid');

  /* Guardar el uid en la columa id de profile, si no existe  */
  const existingProfile = await getData(`profiles?select=id`, token);
  if (!existingProfile) {
    createProfile(token, { id: uid });
  }

  console.log("Se proceden a guardar los datos")
  const responseUpdate = await updateData(`profiles?id=eq.${uid}&select=*`, token, profile);

}

async function getProfile() {
  const access_token = localStorage.getItem('access_token');
  const uid = localStorage.getItem('uid');
  const responseGet = await getData(`profiles?id=eq.${uid}&select=*`, access_token);
  console.log(responseGet);
 
 /* const { avatar_url } = responseGet[0];
  responseGet[0].avatar_blob = false;
  if (avatar_url) {
    const imageBlob = await getFileRequest(avatar_url, access_token);
    console.log(imageBlob);
    if (imageBlob instanceof Blob) {
      responseGet[0].avatar_blob = URL.createObjectURL(imageBlob);
    }
  }*/
  return responseGet;
}


/* async function addInputRegister(nickname) {
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
} */


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
      localStorage.clear();
    }).catch((error) => {
      console.error('Error durante el logout:', error);
    });
  }else{
    /* Si no existe pudo haber caducado, borrar datos directamente */
    localStorage.clear();
  }
}
