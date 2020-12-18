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
var currentStartTime = new Date();
var currentStartTimeInmsec;
var bWidth = 8;
var bHeight = 8;
var totalBoardSizeX = 20;
var totalBoardSizeY = 20;
var beginningOfTouch = 0.0;
//var currentTimeInmsec;


cvs.addEventListener("mousemove", mousePos, false);

window.onload = function () {
    
    level = parseInt(localStorage.getItem("currentLevelIndex"));
   
    
    var el = document.getElementById("canvas");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
    //el.addEventListener('click', handleClick,false);

    // var inputImage = document.getElementById("inputImage");
    // inputImage.addEventListener("input", handleImageFiles, false);
    resetVariables();
    drawBoard();
    setFinishPoint();
    setVirusStartPoint();
   
    currentStartTimeInmsec = currentStartTime.getTime();
    setInterval(moveVirusRandom, 2000);
    //setInterval(elpasedTime, 1000);
}
//var matrix = [][];
var matrix = Array.from(Array(8), () => new Array(8));
var currentPos = [];
var direction = 0;
var lastTouchDistance = 0.0;
var lastTouch = 0.0;
var ongoingTouches = [];

function handleClick(xcurrent,ycurrent) {
   
        // Control that click event occurred within position of button 
        // NOTE: This assumes canvas is positioned at top left corner  
            
            //alert("canvas click");
    
            let brect = canvas.getBoundingClientRect();
            //let bX = event.clientX - brect.left;
            //let bY = event.clientY - brect.top;
            let bX = xcurrent - brect.left;
            let bY = ycurrent - brect.top;
    
            // if (bX > buttonX && bX < buttonX + buttonW && bY > buttonY && bY < buttonY + buttonH) {
            //     if (direction == 1) {
            //         direction = 0;
    
            //         ctx.fillStyle = 'green'; 
            //         ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
            //         ctx.fillStyle = "Black";
            //         ctx.font = "15px Arial";
            //         ctx.fillText("Horizont", 73, 220);
            //     }
            //     else { 
            //         direction = 1;
    
            //         ctx.fillStyle = 'green'; 
            //         ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
            //         ctx.fillStyle = "Black";
            //         ctx.font = "15px Arial";
            //         ctx.fillText("Vertical", 75, 220);
            //     }
    
            // }
    
    
            //if (alloedToClick == 1)
            //{
                let rect = canvas.getBoundingClientRect()
                
                let x = xcurrent - rect.left;
                let y = ycurrent - rect.top;
                
                alloedToClick = 0;
                //alert("X =  " + x + " " +  "Y = " + y); 
    
                for (var i = 0; i < 8; i++) {
                    for (var j = 0 ; j < 8; j++) {
    
                        if (x > (20 + totalBoardSizeX * i) &&
                            x < (40 + totalBoardSizeX * i) &&
                            y > (20 + totalBoardSizeY * j) &&
                            y < (40 + totalBoardSizeY * j))
                            {
    
                                blockTaken = false;
    
                                if (nextBlocks[0].shape == "horizontal") {
                                    if (nextBlocks[0].blockornot == "erase") {
                                        if ((i + 1) >= bWidth) {
                                            alert("Utanför spelplan");
                                            blockTaken = true;
                                        }
                                        else {
                                            if (checkiftaken("horizontal", i,j) == false) {
    
                                                ctx.fillStyle = "#c82124"; //red
                                                ctx.beginPath();
                                                ctx.arc((30 + totalBoardSizeX * i), (30 + totalBoardSizeY * j), 5, 0, 2 * Math.PI);
                                                ctx.arc((30 + totalBoardSizeX * (i + 1)), (30 + totalBoardSizeY * j), 5, 0, 2 * Math.PI);
                                                matrix[i + 1][j] = 1;
                                                matrix[i][j] = 1;
                                                ctx.closePath();
                                                ctx.fill();
                                                //ctx.stroke();
                                            }
                                            else {
                                                alert("Ruta redan tagen");
                                                blockTaken = true;
                                            }
                                        }
                                    }
                                    
                                }
                                if (nextBlocks[0].shape == "horizontal") {
                                    if ( nextBlocks[0].blockornot == "block") {
                                        ctx.fillStyle = "#ffffff";
                                        ctx.beginPath();
                                        ctx.arc((30 + totalBoardSizeX * i), (30 + totalBoardSizeY * j),6, 0, 2 * Math.PI);
                                        ctx.arc((30 + totalBoardSizeX * (i + 1)), (30 + totalBoardSizeY * j), 6, 0, 2 * Math.PI);
                                        matrix[i + 1][j] = 0;
                                        matrix[i][j] = 0;
                                        ctx.closePath();
                                        ctx.fill();
                                        //ctx.stroke();
                                    }
                                }
                                if (nextBlocks[0].shape == "vertical") {
                                    if (nextBlocks[0].blockornot == "erase") {
                                        if ((j + 1) >= bHeight) {
                                            alert("Utanför spelplan");
                                            blockTaken = true;
                                        }
                                        else {
                                            if (checkiftaken("vertical", i, j) == false) {
                                                ctx.fillStyle = "#c82124"; //red
                                                ctx.beginPath();
                                                ctx.arc((30 + totalBoardSizeX * i), (30 + totalBoardSizeY * j), 5, 0, 2 * Math.PI);
                                                ctx.arc((30 + totalBoardSizeX * (i)), (30 + totalBoardSizeY * (j + 1)), 5, 0, 2 * Math.PI);
                                                matrix[i][j + 1] = 1;
                                                matrix[i][j] = 1;
                                                ctx.closePath();
                                                ctx.fill();
                                                //ctx.stroke();
                                            }
                                            else {
                                                alert("Ruta redan tagen");
                                                blockTaken = true;
                                            }
                                        }
                                    }
                                }
                                if (nextBlocks[0].shape == "vertical") {
                                    if (nextBlocks[0].blockornot == "block") {
                                        ctx.fillStyle = "#ffffff"; 
                                        ctx.beginPath();
                                        ctx.arc((30 + totalBoardSizeX * i), (30 + totalBoardSizeY * j), 6, 0, 2 * Math.PI);
                                        ctx.arc((30 + totalBoardSizeX * (i)), (30 + totalBoardSizeY * (j + 1)), 6, 0, 2 * Math.PI);
                                        matrix[i][j + 1] = 0;
                                        matrix[i][j] = 0;
                                        ctx.closePath();
                                        ctx.fill();
                                        //ctx.stroke();
                                    }
                                } 
    
                                if (blockTaken == false){
                                    updateNextWindow();
                                }
    
                                // //matrix[i][j] = !matrix[i][j];
                                // matrix[i][j] = 1;
                                // if (matrix[i][j] == 1) {
                                //     ctx.fillStyle = "#c82124"; //red
                                //     ctx.beginPath();
                                //     ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                //     ctx.closePath();
                                //     ctx.fill();
                                //     ctx.stroke();
                                //     ctx.beginPath();
                                //     if (direction == 0){
                                       
                                //         ctx.arc((30 + 20 * (i + 1)), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                //         matrix[i + 1][j] = 1;
                                //     }
                                //     else {
                                //         ctx.arc((30 + 20 * (i)), (30 + 20 * (j + 1)), 5, 0, 2 * Math.PI);
                                //         matrix[i][j + 1] = 1;
                                //     }
                                //     ctx.closePath();
                                //     ctx.fill();
                                //     ctx.stroke();
                                // }
                                // else {
                                //     ctx.fillStyle = "#3370d4"; //blue
                                //     ctx.beginPath();
                                //     ctx.arc((30 + 20 * i), (30 + 20 * j), 5, 0, 2 * Math.PI);
                                //     ctx.closePath();
                                //     ctx.fill();
                                //     ctx.stroke();
                                // }
                            }
    
                    }
                }
            //}
           // moveVirus();
   

}

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;
          
    for (var i = 0; i < touches.length; i++) {
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
    //   var color = colorForTouch(touches[i]);
    //   ctx.beginPath();
    //   ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    //   ctx.fillStyle = color;
    //   ctx.fill();

    lastTouch = touches[i].pageX;
    beginningOfTouch = touches[i].pageX;
      console.log("touchstart:" + i + ".");
    }
    //alert(lastTouch);
  }

  function handleMove(evt) {
    evt.preventDefault();
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;
    //alert("handleMove");

    for (var i = 0; i < touches.length; i++) {
      var color = colorForTouch(touches[i]);
      var idx = ongoingTouchIndexById(touches[i].identifier);
  
      if (idx >= 0) {
        console.log("continuing touch "+idx);
        // ctx.beginPath();
        // console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
        // ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        // console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
        // ctx.lineTo(touches[i].pageX, touches[i].pageY);
        // ctx.lineWidth = 4;
        // ctx.strokeStyle = color;
        // ctx.stroke();

           //alert("Touch");
        var touchDistance = 0.0;
        var lastTouchX = 0.0;

        //var t1 = e.touches[0];
        //alert("T1X: " + touch.clientX + " T1Y: " + touch.clientY);
        var t1 = touches[i].pageX;
        //var t2 = e.touches[1];
        //alert("T2X: " + t2.clientX + " T2Y: " + t2.clientY);
        
        var dX = 0.0;
        var dY = 0.0;
    
        
        // dX = t1.clientX - t2.clientX;
        // dY = t1.clientY - t2.clientY;

        touchDistance = t1;

        //alert(touchDistance);

        if (touchDistance > lastTouch) {
            //alert("touchDistance > lastTouch");
            if (totalBoardSizeX < 30) {
                        totalBoardSizeX += 1;
                        totalBoardSizeY += 1;
            }
        }

        if (touchDistance < lastTouch) {
            //alert("touchDistance < lastTouch");
            if (totalBoardSizeX > 10) {
                        totalBoardSizeX -= 1;
                        totalBoardSizeY -= 1;
            }
        }
        // touchDistance = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
        // if (touchDistance > lastTouchDistance)
        // {
        //     // Make bigger
        //     if (totalBoardSizeX < 30) {
        //         totalBoardSizeX += 1;
        //         totalBoardSizeY += 1;
        //         //drawBoard();
        //     }

        // }
        // if (touchDistance < lastTouchDistance){
        //     // Make smaller
        //     if (totalBoardSizeX > 10) {
        //         totalBoardSizeX -= 1;
        //         totalBoardSizeY -= 1;
        //         //drawBoard();
        //     }
        // }

        // drawBoard();
        // lastTouchDistance = touchDistance;
        // lastTouch = touchDistance;
        // var mouseEvent = new MouseEvent("mousemove", {
        //   clientX: touch.clientX,
        //   clientY: touch.clientY
        // });
        // cvs.dispatchEvent(mouseEvent);
  
        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        console.log(".");
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
    drawBoard();
    lastTouchDistance = touchDistance;
    lastTouch = touchDistance;
  }

    function handleEnd(evt) {
        evt.preventDefault();
        var curposx, curposy;

        // log("touchend");
        var el = document.getElementById("canvas");
        var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
    
        for (var i = 0; i < touches.length; i++) {
        //   var color = colorForTouch(touches[i]);
            var idx = ongoingTouchIndexById(touches[i].identifier);
        
            if (idx >= 0) {
            //     ctx.lineWidth = 4;
            //     ctx.fillStyle = color;
            //     ctx.beginPath();
            //     ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            //     ctx.lineTo(touches[i].pageX, touches[i].pageY);
            //     ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
                curposx = touches[i].pageX;
                curposy = touches[i].pageY;
                ongoingTouches.splice(idx, 1);  // remove it; we're done
            } else {
                console.log("can't figure out which touch to end");
            }
        
        }
        //alert("handelEnd");

        var dist = Math.abs(curposx - beginningOfTouch);
        //alert(dist);

        if (Math.abs(curposx - beginningOfTouch) < 10) {
            //alert("IF");
            handleClick(curposx, curposy);
        }
    }

  function handleCancel(evt) {
    // evt.preventDefault();
    // console.log("touchcancel.");
    // var touches = evt.changedTouches;
    
    // for (var i = 0; i < touches.length; i++) {
    //   var idx = ongoingTouchIndexById(touches[i].identifier);
    //   ongoingTouches.splice(idx, 1);  // remove it; we're done
    // }
  }

  function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    console.log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
  }

  function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }

  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
      
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }

  function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + "\n" + p.innerHTML;
  }

