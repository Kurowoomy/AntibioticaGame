

// Funktioner för levelSelection-sidan
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


function toggleCollectionTab(tabID) {
    var collectionTab = document.getElementById(tabID);

    if(collectionTab.style.display == "" || collectionTab.style.display == "none") {
        collectionTab.style.display = "block";
    }
    else {
        collectionTab.style.display = "none";
    }

}

// This is where we move to level page
function startLevel(levelIndex) {
    window.localStorage.currentLevelIndex = levelIndex;
    
    window.location.href = "Board.html";
}


window.onclick = function(event) {
    var infoTab = document.getElementById("infoTab");
    var infoTabButton = document.getElementById("infoTabButton");

    if (event.target !== infoTab && event.target !== infoTabButton) {
        infoTab.style.display = "none";
    }
}