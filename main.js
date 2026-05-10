var tousLesPersonnages = [];

document.addEventListener("DOMContentLoaded", function () {

    fetch("https://dragonball-api.com/api/characters?limit=20")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // On sauvegarde les persos dans la variable globale
            tousLesPersonnages = data.items;

            // On affiche d'abord TOUS les persos
            afficherCartes(tousLesPersonnages);

            // Puis on crée les boutons de filtre
            creerFiltres(tousLesPersonnages);
        })
        .catch(function (erreur) {
            console.error("Erreur API : ", erreur);
        });
});


function afficherCartes(personnages) {
    var conteneur = document.getElementById("grille-cartes");

    // On vide le conteneur avant d'afficher
    conteneur.innerHTML = "";

    personnages.forEach(function (perso) {
        var carte = document.createElement("div");
        carte.className = "carte";
        carte.innerHTML =
            "<img src='" + perso.image + "' alt='" + perso.name + "'>" +
            "<p class='nom-carte'>" + perso.name + "</p>" +
            "<p class='race-carte'>" + perso.race + "</p>";
        conteneur.appendChild(carte);
    });
}


function creerFiltres(personnages) {
    var conteneurFiltres = document.getElementById("filtres");

    // On récupère toutes les races sans doublon
    // map = "pour chaque perso, prends juste sa race"
    // filter = "garde seulement les valeurs uniques"
    var races = personnages.map(function (p) { return p.race; });
    var racesUniques = races.filter(function (race, index) {
        return races.indexOf(race) === index;
    });

    // Bouton "Tous" pour réinitialiser le filtre
    var btnTous = document.createElement("button");
    btnTous.textContent = "Tous";
    btnTous.className = "btn-filtre actif";
    btnTous.addEventListener("click", function () {
        // Au clic : on affiche tous les persos
        afficherCartes(tousLesPersonnages);
        // On retire la classe "actif" de tous les boutons
        document.querySelectorAll(".btn-filtre").forEach(function (b) {
            b.classList.remove("actif");
        });
        btnTous.classList.add("actif");
    });
    conteneurFiltres.appendChild(btnTous);

    // Un bouton par race
    racesUniques.forEach(function (race) {
        var btn = document.createElement("button");
        btn.textContent = race;
        btn.className = "btn-filtre";

        btn.addEventListener("click", function () {
            // Au clic : on filtre le tableau global par race
            var filtres = tousLesPersonnages.filter(function (p) {
                return p.race === race;
            });
            afficherCartes(filtres);

            // Style visuel : bouton actif
            document.querySelectorAll(".btn-filtre").forEach(function (b) {
                b.classList.remove("actif");
            });
            btn.classList.add("actif");
        });

        conteneurFiltres.appendChild(btn);
    });
}