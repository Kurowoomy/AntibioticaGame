// Skapa antal level-knappar enligt totalt antal doser
function genButtons(doses) {

    var levelButtons = [];

    for (let i = 1; i <= doses; i++) {

        var menuButton = document.createElement("button");
        menuButton.classList.add("levelButtonStyle");
        menuButton.onclick = function() {
            startLevel(i);
        };

        var buttonText = document.createTextNode(i.toString());
        menuButton.appendChild(buttonText);

        document.body.appendChild(menuButton);
        levelButtons.push({btnObject: menuButton, levelIndex: i});
    }

}

// Uppdatera curretnLevelIndex och hoppa till board.html
function startLevel(levelIndex) {

    window.localStorage.currentLevelIndex = levelIndex;
    window.location.href = "CameraWithDecoder.html";

}



function toggleCollectionTab(tabID) {

    var collectionTab = document.getElementById(tabID);
    if(collectionTab.style.display == "" || collectionTab.style.display == "none") {
        collectionTab.style.display = "block"; // visible
    }
    else {
        collectionTab.style.display = "none"; // hidden
    }

}

// Collection-flik försvinner när man trycker utanför fliken
window.onclick = function(event) {

    var infoTab = document.getElementById("infoTab");
    var infoTabButton = document.getElementById("infoTabButton");
    var infoTitle = document.getElementById("infoTitle");
    var infoProgress = document.getElementById("infoProgress");
    var infoItems = document.getElementById("infoItems");

    // event.target är objektet man klickade på
    if (event.target != infoTab && event.target != infoTabButton && event.target != infoTitle &&
        event.target != infoProgress && event.target != infoItems) {
        infoTab.style.display = "none";
    }

}