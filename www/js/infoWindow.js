class InfoWindow { // För att skapa objekt som kan redigeras
    constructor() {
        // Variabler redigerbara av knappen
        this.image = document.createElement("img");
        this.text = document.createElement("div");
        
        // Yta som täcker allt på skärmen och innehåller fönstret
        this.modal = document.createElement("div");
        this.modal.id = "infoModal";
        this.modal.classList.add("infoModal"); // css
        
        // Fönstret
        this.window = document.createElement("div");
        this.window.id = "window";
        this.window.classList.add("infoWindow");

        // Stäng-knapp
        this.button = document.createElement("button");
        this.button.innerHTML = "Got it!";
        var obj = this; // kan ej nå this i funktionen nedan, måste använda obj
        this.button.onclick = function() {
            document.body.removeChild(obj.modal); // ta bort inforuta från sidan
        };
    }
}
// Metoder för InfoWindow. Prototype gör så att det går att använda this
InfoWindow.prototype.setAndShowContent = function(infoText, imageSrc) {
    // Bild läggs endast till om det anges som parameter i createInfoButton
    if(imageSrc !== undefined) {
        this.image.src = imageSrc;
        document.getElementById("window").appendChild(this.image);
    }

    this.text.innerHTML = infoText;
    document.getElementById("window").appendChild(this.text);

    document.getElementById("window").appendChild(this.button);
}



// Skapar en knapp som ändrar och visar upp inforutan
// TODO: Skapa array så man kan komma åt infoknapparna senare om man vill
function createInfoButton(title, infoText, imageSrc) {
    var infoButton = document.createElement("button"); // objekt
    infoButton.classList.add("exampleButton"); // css
    document.body.appendChild(infoButton); // html-objekt

    infoButton.textContent = title;

    // Knapp skapar inforuta för varje klick
    infoButton.onclick = function() {
        var infoWindow = new InfoWindow();

        document.body.appendChild(infoWindow.modal);
        document.getElementById("infoModal").appendChild(infoWindow.window);

        infoWindow.setAndShowContent(infoText, imageSrc);
    }
}