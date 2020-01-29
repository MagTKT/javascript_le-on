//REQUETTE AVEC FONCTION GENERIQUE
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès

function ajaxGet(url, markers, callback) {
    //etapes 1 appelle la function ajaxGet

    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType ='json';
    req.addEventListener("load", function () {
        //etapes 3 il lance la requete

        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.response, markers);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}