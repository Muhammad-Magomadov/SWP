var simpsons = ["apu", "barney", "bart", "charles", "glancy", "grandpa", "hibbert", "homer", "krusty", "marge"]
var bilder = ["apu_1.png", "barney_2.png", "bart_3.png", "charles_4.png", "glancy_5.png", "grandpa_7.png", "hibbert_6.png", "homer_8.png", "krusty_9.png", "marge_10.png"]

// Funktion die Bilder und Namen dynamisch einfügt
function changePics() {
    // Alle Bilder mit Klasse '.place' suchen und in Variable speichern
    var imgs = document.querySelectorAll('.place img');
    // Alle Elemente mit Klasse '.place' und ID die mit "name" beginnt - wird nicht verwendet
    var names = document.querySelectorAll('.place[id^="name"]');

    // Schleife - wiederholt sich 10x (für alle 10 Simpson-Charaktere)
    for (var i = 0; i < bilder.length; i++) {
        // Bildpfad setzen: z.B. "bilder/apu_1.png"
        imgs[i].src = 'bilder/' + bilder[i];
        // Hintergrundfarbe des Bild-Containers auf gelb setzen
        imgs[i].parentElement.style.backgroundColor = 'yellow';
        // Namen aus simpsons-Array in HTML-Element mit ID "name1", "name2" etc. einfügen
        document.getElementById('name' + (i + 1)).textContent = simpsons[i];
    }
    // Erste Reihe orange färben
    document.getElementById('rowone').style.backgroundColor = 'orange';
    // Zweite Reihe blau färben
    document.getElementById('rowtwo').style.backgroundColor = 'blue';
}