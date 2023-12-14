import { route } from "../router.js";
import { getProfile, updateProfile } from "../services/users.js";

export { profileForm };
function profileForm(params) {
    const divProfile = document.createElement("div");

    getProfile().then((dataProfile) => {
        dataProfile = dataProfile[0];

        divProfile.innerHTML = `<style> #container{height:40em} </style>
        <div class="recuadro">
        <h1 class="form-title">Profile</h1>
    
        <form action="action_page.php" >
    
          <input type="email" id="email" name="email" placeholder="Email" required readonly value="${localStorage.getItem('email')}">
          <input type="password" id="contraRegistre1" placeholder="Password" required>
          <input type="password" id="contraRegistre2" placeholder="Repeat Password" required>

          <input type="text" id="username" name= "username" placeholder="Username" value="${dataProfile.username}">
          <input type="text" id="full_name" name= "full_name" placeholder="Nombre completo" value="${dataProfile.full_name}">

          <div>
          <img class="avatar_profile" style="max-width: 200px" id="avatar_prev" src="${dataProfile.avatar_blob ? dataProfile.avatar_blob : ''}"/>
          </div>
          <label for="avatar"><b>Avatar</b></label>
          <input type="file" id="avatar" name="avatar">

          <div style="display:flex;justify-content:center">
            <input type="submit" value="Actualizar">
          </div>
        </form>  
        </div>`;
        let form = divProfile.querySelector("form");
        let buttonSubmit = form.querySelector('[type~="submit"');

        buttonSubmit.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);


            const { username, full_name } = Object.fromEntries(formData);
            console.log(username, full_name)

            const dataUpdate = await updateProfile({ username, full_name })

            route('#/profile');
        });

    });

    return divProfile;
}