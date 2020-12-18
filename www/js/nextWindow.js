var nextBlocks = []; // index 0 är nuvarande block-objekt som man kan lägga ut

// block-objekt
class block {
    constructor() {
        this.test;
        this.shape; // "horizontal" eller "vertical"
        this.blockornot; // "block" eller "erase"
        
    }
}

function createRandomBlock() {
    var newBlock = new block();

    // om math.random() < 0.5, skapa horizontal
    if(Math.random() < 0.5) {
        newBlock.shape = "horizontal";
        newBlock.test = "horizontal";
    }
    else {
        newBlock.shape = "vertical";
        newBlock.test = "vertical;"
    }
    
    if(Math.random() < 0.5) 
        newBlock.blockornot = "block";
    else 
        newBlock.blockornot = "erase";

   

    // newBlock.property = "block";
    // newBlock.shape = "horizontal";
    // newBlock.test = "test";
    
    return newBlock;
}

function genBlocks() {
    // create the actual blocks in the nextBlocks array
    for(var i = 0; i < 4; i++) {
        nextBlocks.push(createRandomBlock());
    }

    // draw by creating elements in html
    var nextWindow = document.getElementById("nextBlocks");
    for(var i = 0; i < nextBlocks.length; i++) {

        var block = document.createElement("div");
        block.classList.add("nextBlock");

        if(nextBlocks[i].shape == "horizontal") 
            block.classList.add("horizontal");
        else
            block.classList.add("vertical");

        if(nextBlocks[i].blockornot == "block")
            block.classList.add("block");
        else
            block.classList.add("erase");

        nextWindow.appendChild(block);

    }
}

function updateNextWindow() {
    // remove first block in array
    nextBlocks.shift();

    // add new block to last position of array
    nextBlocks.push(createRandomBlock());

    // draw by creating element in html
    // remove first block in html
    var nextWindow = document.getElementById("nextBlocks");
    nextWindow.firstChild.remove();
    // draw the new block by adding it as child to the nextBlocks element
    var block = document.createElement("div");
    block.classList.add("nextBlock");

    if(nextBlocks[nextBlocks.length - 1].shape == "horizontal")
        block.classList.add("horizontal");
    else
        block.classList.add("vertical");

    if(nextBlocks[nextBlocks.length - 1].blockornot == "block")
        block.classList.add("block");
    else
        block.classList.add("erase");

    nextWindow.appendChild(block);
}