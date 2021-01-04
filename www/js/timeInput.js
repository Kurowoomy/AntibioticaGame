var timeInputs = [];

function setupPage() {
    // draw 
    var contentSection = document.getElementById("contentSection");
    var instructionP = document.createElement("p");

    var instructionText = (localStorage.dosesPerDay > 1) ? " doses per day. When do you want to take them?<br>" :
    " dose per day. When do you want to take it?<br>";
    instructionP.innerHTML = localStorage.dosesPerDay + instructionText;

    contentSection.appendChild(instructionP);

    // create amount of divs based on dpd (DosesPerDay)
    for(var i = 0; i < localStorage.dosesPerDay; i++) {
        var dpdDiv = document.createElement("div");

        var inputText = document.createElement("label");
        inputText.innerHTML = "Dose " + (i+1) + ": ";
        dpdDiv.appendChild(inputText);

        // time input scroll
        var timePicker = document.createElement("input");
        timePicker.type = "time";
        dpdDiv.appendChild(timePicker);

        contentSection.appendChild(dpdDiv);
    }


}

function saveTime() {
    var contentSection = document.getElementById("contentSection");
    var timeInputs = contentSection.getElementsByTagName("input");

    var doseTimes = [];
    for(var i = 0; i < timeInputs.length; i++) {
        doseTimes.push(timeInputs[i].value);
    }
    localStorage.doseTimes = doseTimes;

    var date = new Date();
    // firstDay bör egentligen uppdateras efter användaren startat sin första level
    // så användaren kan ta sin första dos/börja spela när hen vill
    window.localStorage.firstDay = date;
    
    document.location.href = 'levelSelection.html';
}
