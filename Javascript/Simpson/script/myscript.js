var simpsons = ["apu", "barney", "bart", "charles", "glancy", "grandpa", "hibbert", "homer", "krusty", "marge"]
var bilder = ["apu_1.png", "barney_2.png", "bart_3.png", "charles_4.png", "glancy_5.png", "grandpa_7.png", "hibbert_6.png", "homer_8.png", "krusty_9.png", "marge_10.png"]

function changePics() {
    var imgs = document.querySelectorAll('.place img');
    var names = document.querySelectorAll('.place[id^="name"]');

    for (var i = 0; i < bilder.length; i++) {
        imgs[i].src = 'bilder/' + bilder[i];
        imgs[i].parentElement.style.backgroundColor = 'yellow';
        document.getElementById('name' + (i + 1)).textContent = simpsons[i];
    }
    document.getElementById('rowone').style.backgroundColor = 'orange';
    document.getElementById('rowtwo').style.backgroundColor = 'blue';
}