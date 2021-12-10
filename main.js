scoreLeftWrist=0;
scoreRightWrist=0;
song="";
song2="";
song_status="";
song_status2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload()
{
    song =loadSound("music.mp3");
    song2 =loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,450);
    song_status=song.isPlaying();
    song_status2=song2.isPlaying();
    if (scoreRightWrist>0.2)
    {
    fill("#ff0000");
    stroke("ff0000");
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if (rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed =1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="Speed =1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML="Speed =2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML="Speed =2.5x";
        song.rate(2.5);
    }
    
    if (song_status==false)
    {
        song.play();
    }
}

    fill("#ff0000");
    stroke("#ff0000");
    if (scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song.stop();
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="VOLUME = "+volume;
    song.setVolume(volume);
    if(song_status2==false)
    {
        song2.play();
    }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = "+scoreRightWrist+"Score Left Wrist = "+scoreLeftWrist);
        console.log(scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+",Y = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+",Y = "+rightWristY);
    }
}