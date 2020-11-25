document.getElementById("infoText").innerHTML = text;
var modal = document.getElementById("modal");
var btn = document.getElementById("infoButton").onclick = function() {
    modal.style.visibility = "hidden";
}

class InfoWindow {
    constructor(infoText) {
        this.text = infoText;
    }

}

function showInfoWindow(infoWindowObject) {

}