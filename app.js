const form = document.getElementById("gameForm");
const lista = document.getElementById("listaJuegos");

let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

const renderizar = () => {
  lista.innerHTML = "";
  juegos.forEach((juego, index) => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <img src="${juego.imagen || 'https://via.placeholder.com/250x140?text=Sin+imagen'}" alt="Portada de ${juego.nombre}">
      <h3>${juego.nombre}</h3>
      <p>🎮 Género: ${juego.genero}</p>
      <p>⭐ Puntuación: ${juego.puntuacion}/10</p>
      <p class="${juego.platino ? 'platino' : ''}">
        ${juego.platino ? '🏆 ¡Platino conseguido!' : '⏳ Sin platino aún'}
      </p>
      <button onclick="togglePlatino(${index})">
        ${juego.platino ? '❌ Quitar platino' : '✅ Marcar platino'}
      </button>
      <button onclick="eliminarJuego(${index})">🗑 Eliminar</button>
    `;
    lista.appendChild(div);
  });
};

const guardar = () => {
  localStorage.setItem("juegos", JSON.stringify(juegos));
  renderizar();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoJuego = {
    nombre: document.getElementById("nombre").value,
    genero: document.getElementById("genero").value,
    puntuacion: parseInt(document.getElementById("puntuacion").value),
    imagen: document.getElementById("imagen").value,
    platino: false // siempre empieza sin platino
  };
  juegos.push(nuevoJuego);
  guardar();
  form.reset();
});

window.eliminarJuego = (index) => {
  if (confirm("¿Seguro que quieres eliminar este juego?")) {
    juegos.splice(index, 1);
    guardar();
  }
};

window.togglePlatino = (index) => {
  juegos[index].platino = !juegos[index].platino;
  guardar();
};

renderizar();