/*
cvs.addEventListener("touchmove", function (e) {
    //alert("Touch");
    var touchDistance = 0.0;
    var lastTouchX = 0.0;

    //var t1 = e.touches[0];
    //alert("T1X: " + touch.clientX + " T1Y: " + touch.clientY);

    //var t2 = e.touches[1];
    //alert("T2X: " + t2.clientX + " T2Y: " + t2.clientY);
    
    var dX = 0.0;
    var dY = 0.0;
   
    var t1 = e.to
    dX = t1.clientX - t2.clientX;
    dY = t1.clientY - t2.clientY;

    touchDistance = t1.clientX;

    if (touchDistance > lastTouch) {
        if (totalBoardSizeX < 30) {
                    totalBoardSizeX += 1;
                    totalBoardSizeY += 1;
        }
    }

    if (touchDistance < lastTouchDistance) {
        if (totalBoardSizeX > 10) {
                    totalBoardSizeX -= 1;
                    totalBoardSizeY -= 1;
        }
    }
    // touchDistance = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
    // if (touchDistance > lastTouchDistance)
    // {
    //     // Make bigger
    //     if (totalBoardSizeX < 30) {
    //         totalBoardSizeX += 1;
    //         totalBoardSizeY += 1;
    //         //drawBoard();
    //     }

    // }
    // if (touchDistance < lastTouchDistance){
    //     // Make smaller
    //     if (totalBoardSizeX > 10) {
    //         totalBoardSizeX -= 1;
    //         totalBoardSizeY -= 1;
    //         //drawBoard();
    //     }
    // }

    drawBoard();
    lastTouchDistance = touchDistance;
    lastTouch = touchDistance;
    // var mouseEvent = new MouseEvent("mousemove", {
    //   clientX: touch.clientX,
    //   clientY: touch.clientY
    // });
    // cvs.dispatchEvent(mouseEvent);
  }, false);
*/
  /*
  cvs.addEventListener("touchstart", function (e) {
    //Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
    var dX = 0.0;
    var dY = 0.0;
    var t1 = e.touches[0];
    var t2 = e.touches[1];

    dX = t1.clientX - t2.clientX;
    dY = t1.clientY - t2.clientY;


    lastTouchDistance = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
    lastTouch = t1.clientX;

  }, false);
*/

