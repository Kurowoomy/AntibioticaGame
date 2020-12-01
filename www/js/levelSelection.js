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

// This is where we move to level page
function startLevel(levelIndex) {
    window.localStorage.currentLevelIndex = levelIndex;
    
    window.location.href = "Board.html";
}