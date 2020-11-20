// Variabler för levelSelection-sidan
var levelButtons = [];
var doses = 30;

// Funktioner för levelSelection-sidan
function genButtons() {

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

function startLevel(levelIndex) {
    // This is where we move to level page
    var xString = levelButtons[levelIndex - 1].levelIndex.toString();
    document.getElementById("levelButtonMessage").innerText = 
    "Level " + xString + " selected!";
}