function elpasedTime(){

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    var ddate = new Date();
    var elapsedTimeInmsec;
    var currentTimeInmsec = ddate.getTime();
    elapsedTimeInmsec = currentTimeInmsec - currentStartTimeInmsec;
    var msec = elapsedTimeInmsec;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    ctx.fillStyle = 'White'; 
    ctx.fillRect(20, 180, 40, 20); 
    ctx.fillStyle = "Black";
    ctx.font = "15px Arial";
    ctx.fillText(mm + ":" + ss, 20, 200);

}

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
    ctx.arc((30 + 20 * currentPos[0]), (30 + 20 * currentPos[1]), 4, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function resetVariables(){
    for (var pos = 0; pos < 8; pos++) {
        freePositions[pos] = 0;
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++){
            matrix[i][j] = 0; // Not lit
        }
    }
}


function drawTaken() {
    for (var x = 0; x < bWidth; x++)
    {
        for (var y = 0 ;y < bHeight; y++)
        {
            if (matrix[x][y] == 1) {
                ctx.fillStyle = "#c82124"; //red
                ctx.beginPath();
                ctx.arc((30 + totalBoardSizeX * i), (30 + totalBoardSizeY * j), 5, 0, 2 * Math.PI);
                ctx.arc((30 + totalBoardSizeX * (i + 1)), (30 + totalBoardSizeY * j), 5, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

}

function drawBoard() {
    //currentPos[0] = 4;
    //currentPos[1] = 4;

    var blockTaken;
    ctx.clearRect(0,0,cvs.width, cvs.height);
    // var c = document.getElementById("canvas");
    // var ctx = c.getContext("2d");
    
    var ibegin = 0;
    var iend = 0;

        // Button position and dimensions 
    var buttonX = 70; 
    var buttonY = 200; 
    var buttonW = 60; 
    var buttonH = 30; 

    //alert(totalBoardSizeX + " : " + totalBoardSizeY);

      // ctx.lineWidth = 4;
        // ctx.strokeStyle = color;
        // ctx.stroke();
   
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(20, 20);

    for (var i = 0; i < bWidth + 1; i++)
    {
        // ctx.moveTo(20 + 20 * i,20);
        // ctx.lineTo(20 + 20 * i, 20 + 20 * bHeight);
        ctx.moveTo(20 + totalBoardSizeX * i,20);
        ctx.lineTo(20 + totalBoardSizeX * i, 20 + totalBoardSizeY * bHeight);
    }

    for (var j = 0; j < bHeight + 1; j++)
    {
        ctx.moveTo(20, 20 + totalBoardSizeY * j);
        ctx.lineTo(20 + totalBoardSizeX * bWidth,20 +  totalBoardSizeY * j);
    }
    //ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "Black";
    ctx.stroke();

    //drawTaken();
  
        // Render button 
    // ctx.fillStyle = 'green'; 
    // ctx.fillRect(buttonX, buttonY, buttonW, buttonH); 
    // ctx.fillStyle = "Black";
    // ctx.font = "15px Arial";
    // ctx.fillText("Horizont", 73, 220);
        // Add event listener to canvas element 
    

    
}
var freePositions = [];

function moveVirus() {

    var numTaken = 0;
    var moveAwayFrom = [];
    var distanceTo = [];
    
    
    ctx.beginPath();
    ctx.arc((30 + totalBoardSizeX * currentPos[0]), (30 + totalBoardSizeY * currentPos[1]), 6, 0, 2 * Math.PI);
   
    ctx.fillStyle = "#ffffff"; 
    ctx.fill();
    ctx.lineWidth = 0;
    ctx.strokeStyle = "white";
    ctx.closePath();
    
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
    //alert("X: " + currentPos[0] + " Y: " + currentPos[1]);

    var randomCellFree = Math.floor(Math.random() * Math.floor(numTaken));

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
    var randomIndex;
    for (var indexD = 0; indexD < numTaken; indexD++){
        if (distanceTo[indexD] >= longDist){
            longDist = distanceTo[indexD];
            randomIndex = indexD;
        }
    }

    var RandomChoice = Math.random();
    if (RandomChoice < 0.5) {
        randomCell = randomIndex;
    }
    else {
        randomCell = randomCellFree;
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
    ctx.arc((30 + totalBoardSizeX * currentPos[0]), (30 + totalBoardSizeY * currentPos[1]), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (currentPos[0] == finishPosX && currentPos[1] == finishPosY) {
        alert("You win!");
    }
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