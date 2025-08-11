const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const url = `https://rpg-creature-api.freecodecamp.rocks/creatures/${encodeURIComponent(query)}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Creature not found");
      return res.json();
    })
    .then(data => {
      // Fill name & ID
      nameEl.textContent = data.name.toUpperCase();
      idEl.textContent = `#${data.id}`;

      // Weight & height with labels
      weightEl.textContent = `Weight: ${data.weight}`;
      heightEl.textContent = `Height: ${data.height}`;

      // Clear and add types
      typesEl.innerHTML = "";
      data.types.forEach(type => {
        const typeEl = document.createElement("span");
        typeEl.textContent = type.toUpperCase();
        typesEl.appendChild(typeEl);
      });

      // Fill stats
      const statsMap = {
        hp: hpEl,
        attack: attackEl,
        defense: defenseEl,
        "special-attack": specialAttackEl,
        "special-defense": specialDefenseEl,
        speed: speedEl
      };

      data.stats.forEach(statObj => {
        const key = statObj.name.toLowerCase();
        if (statsMap[key]) {
          statsMap[key].textContent = statObj.value;
        }
      });
    })
    .catch(() => alert("Creature not found"));
});