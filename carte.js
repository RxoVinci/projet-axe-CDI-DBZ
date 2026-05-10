var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");

fetch("https://dragonball-api.com/api/characters/" + id)
    .then(function (response) { return response.json(); })
    .then(function (perso) {
        var conteneur = document.getElementById("detail-perso");
        conteneur.innerHTML =
            "<div class='detail-carte'>" +
            "<img src='" + perso.image + "' alt='" + perso.name + "'>" +
            "<div class='detail-infos'>" +
            "<h1>" + perso.name + "</h1>" +
            "<p><strong>Race :</strong> " + perso.race + "</p>" +
            "<p><strong>Affiliation :</strong> " + perso.affiliation + "</p>" +
            "<p><strong>Genre :</strong> " + perso.gender + "</p>" +
            "<p><strong>Ki de base :</strong> " + perso.ki + "</p>" +
            "<p><strong>Ki maximum :</strong> " + perso.maxKi + "</p>" +
            "<button onclick='window.history.back()'>← Retour</button>" +
            "</div></div>";
    })
    .catch(function (erreur) { console.error("Erreur : ", erreur); });