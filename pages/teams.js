document.getElementById("date").innerHTML = `<h2>${new Date().toLocaleDateString()}</h2>`;

let globalNr;
let cursorX, cursorY;

// Fetch und Spieler laden
async function loadPlayers() {
  try {
    const response = await fetch(`../api/openPlayers.php`);
    const data = await response.json();

    if (data.code === 200) {
      let cardString = "";
      data.players.forEach(player => {
        cardString += `
          <div class="card" id="player-${player.day}">
              <img src="${player.shieldUrl}" alt="${player.name}">
          </div>
        `;
      });

      document.getElementById("players").innerHTML = cardString;

      // Spieler-Positionen aus dem localStorage laden
      const localPos = JSON.parse(localStorage.getItem("savedPosition") || "[]");
      localPos.forEach(pos => {
        const box = document.getElementById(`player-${pos.day}`);
        if (box) {
          changesBox(pos.day);
          box.style.left = pos.left;
          box.style.top = pos.top;
        }
      });

    } else {
      throw new Error("Error loading players.");
    }
  } catch (error) {
    console.error(error);
    document.getElementById("players").innerHTML = "<p>Error loading players</p>";
  }
}

function changesBox(nr) {
  const box = document.getElementById(`player-${nr}`);
  if (!box) return;

  box.style.position = "absolute";
  box.style.width = "13%";
  box.style.scale = "1";
  box.style.marginTop = "0px";
}

function makeAbsolute(nr) {
  globalNr = nr;
}

function placeBuild(e) {
  if (globalNr === undefined) return;

  const localPos = JSON.parse(localStorage.getItem("savedPosition") || "[]");

  // Prüfen, ob Spieler schon verschoben wurde
  const isAlreadyMoved = localPos.some(pos => pos.day === globalNr);

  // Begrenzung: Maximal 5 Spieler gleichzeitig
  if (localPos.length >= 5 && !isAlreadyMoved) {
    alert("Es können maximal 5 Spieler verschoben werden!");
    return;
  }

  cursorX = e.pageX;
  cursorY = e.pageY;

  const box = document.getElementById(`player-${globalNr}`);
  if (!box) return;

  if (!isAlreadyMoved) {
    changesBox(globalNr);
  }

  // Neue Position setzen
  const newPosition = {
    day: globalNr,
    left: `${cursorX - 70}px`,
    top: `${cursorY - 75}px`,
  };

  box.style.left = newPosition.left;
  box.style.top = newPosition.top;

  // Spieler-Position aktualisieren
  if (isAlreadyMoved) {
    localPos.forEach(pos => {
      if (pos.day === globalNr) {
        pos.left = newPosition.left;
        pos.top = newPosition.top;
      }
    });
  } else {
    localPos.push(newPosition);
  }

  localStorage.setItem("savedPosition", JSON.stringify(localPos));
}

// Reset-Funktion
// Funktion, um alle Positionen zurückzusetzen
function resetPositions() {
  // Lokale Speicher-Daten löschen
  localStorage.removeItem("savedPosition");

  // Globale Variable zurücksetzen
  globalNr = undefined;

  // Spieler-Array komplett neu laden
  loadPlayers();

  console.log("Alle Positionen wurden zurückgesetzt.");
}


// Event-Listener für Reset-Button
document.getElementById("reset-button").addEventListener("mousedown", e => {
  e.stopPropagation(); // Verhindert, dass andere Listener das Ereignis verarbeiten
  resetPositions();
});
// Globale Event-Listener
document.addEventListener("mousedown", e => {
  const target = e.target.closest(".card");
  if (target) {
    const playerId = target.id.split("-")[1];
    makeAbsolute(parseInt(playerId));
  }
});

document.addEventListener("mouseup", placeBuild);

// Spieler laden beim Seitenstart
loadPlayers();


// back button
document.getElementById("back").addEventListener("mousedown", e => {
  e.stopPropagation(); // Verhindert, dass andere Listener das Ereignis verarbeiten
  window.location.href = "../index.html";
  
});