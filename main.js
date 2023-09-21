rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
leftWristScore=0;
rightWristScore=0;

song1status="";
song2status="";



function preload(){
    song1=loadSound("fb.mp3");
    song2=loadSound("eikal.mp3");
}



function setup(){
    video = createCapture(VIDEO);
    video.hide();

    canvas = createCanvas(670, 500);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}



function modelLoaded(){
    console.log("model loaded");
}



function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;
    }
}



function draw(){
    image(video, 0, 0, 670, 500);
    fill("red");
    stroke("red");

    song1status = song1.isPlaying();
    song2status= song2.isPlaying();

    if(leftWristScore>0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        console.log("Leftwristscore is greater than 0.2");
    if(song1status==false){
        song1.play();
        console.log("Songstatus1 false");
    }
    }

    if(rightWristScore>0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        console.log("Rightwristscore is greater than 0.2");
    if(song2status==false){
        song2.play();
        console.log("Songstatus2 false");
    }
    }
}