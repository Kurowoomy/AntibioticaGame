var URL = window.URL;
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var img = document.getElementById("img");
var res = document.getElementById("results");
var time = document.getElementById("time");

window.onload = function () {
    var inputImage = document.getElementById("inputImage");
    inputImage.addEventListener("input", handleImageFiles, false);
}

function handleImageFiles() {
    var url = URL.createObjectURL(document.getElementById("inputImage").files[0]);
    img.onload = decode;
    img.src = url;
}
function decode() {
    alert("Decodeing has begun");
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


        output.innerHTML = "<br>Data: " + decoded.data;

        alert(decoded.data);
    } catch (e) {
        output.setAttribute("style", "color:#FF0000;");
        output.innerHTML = e.message;
        alert(e.message);
    }

    const endTime = Date.now();
    time.innerHTML = "Time taken: " + (endTime - startTime) + "ms";
}