var levelButtons = [];

// Skapa och rita ut antal level-knappar enligt totalt antal doser
function genButtons(doses) {

    for (let i = 1; i <= doses; i++) {
        
        var levelButton = document.createElement("button");
        if(i <= localStorage.unlockedLevels) { // alla upplåsta blir klickbara
            levelButton.classList.add("levelButtonStyle");
            levelButton.onclick = function() {
                startLevel(i);
            };
        }
        else { // alla låsta blir gråa och oklickbara
            levelButton.classList.add("lockedButton");
            levelButton.onclick = function () {};
        }
        
        var buttonText = document.createTextNode(i.toString());
        levelButton.appendChild(buttonText);

        document.body.appendChild(levelButton);
        levelButtons.push(levelButton);

    }

}

// ändra knappens css och onclick
function unlockLevel(index) {

    levelButtons[index - 1].classList.replace("lockedButton", "levelButtonStyle");
    levelButtons[index - 1].onclick = function () {
        startLevel(index);
    };

}

// Uppdatera curretnLevelIndex och hoppa till board.html
function startLevel(levelIndex) {

    window.localStorage.currentLevelIndex = levelIndex;
    window.location.href = "Board.html";

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