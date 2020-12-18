var nextBlocks = []; // index 0 är nuvarande block-objekt som man kan lägga ut
// Kalla på updateNextWindow() när ett block har lagts ut/använts

// block-objekt
class Block {
    constructor() {
        this.test;
        this.shape; // "horizontal" eller "vertical"
        this.blockornot; // "block" eller "erase"
        
    }
}

function createRandomBlock() {
    var newBlock = new Block();

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
    

    if(Math.random() < 0.5)
        newBlock.shape = "horizontal";
    else 
        newBlock.shape = "vertical";
    
    if(Math.random() < 0.5) 
        newBlock.property = "block";
    else 
        newBlock.property = "erase";


    return newBlock;
}

function genBlocks() {
    // create the actual blocks in the nextBlocks array
    // make sure first block always is "block"
    var firstBlock = new Block();
    firstBlock.property = "block";

    if(Math.random() < 0.5)
        firstBlock.shape = "horizontal";
    else 
        firstBlock.shape = "vertical";

    nextBlocks.push(firstBlock);

    // the remaining 3 blocks
    for(var i = 1; i < 4; i++) {
        nextBlocks.push(createRandomBlock());
    }

    // draw by creating elements in html
    var nextWindow = document.getElementById("nextBlocks");
    for(var i = 0; i < nextBlocks.length; i++) {

        var blockContainer = document.createElement("div");
        blockContainer.classList.add("nextBlockContainer");

        var block = document.createElement("div");
        block.classList.add("nextBlock");

        if(nextBlocks[i].shape == "horizontal") 
            block.classList.add("horizontal");
        else
            block.classList.add("vertical");


        if(nextBlocks[i].blockornot == "block")

        if(nextBlocks[i].property == "block")
            block.classList.add("block");
        else
            block.classList.add("erase");

        blockContainer.appendChild(block);
        nextWindow.appendChild(blockContainer);

    }
}

function updateNextWindow() {
    // remove first block in array
    nextBlocks.shift();

    // add new block to last position of array
    nextBlocks.push(createRandomBlock());

    // draw -----------------------------------------------------------------------------
    // remove first block in html
    var nextWindow = document.getElementById("nextBlocks");
    nextWindow.firstChild.remove();
    // draw the new block by adding it as child to the nextBlocks element
    var blockContainer = document.createElement("div");
    blockContainer.classList.add("nextBlockContainer");

    var block = document.createElement("div");
    block.classList.add("nextBlock");

    if(nextBlocks[nextBlocks.length - 1].shape == "horizontal")
        block.classList.add("horizontal");
    else
        block.classList.add("vertical");


    if(nextBlocks[nextBlocks.length - 1].blockornot == "block")

    if(nextBlocks[nextBlocks.length - 1].property == "block")

        block.classList.add("block");
    else
        block.classList.add("erase");

    blockContainer.appendChild(block);
    nextWindow.appendChild(blockContainer);
    // ----------------------------------------------------------------------------------
}