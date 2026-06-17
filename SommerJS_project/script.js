let score = 0; // Aktueller Punktestand des Spiels
const fields = document.querySelectorAll('.field'); // Alle Spielfelder werden ausgewählt
let spawnCounter = 0; // Zählt gespawnte Würmer zur eindeutigen Identifikation
let spawnInterval = null; // Speichert das Intervall, das Würmer erzeugt
let gameStarted = false; // Merkt sich, ob das Spiel bereits gestartet wurde

const gameOverOverlay = document.getElementById('game-over'); // Overlay für Spielende holen
if (gameOverOverlay) {
    gameOverOverlay.classList.add('hidden'); // Overlay zunächst ausblenden
}

function getRandomField() {
    const randomIndex = Math.floor(Math.random() * fields.length); // Zufälligen Index ermitteln
    return fields[randomIndex]; // Das zufällige Spielfeld zurückgeben
}

function startGame() {
    if (gameStarted) return; // Wenn das Spiel schon läuft, nicht erneut starten
    gameStarted = true; // Spielstatus auf gestartet setzen
    document.getElementById('start-btn').style.display = 'none'; // Startknopf ausblenden
    spawnInterval = setInterval(spawnWorm, 1000); // Alle 1 Sekunde einen Wurm erzeugen
}

function updateScore() {
    document.getElementById('score-text').textContent = 'Punkte: ' + score; // Punktestand im UI aktualisieren
}

function removeHeart() {
    const hearts = document.querySelectorAll('.heart'); // Alle Herz-Elemente auswählen
    if (hearts.length === 0) return; // Wenn keine Herzen da sind, nichts tun

    hearts[hearts.length - 1].remove(); // Letztes Herz entfernen

    const remaining = document.querySelectorAll('.heart'); // Verbleibende Herzen prüfen
    if (remaining.length === 0) {
        showGameOver(); // Kein Herz mehr übrig: Spiel beenden
    }
}

function showGameOver() {
    const overlay = document.getElementById('game-over'); // Overlay für Spielende holen
    if (!overlay) return; // Wenn es nicht existiert, abbrechen
    overlay.classList.remove('hidden'); // Overlay sichtbar machen
    overlay.style.display = 'flex'; // Anzeige auf Flex setzen
    clearInterval(spawnInterval); // Wurm-Spawn stoppen
}

function restartGame() {
    window.location.reload(); // Seite neu laden, um das Spiel zurückzusetzen
}

function spawnWorm() {
    const randomField = getRandomField(); // Zufälliges Feld wählen
    if (randomField.classList.contains('active')) return; // Wenn Feld schon aktiv ist, abbrechen

    const wormId = ++spawnCounter; // Neue Wurm-ID erzeugen
    randomField.dataset.wormId = wormId; // ID als Datensatz speichern
    randomField.classList.add('active'); // Feld als aktiv markieren
    randomField.innerHTML = '<img src="bilder/marcel_tongue.png" alt="Wurm" draggable="false">'; // Wurmbild einfügen

    setTimeout(function () {
        if (randomField.dataset.wormId != wormId) return; // Nur aktuellen Wurm entfernen
        if (!randomField.classList.contains('active')) return; // Wenn bereits entfernt, nichts tun
        randomField.classList.remove('active'); // Feld wieder deaktivieren
        randomField.innerHTML = ''; // Wurmbild entfernen
        removeHeart(); // Herz verlieren, weil der Wurm nicht getroffen wurde
    }, 5000); // Nach 5 Sekunden ohne Klick passieren lassen
}

fields.forEach(function (field) {
    field.addEventListener('pointerdown', function (event) {
        if (!field.classList.contains('active')) return; // Nur aktive Felder reagieren
        event.preventDefault(); // Standardverhalten unterdrücken
        field.classList.remove('active'); // Feld deaktivieren
        field.innerHTML = ''; // Wurmbild entfernen
        score++; // Punktestand erhöhen
        updateScore(); // UI mit neuer Punktzahl aktualisieren
    });
});

const startButton = document.getElementById('start-btn'); // Startknopf holen
if (startButton) {
    startButton.addEventListener('click', startGame); // Startknopf mit Spielstart verbinden
}

const restartButton = document.getElementById('restart-btn'); // Neustartknopf holen
if (restartButton) {
    restartButton.addEventListener('click', restartGame); // Neustartknopf mit Neuladen verbinden
}
