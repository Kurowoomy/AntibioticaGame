var levelButtons = [];
var doseTimes = [];

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
    
    

// parse localStorage.doseTimes into doseTimes array
function parseDoseTimes() {
    doseTimes = localStorage.doseTimes.split(",");

    var finalString = doseTimes[0];
    for(var i = 1; i < doseTimes.length; i++) {
        finalString += ", " + doseTimes[i];
    }

    document.getElementById("doseTimesText").innerHTML = "Your dose time(s): " + finalString;
}
    
// sker när sidan laddas
function checkTime() {
    // jämför dag ifall man behöver låsa upp för flera dagar
    updateCurrentDay();
    
    // unlock levels from past days if needed
    while(localStorage.currentDay * localStorage.dosesPerDay - localStorage.unlockedLevels
        > localStorage.dosesPerDay) {
        localStorage.unlockedLevels++;
        unlockLevel(localStorage.unlockedLevels);
    }
        

    // ------------ Unlock today's levels if possible --------------------------------------------
    // jämför nuvarande tid med inställda tiden för doserna, om ok unlockLevel()
    // if unlockedLevels % dosesPerDay == 0, 3 levlar kvar för dagen
    var levelDifference = localStorage.unlockedLevels % localStorage.dosesPerDay;
    var doseTimeIndex = levelDifference; // levelDifference needed in for loop

    var currentDate = new Date();
    currentDate.setSeconds(0, 0);
    var doseTime = new Date();

    for(var i = 0; i < localStorage.dosesPerDay - levelDifference; i++) {
        var splitTime = doseTimes[doseTimeIndex].split(":");
        doseTime.setHours(splitTime[0], splitTime[1], 0, 0);
        
        // if ok, unlock and doseTimeIndex++
        if(currentDate - doseTime >= 0) { // compare milliseconds
            doseTimeIndex++;
            localStorage.unlockedLevels++;
            unlockLevel(localStorage.unlockedLevels);
            document.getElementById("unlockedLevelsText").innerHTML="Unlocked levels: " + localStorage.unlockedLevels;
        }
        // else, exit for loop, the later times will not match criteria if first one doesn't
        else {
            break;
        }
    }
    
}

function updateCurrentDay() {
    var firstDate = new Date(localStorage.firstDay.toString());
    var currentDate = new Date();

    firstDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    var difference = (currentDate - firstDate) / (1000 * 3600 * 24); // milliseconds to days
    // uppdatera currentDay (skillnad == 3 -> currentDay = skillnad + 1 -> currentDay == 4)
    localStorage.currentDay = difference + 1;
}