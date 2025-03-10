
const validAccounts = [
    { username: "Luis", password: "Pollo" },
    { username: "dibenhi", password: "Swift" },
    { username: "Jodie", password: "Huesos" },
];
 
const registerLink = document.getElementById("register-link");
const modal = document.getElementById("accounts-modal");
const modalCloseBtn = document.querySelector(".close-btn");
const accountsList = document.getElementById("accounts-list");

// Todo lo de mostrar
registerLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Limpiar el contenido previo
    accountsList.innerHTML = "";

    // Agregar las cuentas al modal
    validAccounts.forEach((account) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Usuario: ${account.username}.    Contraseña: ${account.password}`;
        accountsList.appendChild(listItem);
    });

    // Abrir
    modal.style.display = "flex";
});

// Cerrar
modalCloseBtn.addEventListener("click", function () {
    modal.style.display = "none";
});


window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


//MENSAJESSSSSSSSSSSSSSSSSSSSSSSSSSSS

const form = document.querySelector(".form-login");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

//estilos para mi errorMessage
const errorMessage = document.createElement("div");
errorMessage.style.display = "none";
errorMessage.style.backgroundColor = "#f8d7da";
errorMessage.style.color = "red";
errorMessage.style.padding = "10px";
errorMessage.style.marginTop = "10px";
errorMessage.style.borderRadius = "5px";
errorMessage.style.textAlign = "center";
errorMessage.style.fontFamily = "Montserrat, sans-serif";
errorMessage.textContent = "Clave o cuenta incorrecta";
form.appendChild(errorMessage);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const isValid = validAccounts.some(
        (account) => account.username === username && account.password === password
    );

    if (isValid) {
        window.location.href = "homeeter.html";
    } else {
        errorMessage.style.display = "block";
    }
});
