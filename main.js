var tousLesPersonnages = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://dragonball-api.com/api/characters?limit=20")
        .then(function (response) { return response.json(); })
        .then(function (data) {
            tousLesPersonnages = data.items;
            afficherCartes(tousLesPersonnages);
            creerFiltres(tousLesPersonnages);
            afficherSpeciaux();
        })
        .catch(function (erreur) { console.error("Erreur API : ", erreur); });
});

function afficherCartes(personnages) {
    var conteneur = document.getElementById("grille-cartes");
    conteneur.innerHTML = "";
    personnages.forEach(function (perso) {
        var carte = document.createElement("div");
        carte.className = "carte";
        carte.innerHTML =
            "<img src='" + perso.image + "' alt='" + perso.name + "'>" +
            "<p class='nom-carte'>" + perso.name + "</p>" +
            "<p class='race-carte'>" + perso.race + "</p>";
        carte.addEventListener("click", function () {
            window.location.href = "carte.html?id=" + perso.id;
        });
        carte.style.cursor = "pointer";
        conteneur.appendChild(carte);
    });
}

function creerFiltres(personnages) {
    var conteneurFiltres = document.getElementById("filtres");
    var races = personnages.map(function (p) { return p.race; });
    var racesUniques = races.filter(function (race, index) {
        return races.indexOf(race) === index;
    });
    var btnTous = document.createElement("button");
    btnTous.textContent = "Tous";
    btnTous.className = "btn-filtre actif";
    btnTous.addEventListener("click", function () {
        afficherCartes(tousLesPersonnages);
        document.querySelectorAll(".btn-filtre").forEach(function (b) { b.classList.remove("actif"); });
        btnTous.classList.add("actif");
    });
    conteneurFiltres.appendChild(btnTous);
    racesUniques.forEach(function (race) {
        var btn = document.createElement("button");
        btn.textContent = race;
        btn.className = "btn-filtre";
        btn.addEventListener("click", function () {
            var filtres = tousLesPersonnages.filter(function (p) { return p.race === race; });
            afficherCartes(filtres);
            document.querySelectorAll(".btn-filtre").forEach(function (b) { b.classList.remove("actif"); });
            btn.classList.add("actif");
        });
        conteneurFiltres.appendChild(btn);
    });
}

function afficherSpeciaux() {
    var idsSpeciaux = [1, 2, 5, 10];
    var conteneur = document.getElementById("grille-speciaux");
    idsSpeciaux.forEach(function (id) {
        fetch("https://dragonball-api.com/api/characters/" + id)
            .then(function (response) { return response.json(); })
            .then(function (perso) {
                var carte = document.createElement("div");
                carte.className = "carte carte-speciale";
                carte.innerHTML =
                    "<div class='badge-special'>&#11088; Special</div>" +
                    "<img src='" + perso.image + "' alt='" + perso.name + "'>" +
                    "<p class='nom-carte'>" + perso.name + "</p>" +
                    "<p class='race-carte'>" + perso.race + "</p>";
                carte.addEventListener("click", function () {
                    window.location.href = "carte.html?id=" + perso.id;
                });
                carte.style.cursor = "pointer";
                conteneur.appendChild(carte);
            })
            .catch(function (erreur) { console.error("Erreur : ", erreur); });
    });
}

function basculerMode() {
    document.body.classList.toggle("dark");
    var bouton = document.getElementById("btn-dark");
    if (document.body.classList.contains("dark")) {
        bouton.innerHTML = "&#9728;";
    } else {
        bouton.innerHTML = "&#127769;";
    }
}

function ouvrirMenu() {
    document.getElementById("menu-mobile").style.display = "block";
}

function fermerMenu() {
    document.getElementById("menu-mobile").style.display = "none";
}