// nav
document.getElementById('date').innerHTML = `<h2>${new Date().toLocaleDateString()}</h2>`

// Audio
let audio = new Audio('./assets/sound.mp3');
audio.volume = 0.1; // Wert zwischen 0.0 und 1.0
audio.loop = true;

// Funktion zum Abspielen des Sounds
function playSound() {
  audio.play();
}

// Funktion zum Stoppen des Sounds
function stopSound() {
  audio.pause();
  // audio.currentTime = 0;
}



// Funktion zum Abrufen des Bildes für einen bestimmten Tag
async function getImage(day) {
  try {
    let response = await fetch(`./api/players.php?id=${day}`);
    let data = await response.json();
    if (data.code == 200) {
      console.log(data.players[0].shieldUrl);
      return data.players[0].shieldUrl; // gibt die URL des Bildes zurück
    } else {
      throw new Error("Error by loading Image");
    }
  } catch (error) {
    console.error(error);
    return "./assets/sam.png"; // Standard-Bild im Fehlerfall
  }
}
async function getPlayer(id) {
  try {
    let response = await fetch(`./api/players.php?id=${id}`);
    let data = await response.json();
    if (data.code == 200) {
      return data.players[0];
    } else {
      throw new Error("Error by loading Player");
    }
  } catch (error) {
    console.error(error);
    return "<p> Error </p>"; 
  }
}

loadPlayers();

async function loadPlayers() {
  let cardString = "";

  // Erste Reihe mit 9 Karten
  cardString += `<div class="row">`;
  for (let i = 1; i <= 9; i++) {
    let player = await getPlayer(i); // Warten auf das Bild
    console.log(player);

    if (!player.open) {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard" onclick="flipCard(this)" data-day="${player.day}">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    } else {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard flipped" onclick="flipCard(this)">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    }
  }
  cardString += `</div>`; // Erste Reihe abgeschlossen

  // Zweite Reihe mit 8 Karten
  cardString += `<div class="row">`;
  for (let i = 10; i <= 17; i++) {
    let player = await getPlayer(i); // Warten auf das Bild
    console.log(player);

    if (!player.open) {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard" onclick="flipCard(this)" data-day="${player.day}">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    } else {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard flipped" onclick="flipCard(this)">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    }
  }
  cardString += `</div>`; // Zweite Reihe abgeschlossen

  // Dritte Reihe mit 7 Karten
  cardString += `<div class="row">`;
  for (let i = 18; i <= 24; i++) {
    let player = await getPlayer(i); // Warten auf das Bild
    console.log(player);

    if (!player.open) {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard" onclick="flipCard(this)" data-day="${player.day}">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    } else {
      cardString += `
              <div class="grid-item">
                  <div class="deck">
                      <div class="card clickcard flipped" onclick="flipCard(this)">
                          <div class="front face">
                              <img src="./assets/verkleinert/${i}.png" alt="${i}">
                          </div>
                          <div class="back face">
                              <img src="${player.shieldUrl}" alt="back">
                          </div>
                      </div>
                  </div>
              </div>`;
    }
  }
  cardString += `</div>`; // Dritte Reihe abgeschlossen

  // Nachdem alle Bilder geladen wurden, HTML in den Inhalt einfügen
  document.getElementById("content").innerHTML = cardString;
}

// Funktion zum Umdrehen der Karten
function flipCard(card) {
  // flip the card
  // check if card is already flipped
  if (card.classList.contains("flipped")) {
    return;
  } else {
    card.classList.toggle("flipped");
  }
  // Hier kannst du das HTML-Element manipulieren
  console.log("Element:", card);

  // Beispiel: Zugriff auf die Datenattribute
  const day = card.getAttribute("data-day");
  console.log("Day:", day);

  // AJAX/Fetch-Anfrage an den Server senden
  fetch('./api/update_json.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ day: parseInt(day) })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        console.log("Player geöffnet und JSON aktualisiert.");
      } else {
        console.error("Fehler:", data.message);
      }
    })
    .catch(error => console.error("Fehler beim Senden der Anfrage:", error));
}



// event listener for button to redirect to the next page
document.getElementById('team').addEventListener('click', function () {
  window.location.href = "./pages/team.html";
});


// TEAM

