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

    carte.innerHTML =
        "<img src='" + perso.image + "' alt='" + perso.name + "'>" +
        "<p class='nom-carte'>" + perso.name + "</p>" +
        "<p class='race-carte'>" + perso.race + "</p>";

    /* Au clic sur la carte, on affiche les détails du personnage */
    carte.addEventListener("click", function () {
        alert(perso.name + "\nRace : " + perso.race + "\nAffiliation : " + perso.affiliation);
    });

    /* Curseur pointer pour montrer que c'est cliquable */
    carte.style.cursor = "pointer";

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
    /* Cette fonction bascule entre le mode clair et le mode sombre */
    /* Elle est appelée quand on clique sur le bouton lune */
    function basculerMode() {

        /* body.classList.toggle = "si la classe dark est là, enlève-la, sinon ajoute-la" */
        document.body.classList.toggle("dark");

        /* On change l'emoji selon le mode actif */
        var bouton = document.getElementById("btn-dark");
        if (document.body.classList.contains("dark")) {
            bouton.textContent = "☀️";
        } else {
            bouton.textContent = "🌙";
        }
    }

    /* Ouvre le menu mobile en le rendant visible */
    function ouvrirMenu() {
        document.getElementById("menu-mobile").style.display = "block";
    }

    /* Ferme le menu mobile en le cachant */
    function fermerMenu() {
        document.getElementById("menu-mobile").style.display = "none";
    }