var synth = window.speechSynthesis;
var utter_this = new SpeechSynthesisUtterance('Object Found!');

objects = []
video = ''
input = ''

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    for (i = 0; i < objects.length; i++) {
        fill('#FF0000')
        if (input === '') {
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        } else {
            if(objects[i].label === input) {
                percent = floor(objects[i].confidence * 100)
                text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15)
                noFill()
                stroke('#FF0000')
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
                synth.speak(utter_this);
            } 
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    input = document.getElementById('obj_name').value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results
    }
}