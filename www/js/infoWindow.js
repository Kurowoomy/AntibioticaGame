class InfoWindow { // För att skapa objekt som kan redigeras
    constructor() {
        // Variabler redigerbara av knappen
        this.text = document.createElement("div");
        this.image = document.createElement("img");
        
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
        var obj = this; // kan ej nå this i funktionen nedan
        this.button.onclick = function() {
            obj.modal.style.visibility = "hidden";
        };
    }
}
// Metoder för InfoWindow. Prototype gör så att det går att använda this
InfoWindow.prototype.setAndShowContent = function(infoText, imageSrc) {
    this.text.innerHTML = infoText;
    this.image.src = imageSrc;

    this.modal.style.visibility = "visible";
}



// Global variabel som alla infoknappar kan ändra innehåll på
var infoWindow = new InfoWindow();

// Skapar info-objekten som syns i html
function createInfoWindow(visibility) {
    infoWindow.modal.style.visibility = visibility;
    document.body.appendChild(infoWindow.modal);
    document.getElementById("infoModal").appendChild(infoWindow.window);
    document.getElementById("window").appendChild(infoWindow.text);
    document.getElementById("window").appendChild(infoWindow.button);
    document.getElementById("window").appendChild(infoWindow.image);
}

// Skapar en knapp som ändrar och visar upp inforutan
function createInfoButton(infoText, imageSrc) {
    var infoButton = document.createElement("button"); // objekt
    infoButton.classList.add("exampleButton"); // css
    document.body.appendChild(infoButton); // html-objekt

    infoButton.onclick = function() {
        infoWindow.setAndShowContent(infoText, imageSrc);
    }
}
