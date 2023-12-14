import { route } from "../router.js";
import { getProfile, updateProfile } from "../services/users.js";
export { profileForm };


function profileForm(params) {
  const divProfile = document.createElement("div");

  getProfile().then((dataProfile) => {
    dataProfile = dataProfile[0];

    divProfile.innerHTML = `<style> #container {min-height: 700px;max-height: 1000px}
    </style>
        <div class="recuadro">
        <h1 class="form-title">Profile</h1>
    
        <form>
    
          <input type="email" id="email" name="email" placeholder="Email" required readonly value="${localStorage.getItem('email')}">
          <input type="password" id="contraRegistre1" placeholder="Password" >
          <input type="password" id="contraRegistre2" placeholder="Repeat Password" >
          
          <div style="display:flex;justify-content:center">
          <button type="button" class="login-btn-menu profile" id="chgpass">Change Password</button>
          </div>

          <input type="text" id="username" name= "username" placeholder="Username" value="${dataProfile.username}">
          <input type="text" id="full_name" name= "full_name" placeholder="Nombre completo" value="${dataProfile.full_name}">

          <div style="display:flex;justify-content:center">

          <img class="avatar_profile" style="max-width: 200px" id="avatar_prev" src="${dataProfile.avatar_blob ? dataProfile.avatar_blob : ''}"/>
          </div>
          
          <label for="avatar"><b>Avatar</b></label>
          <input type="file" id="avatar" name="avatar">

          <div style="display:flex;justify-content:center">
            <input type="submit" value="Actualizar">
          </div>
        </form>  
        </div>`;


    /* Funcion personalizada para cambiar la altura del contenedor 
    respecto a la del formulario con imagen */
    function ajustarAltura() {
      let divProfile = document.querySelector('.recuadro');
      let contenedor = document.querySelector('#container');
      let imagen = document.getElementById('avatar_prev');
      let alturaImagen = 0;

       imagen.onload = function () {
        alturaImagen = imagen.offsetHeight;
        console.log(imagen.offsetHeight);
        let alturaForm = divProfile.offsetHeight + alturaImagen;
        contenedor.style.height = alturaForm + 'px';
      } 
    }
    ajustarAltura();


    let form = divProfile.querySelector("form");
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const { username, full_name, avatar } = Object.fromEntries(formData);

      const dataUpdate = await updateProfile({ username, full_name, avatar })
      route('#/profile');
    });

    function encodeImageFileAsURL(element) {
      const file = element.files[0];
      if (file) {
        divProfile.querySelector('#avatar_prev').src = URL.createObjectURL(file);
      }
    }

    divProfile.querySelector('#avatar').addEventListener('change', function () { encodeImageFileAsURL(this); });
  });

  return divProfile;
}