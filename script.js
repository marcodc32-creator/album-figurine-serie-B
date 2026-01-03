const squadre = [
  { nome: "PRIMA DIVISA", colore: "#00BFFF", numero: 20 },
  { nome: "AVELLINO", colore: "#2E8B57", numero: 22 },
  { nome: "BARI", colore: "#E10600", numero: 22 },
  { nome: "CARRARESE", colore: "#000080", numero: 22 },
  { nome: "CATANZARO", colore: "#FFD700", numero: 22 },
  { nome: "CESENA", colore: "#000000", numero: 22 },
  { nome: "EMPOLI", colore: "#0C4CA3", numero: 22 },
  { nome: "FROSINONE", colore: "#004E86", numero: 22 },
  { nome: "JUVE STABIA", colore: "#FFD700", numero: 22 },
  { nome: "MANTOVA", colore: "#800000", numero: 22 },
  { nome: "MODENA", colore: "#FBEA18", numero: 22 },
  { nome: "MONZA", colore: "#FF0000", numero: 22 },
  { nome: "PADOVA", colore: "#FF0000", numero: 22 },
  { nome: "PALERMO", colore: "#EE82EE", numero: 22 },
  { nome: "PESCARA", colore: "#0066CC", numero: 22 },
  { nome: "REGGIANA", colore: "#8B0000", numero: 22 },
  { nome: "SAMPDORIA", colore: "#0055A4", numero: 22 },
  { nome: "SPEZIA", colore: "#000000", numero: 22 },
  { nome: "SUDTIROL", colore: "#8B0000", numero: 22 },
  { nome: "VENEZIA", colore: "#FF6600", numero: 22 },
  { nome: "VIRTUS ENTELLA", colore: "#0099CC", numero: 22 },
  { nome: "I MIGLIORI DI OGNI SQUADRA", colore: "#32CD32", numero: 20 },
];

const album = document.getElementById("album");
const counter = document.getElementById("counter");
const bar = document.getElementById("bar");
const search = document.getElementById("search");
const duplicatesText = document.getElementById("duplicates");
const resetBtn = document.getElementById("reset");

let trovate = JSON.parse(localStorage.getItem("trovate")) || [];
let doppioni = JSON.parse(localStorage.getItem("doppioni")) || [];

function salva() {
  localStorage.setItem("trovate", JSON.stringify(trovate));
  localStorage.setItem("doppioni", JSON.stringify(doppioni));
}

function aggiornaStats() {
  counter.innerText = `Trovate: ${trovate.length} / 480`;
  bar.style.width = `${(trovate.length / 480) * 100}%`;
  duplicatesText.innerText = `Doppioni: ${doppioni.length}`;
}

let numero = 1;

// Crea griglia
squadre.forEach(sq => {
  const title = document.createElement("div");
  title.className = "team-title";
  title.style.background = sq.colore;
  title.innerText = sq.nome;
  album.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "grid";
  album.appendChild(grid);

  for (let i = 0; i < sq.numero; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = numero;

    let cardNum = numero; // numero fisso per la carta

    if (trovate.includes(cardNum)) card.classList.add("found");
    if (doppioni.includes(cardNum)) card.classList.add("duplicate");

    card.addEventListener("click", () => {
      if (!trovate.includes(cardNum)) {
        trovate.push(cardNum);
        card.classList.add("found");
      } else {
        trovate = trovate.filter(n => n !== cardNum);
        card.classList.remove("found");
      }
      salva();
      aggiornaStats();
    });

    card.addEventListener("dblclick", () => {
      if (!doppioni.includes(cardNum)) {
        doppioni.push(cardNum);
        card.classList.add("duplicate");
      } else {
        doppioni = doppioni.filter(n => n !== cardNum);
        card.classList.remove("duplicate");
      }
      salva();
      aggiornaStats();
    });

    grid.appendChild(card);
    numero++;
  }
});

// Ricerca numeri
search.addEventListener("input", () => {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("highlight"));
  const n = parseInt(search.value);
  if (!isNaN(n)) {
    const card = [...document.querySelectorAll(".card")].find(c => c.innerText == n);
    if (card) card.classList.add("highlight");
  }
});

// Pulsante Reset
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("trovate");
  localStorage.removeItem("doppioni");
  trovate = [];
  doppioni = [];
  aggiornaStats();
  document.querySelectorAll(".card").forEach(c => c.classList.remove("found","duplicate"));
});

aggiornaStats();
