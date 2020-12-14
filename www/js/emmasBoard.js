var URL = window.URL;
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var img = document.getElementById("img");
var res = document.getElementById("results");
var time = document.getElementById("time");
var alloedToClick = 1;
var level = 0;
var finishPosX = 0;
var finishPosY = 0;
var boardSizeX = 8;
var boardSizeY = 8;
var randomCell = 0;

cvs.addEventListener("mousemove", mousePos, false);

window.onload = function () {
    
    level = parseInt(localStorage.getItem("currentLevelIndex"));
    
    // var inputImage = document.getElementById("inputImage");
    // inputImage.addEventListener("input", handleImageFiles, false);
    drawBoard();
    setFinishPoint();
    setVirusStartPoint();
    

    setInterval(moveVirusRandom, 2000);

    setInterval(moveVirusRandom, 5000);

}
//var matrix = [][];
var matrix = Array.from(Array(8), () => new Array(8));
var currentPos = [];
var direction = 0;

function moveVirusRandom(){
    moveVirus();
    alloedToClick = 1;
}

function setFinishPoint() {
    randomCell = Math.floor(Math.random() * Math.floor(4));
   
    if (randomCell == 0) {
        finishPosX = 0;
        finishPosY = 0;
    }
    else if (randomCell == 1) {
        finishPosX = 0;
        finishPosY = boardSizeY - 1 ;
    }
    else if (randomCell == 2) {
        finishPosX = boardSizeX - 1;
        finishPosY = boardSizeY - 1;
    }
    else if (randomCell == 3) {
        finishPosX = boardSizeX - 1;
        finishPosY = 0;
    }


    ctx.fillStyle = "#f5f402"; 
    ctx.beginPath();
    ctx.arc((30 + 20 * finishPosX), (30 + 20 * finishPosY), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

}

function setVirusStartPoint() {
    if (randomCell == 0) {
        currentPos[0] = level;
        currentPos[1] = level;
    }
    else if (randomCell == 1) {
        currentPos[0] = level;
        currentPos[1] = boardSizeY - level - 1;
    }
    else if (randomCell == 2) {
        currentPos[0] = boardSizeX - level - 1;
        currentPos[1] = boardSizeY - level - 1;
    }
    else if (randomCell == 3) {
        currentPos[0] = boardSizeX - level - 1;
        currentPos[1] = level;
    }

    ctx.fillStyle = "#110011"; 
    ctx.beginPath();
    ctx.arc((30 + 20 * currentPos[0]), (30 + 20 * currentPos[1]), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawBoard() {
    //currentPos[0] = 4;
    //currentPos[1] = 4;


    var bWidth = 8;
    var bHeight = 8;
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    var ibegin = 0;
    var iend = 0;

        // Button position and dimensions 
    var buttonX = 70; 
    var buttonY = 200; 
    var buttonW = 60; 
    var buttonH = 30; 



    

    for (var pos = 0; pos < 8; pos++) {
        freePositions[pos] = 0;
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++){
            matrix[i][j] = 0; // Not lit
        }
    }

    for (var i = 0; i < bWidth + 1; i++)
    {
        ctx.moveTo(20 + 20 * i,20);
        ctx.lineTo(20 + 20 * i, 20 + 20 * bHeight);
    }

    for (var j = 0; j < bHeight + 1; j++)
    {
        ctx.moveTo(20, 20 + 20 * j);
        ctx.lineTo(20 + 20 * bWidth,20 +  20 * j);
    }
    
    ctx.stroke();

  
        // Render button 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
    ctx.fillStyle = "Black";
    ctx.font = "15px Arial";
    ctx.fillText("Horizont", 73, 220);
        // Add event listener to canvas element 
    canvas.addEventListener('click', function(event) { 
    // Control that click event occurred within position of button 
    // NOTE: This assumes canvas is positioned at top left corner  

        let brect = canvas.getBoundingClientRect();
        let bX = event.clientX - brect.left;
        let bY = event.clientY - brect.top;

        if (bX > buttonX && bX < buttonX + buttonW && bY > buttonY && bY < buttonY + buttonH) {
            if (direction == 1) {
                direction = 0;

                ctx.fillStyle = 'green'; 
                ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
                ctx.fillStyle = "Black";
                ctx.font = "15px Arial";
                ctx.fillText("Horizont", 73, 220);
            }
            else { 
                direction = 1;

                ctx.fillStyle = 'green'; 
                ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
                ctx.fillStyle = "Black";
                ctx.font = "15px Arial";
                ctx.fillText("Vertical", 75, 220);
            }

        }


        if (alloedToClick == 1)
        {
            let rect = canvas.getBoundingClientRect()
            
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            
            alloedToClick = 0;
            //alert("X =  " + x + " " +  "Y = " + y); 

            for (var i = 0; i < 8; i++) {
                for (var j = 0 ; j < 8; j++) {

                    if (x > (20 + 20 * i) &&
                        x < (40 + 20 * i) &&
                        y > (20 + 20 * j) &&
                        y < (40 + 20 * j))
                        {
                            //matrix[i][j] = !matrix[i][j];

                            //matrix[i][j] = 1;
                            //if (matrix[i][j] == 1) {
                                //     if(nextBlocks[i].shape == "horizontal") 
                                //     block.classList.add("horizontal");
                                // else
                                //     block.classList.add("vertical");
                        
                                // if(nextBlocks[i].property == "block")
                                //     block.classList.add("block");
                                // else
                                //     block.classList.add("erase");

                                //updateNextWindow();

                                if (nextBlocks[0].shape == "horizontal") {
                                    if (nextBlocks[0].blockornot == "erase") {
                                        if (checkiftaken("horizontal", i,j) == false) {
                                            ctx.fillStyle = "#c82124"; //red
                                            ctx.beginPath();
                                            ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                            ctx.arc((30 + 20 * (i + 1)), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                            matrix[i + 1][j] = 1;
                                            matrix[i][j] = 1;
                                            ctx.closePath();
                                            ctx.fill();
                                            //ctx.stroke();
                                        }
                                        else {
                                            alert("Ruta redan tagen");
                                        }
                                    }
                                    
                                }
                                if (nextBlocks[0].shape == "horizontal") {
                                    if ( nextBlocks[0].blockornot == "block") {
                                        ctx.fillStyle = "#ffffff";
                                        ctx.beginPath();
                                        ctx.arc((30 + 20 * i), (30 + 20 * j),6, 0, 2 * Math.PI);
                                        ctx.arc((30 + 20 * (i + 1)), (30 + 20 * j), 6, 0, 2 * Math.PI);
                                        matrix[i + 1][j] = 0;
                                        matrix[i][j] = 0;
                                        ctx.closePath();
                                        ctx.fill();
                                        //ctx.stroke();
                                    }
                                }
                                if (nextBlocks[0].shape == "vertical") {
                                    if (nextBlocks[0].blockornot == "erase") {
                                        if (checkiftaken("vertical", i, j) == false) {
                                            ctx.fillStyle = "#c82124"; //red
                                            ctx.beginPath();
                                            ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                            ctx.arc((30 + 20 * (i)), (30 + 20 * (j + 1)), 5, 0, 2 * Math.PI);
                                            matrix[i][j + 1] = 1;
                                            matrix[i][j] = 1;
                                            ctx.closePath();
                                            ctx.fill();
                                            //ctx.stroke();
                                        }
                                        else {
                                            alert("Ruta redan tagen");
                                        }
                                    }
                                }
                                if (nextBlocks[0].shape == "vertical") {
                                    if (nextBlocks[0].blockornot == "block") {
                                        ctx.fillStyle = "#ffffff"; 
                                        ctx.beginPath();
                                        ctx.arc((30 + 20 * i), (30 + 20 * j), 6, 0, 2 * Math.PI);
                                        ctx.arc((30 + 20 * (i)), (30 + 20 * (j + 1)), 6, 0, 2 * Math.PI);
                                        matrix[i][j + 1] = 0;
                                        matrix[i][j] = 0;
                                        ctx.closePath();
                                        ctx.fill();
                                        //ctx.stroke();
                                    }
                                } 

                                updateNextWindow();
                            
                                // ctx.fillStyle = "#c82124"; //red
                                // ctx.beginPath();
                                // ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                // ctx.closePath();
                                // ctx.fill();
                                // ctx.stroke();
                                // ctx.beginPath();
                                // if (direction == 0){
                                   
                                //     ctx.arc((30 + 20 * (i + 1)), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                //     matrix[i + 1][j] = 1;
                                // }
                                // else {
                                //     ctx.arc((30 + 20 * (i)), (30 + 20 * (j + 1)), 5, 0, 2 * Math.PI);
                                //     matrix[i][j + 1] = 1;
                                // }
                                // ctx.closePath();
                                // ctx.fill();
                                // ctx.stroke();
                            // }
                            // else {
                            //     ctx.fillStyle = "#3370d4"; //blue
                            //     ctx.beginPath();
                            //     ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                            //     ctx.closePath();
                            //     ctx.fill();
                            //     ctx.stroke();
                            // }

                            matrix[i][j] = 1;
                            if (matrix[i][j] == 1) {
                                ctx.fillStyle = "#c82124"; //red
                                ctx.beginPath();
                                ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                                ctx.beginPath();
                                if (direction == 0){
                                   
                                    ctx.arc((30 + 20 * (i + 1)), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                    matrix[i + 1][j] = 1;
                                }
                                else {
                                    ctx.arc((30 + 20 * (i)), (30 + 20 * (j + 1)), 5, 0, 2 * Math.PI);
                                    matrix[i][j + 1] = 1;
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }
                            else {
                                ctx.fillStyle = "#3370d4"; //blue
                                ctx.beginPath();
                                ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }

                        }

                }
            }
        }
       // moveVirus();
    }); 

    
}



function checkiftaken(pos,i,j){

     if (pos == "vertical") {
         if (matrix[i][j] == 0 && matrix[i][j + 1] == 0)
             return false;
     }
     else if (pos == "horizontal") {
         if (matrix[i][j] == 0 && matrix[i + 1][j] == 0)
             return false;
     }

     return true;
}

var freePositions = [];

function moveVirus() {

    var numTaken = 0;
    var moveAwayFrom = [];
    var distanceTo = [];
    ctx.fillStyle = "#3370d4"; 
    ctx.beginPath();
    ctx.arc((30 + 20 * currentPos[0]), (30 + 20 * currentPos[1]), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for (var pos = 0; pos < 8; pos++){
        freePositions[pos] = 0;
    }

    moveAwayFrom[0] = finishPosX;
    moveAwayFrom[1] = finishPosY;

    if (currentPos[0] - 1 >= 0 && currentPos[1] >= 0) {
        if (matrix[currentPos[0] - 1][currentPos[1] - 1] == 0) {
            freePositions[numTaken] = 1;
            numTaken++;
        }
    }

    if (currentPos[0] - 1 >= 0) {
        if (matrix[currentPos[0] - 1][currentPos[1]] == 0) {
            freePositions[numTaken] = 2;
            numTaken++;
        }
    }

    if (currentPos[0] - 1 >= 0 && currentPos[1] + 1 <= 7) {
        if (matrix[currentPos[0] - 1][currentPos[1] + 1] == 0) {
            freePositions[numTaken] = 3;
            numTaken++;
        }
    }

    if (currentPos[1] + 1 <= 7) {
        if (matrix[currentPos[0]][currentPos[1] + 1] == 0) {
            freePositions[numTaken] = 4;
            numTaken++;
        }
    }

    if (currentPos[0] + 1 <= 7 && currentPos[1] + 1 <= 7) {
        if (matrix[currentPos[0] + 1][currentPos[1] + 1] == 0) {
            freePositions[numTaken] = 5;
            numTaken++;
        }
    }

    if (currentPos[0] + 1 <= 7) {
        if (matrix[currentPos[0] + 1][currentPos[1]] == 0) {
            freePositions[numTaken] = 6;
            numTaken++;
        }
    }

    if (currentPos[0] + 1 <= 7 && currentPos[1] - 1 >= 0) {
        if (matrix[currentPos[0] + 1][currentPos[1] - 1] == 0) {
            freePositions[numTaken] = 7;
            numTaken++;
        }
    }
    if ( currentPos[1] - 1 >= 0) {
        if (matrix[currentPos[0]][currentPos[1] - 1] == 0) {
            freePositions[numTaken] = 8;
            numTaken++;
        }
    }
    if (numTaken == 0) {
        alert("Game over!");
    }

    //var randomCell = Math.floor(Math.random() * Math.floor(numTaken));

    for (var i = 0; i < 8; i++)
    {
        distanceTo[i] = 0.0;
    }

    var distX = 0.0;
    var distY = 0.0;
    var tempDistX = 0.0;
    var tempDistY = 0.0;

    for (var randomCell = 0; randomCell < numTaken; randomCell++){

        if (freePositions[randomCell] == 1) {
            tempDistX = currentPos[0] - 1;
            tempDistY = currentPos[1] - 1;
        }

        if (freePositions[randomCell] == 2) {
            tempDistX = currentPos[0] - 1;
            tempDistY = currentPos[1];
        }

        if (freePositions[randomCell] == 3) {
            tempDistX = currentPos[0] - 1;
            tempDistY = currentPos[1] + 1;
        }

        if (freePositions[randomCell] == 4) {
            tempDistX = currentPos[0];
            tempDistY = currentPos[1] + 1;
        }

        if (freePositions[randomCell] == 5) {
            tempDistX = currentPos[0] + 1;
            tempDistY = currentPos[1] + 1;
        }

        if (freePositions[randomCell] == 6) {
            tempDistX = currentPos[0] + 1;
            tempDistY = currentPos[1];
        }

        if (freePositions[randomCell] == 7) {
            tempDistX = currentPos[0] + 1;
            tempDistY = currentPos[1] - 1;
        }

        if (freePositions[randomCell] == 8) {
            tempDistX = currentPos[0];
            tempDistY = currentPos[1] - 1;
        }

        distX = tempDistX - moveAwayFrom[0];
        distY = tempDistY - moveAwayFrom[1];
        distanceTo[randomCell] = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));

    }

    var longDist = 0.0;
    for (var indexD = 0; indexD < numTaken; indexD++){
        if (distanceTo[indexD] >= longDist){
            longDist = distanceTo[indexD];
            randomCell = indexD;
        }
    }


    if (freePositions[randomCell] == 1) {
        currentPos[0] = currentPos[0] - 1;
        currentPos[1] = currentPos[1] - 1;
    }

    if (freePositions[randomCell] == 2) {
        currentPos[0] = currentPos[0] - 1;
        currentPos[1] = currentPos[1];
    }

    if (freePositions[randomCell] == 3) {
        currentPos[0] = currentPos[0] - 1;
        currentPos[1] = currentPos[1] + 1;
    }

    if (freePositions[randomCell] == 4) {
        currentPos[0] = currentPos[0];
        currentPos[1] = currentPos[1] + 1;
    }

    if (freePositions[randomCell] == 5) {
        currentPos[0] = currentPos[0] + 1;
        currentPos[1] = currentPos[1] + 1;
    }

    if (freePositions[randomCell] == 6) {
        currentPos[0] = currentPos[0] + 1;
        currentPos[1] = currentPos[1];
    }

    if (freePositions[randomCell] == 7) {
        currentPos[0] = currentPos[0] + 1;
        currentPos[1] = currentPos[1] - 1;
    }

    if (freePositions[randomCell] == 8) {
        currentPos[0] = currentPos[0];
        currentPos[1] = currentPos[1] - 1;
    }

    ctx.fillStyle = "#111111"; 
    ctx.beginPath();
    ctx.arc((30 + 20 * currentPos[0]), (30 + 20 * currentPos[1]), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (currentPos[0] == finishPosX && currentPos[1] == finishPosY) {
        alert("You win!");
    }
}


function mousePos(evt) {
    var rect = cvs.getBoundingClientRect();
    var x = parseInt(evt.clientX - rect.left);
    var y = parseInt(evt.clientY - rect.top);
    var p = ctx.getImageData(x, y, 1, 1).data;
    // results.innerHTML = '<table style="width:100%;table-layout:fixed"><td>X: '
    //     + x + '</td><td>Y: ' + y + '</td><td>Red: '
    //     + p[0] + '</td><td>Green: ' + p[1] + '</td><td>Blue: '
    //     + p[2] + '</td><td>Alpha: ' + p[3] + "</td></table>";
    return { x, y };
}

function handleImageFiles() {
    var url = URL.createObjectURL(document.getElementById("inputImage").files[0]);
    img.onload = decode;
    img.src = url;
}

function decode() {
    const startTime = Date.now();

    cvs.width = img.width;
    cvs.height = img.height;
    ctx.drawImage(img, 0, 0);

    output = document.getElementById("output");

    try {
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const decoded = iching.decode(imageData.data, imageData.width, imageData.height);
        output.removeAttribute("style");
        output.innerHTML = "Version: " + decoded.version + "<br>Size: " + decoded.size + "<br>Data: " + decoded.data;
    } catch (e) {
        output.setAttribute("style", "color:#FF0000;");
        output.innerHTML = e.message;
    }

    const endTime = Date.now();
    time.innerHTML = "Time taken: " + (endTime - startTime) + "ms";
}