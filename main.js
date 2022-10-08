var noseX = 0;
var noseY = 0;
var leftWristX = 0;
var rightWristX = 0;
var difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,500);
    canvas.position(560,80);
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = "+noseX+" Nose Y ="+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = leftWristX - rightWristX;
        console.log("Left wrist X = "+leftWristX+" Right wrist X = "+rightWristX+" and Difference = "+difference);
    }
}

function modelLoaded(){
    console.log('PoseNet is initialised!')
}

function draw(){
    background('#969A97');
    document.getElementById("font_size").innerHTML = "Width and Height of this font will be "+difference+"px.";
    textSize(difference);
    fill('#F90093');
    text("Hi!",noseX,noseY);
}