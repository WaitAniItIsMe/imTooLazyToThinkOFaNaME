daStatus = "";
objName = "";
objects = [];

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function draw(){
    image(video, 0, 0, 500, 400);
    if(daStatus != ""){
        model.detect(video, gotResult);

        for( i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected.";

            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objName){
                document.getElementById("numberOfObjects").innerHTML = objName + "has been found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objName + "has been found.");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("numberOfObjects").innerHTML = objName + "hasn't been found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
}
function startDetection(){
    model = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detection in progress";
    objName = document.getElementById("objectName").value;
}

function modelLoaded(){
    console.log("cocossd laoded succesfully");
    daStatus = true;
}