let aufgaben = [];
let aktuelleAufgabeIndex = 0;
let aktuelleVersuche = 0;

function startPruefung() {
    let anzahl = parseInt(document.getElementById("anzahl").value);
    let level = document.getElementById("level").value;

    aufgaben = generiereAufgaben(anzahl, level);
    aktuelleAufgabeIndex = 0;
    aktuelleVersuche = 0;

    document.getElementById("geloesteContainer").innerHTML = "";
    zeigeAktuelleAufgabe();
}

function generiereAufgaben(anzahl, level) {
    let operationen, zahlenbereich;

    switch (level) {
        case "leicht":
            operationen = ["+", "-"];
            zahlenbereich = 20;
            break;
        case "mittel":
            operationen = ["+", "-", "*"];
            zahlenbereich = 100;
            break;
        case "schwer":
            operationen = ["+", "-", "*", "/"];
            zahlenbereich = 1000;
            break;
    }

    let aufgabenListe = [];

    for (let i = 0; i < anzahl; i++) {
        let zahl1 = Math.floor(Math.random() * zahlenbereich) + 1;
        let zahl2 = Math.floor(Math.random() * zahlenbereich) + 1;
        let operation = operationen[Math.floor(Math.random() * operationen.length)];

        if (operation === "/" && zahl1 % zahl2 !== 0) {
            zahl1 = zahl2 * (Math.floor(Math.random() * (zahlenbereich / zahl2)) + 1);
        }

        let frage = `${zahl1} ${operation} ${zahl2} = `;
        let loesung = eval(zahl1 + operation + zahl2);

        aufgabenListe.push({ frage, loesung, level });
    }

    return aufgabenListe;
}

function zeigeAktuelleAufgabe() {
    if (aktuelleAufgabeIndex >= aufgaben.length) {
        document.getElementById("aktuellerContainer").innerHTML = "<h3>Alle Aufgaben gelöst!</h3>";
        return;
    }

    let aktuelleAufgabe = aufgaben[aktuelleAufgabeIndex];
    document.getElementById("aktuellerContainer").innerHTML = `
        <h3>Aufgabe ${aktuelleAufgabeIndex + 1}:</h3>
        <p>${aktuelleAufgabe.frage}</p>
        <input type="number" id="antwort" placeholder="Antwort eingeben">
        <button onclick="pruefeAntwort()">Bestätigen</button>
        <p id="feedback"></p>
    `;
}

function pruefeAntwort() {
    let aktuelleAufgabe = aufgaben[aktuelleAufgabeIndex];
    let nutzerAntwort = parseFloat(document.getElementById("antwort").value);
    let feedback = document.getElementById("feedback");

    aktuelleVersuche++;

    if (nutzerAntwort === aktuelleAufgabe.loesung) {
        feedback.innerHTML = "<span style='color: green;'>Richtig!</span>";
        speichereGeloesteAufgabe(aktuelleAufgabe, aktuelleVersuche);
        aktuelleAufgabeIndex++;
        aktuelleVersuche = 0;
        setTimeout(zeigeAktuelleAufgabe, 1000);
    } else {
        feedback.innerHTML = "<span style='color: red;'>Falsch! Versuche es noch einmal.</span>";
    }
}

function speichereGeloesteAufgabe(aufgabe, versuche) {
    let geloesteContainer = document.getElementById("geloesteContainer");
    let p = document.createElement("p");
    p.innerHTML = `✅ ${aufgabe.frage} ${aufgabe.loesung} (Level: ${aufgabe.level}, Versuche: ${versuche})`;
    geloesteContainer.appendChild(p);
}