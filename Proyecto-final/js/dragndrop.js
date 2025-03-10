const draggable = document.getElementById("draggable");
const dropArea = document.getElementById("drop-area");


draggable.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.style.opacity = "0.5";
});


draggable.addEventListener("dragend", (event) => {
    event.target.style.opacity = "1";
});


dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); 
    dropArea.style.backgroundColor = "#FFA113"; 
    dropArea.style.backgroundColor = "transparent";
    dropArea.style.borderColor = "#FFA113";
    dropArea.style.borderRadius = "150px";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "transparent";
    dropArea.style.borderRadius = "20px";
    dropArea.style.borderColor = "#fffde7";

});


dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    const id = event.dataTransfer.getData("text/plain"); // Obtener el id del elemento arrastrado
    const draggedElement = document.getElementById(id);

    dropArea.style.backgroundColor = "#FFA113"; 
    dropArea.style.borderRadius = "20px";
    dropArea.appendChild(draggedElement); // Mueve el elemento al área de drop
});
