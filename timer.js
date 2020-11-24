// global time object
var timeObj = {
            "breakTime" : 5,
            "workTime" : 25,
            "breakTimeLeft" : 300,
            "workTimeLeft" : 1500,
            "work": true,
            "play" : false,
} ;

const audioObj = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');

var timerChange;

function initialize() {

    // initialize timeObj
    timeObj.breakTime = 5;
    timeObj.workTime = 25;
    timeObj.breakTimeLeft = 300;
    timeObj.workTimeLeft = 1500;
    timeObj.work = true;
    timeObj.play = true;

    // stop the beep if playing
    audioObj.pause();

    // update display
    updateDisp(timeObj);
    document.getElementById("session-length").style.color = "black";
}

// update display function
function updateDisp(locTimeObj) {

    var dispStr = "";
    var minutes = 0;
    var seconds = 0;

    // update break and work time
    document.getElementById("work-time").innerHTML = locTimeObj.workTime;
    document.getElementById("break-time").innerHTML = locTimeObj.breakTime;

    // if work phase get work time left else break time left
    if (locTimeObj.work){
        dispStr = locTimeObj.workTimeLeft
        document.getElementById("session-level").innerHTML = "Work Time Left"
    }
    else{
        dispStr = locTimeObj.breakTimeLeft
        document.getElementById("session-level").innerHTML = "Break Time Left"
    }

    // change colour if < 1 min to go 
    changeColour(dispStr)

    // define minutes and seconds left and dipslay in mm:ss format
    minutes = Math.floor(dispStr / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = dispStr % 60 ;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    dispStr = minutes + ":" + seconds

    document.getElementById("session-length").innerHTML = dispStr;
    
}

// increment / decrement work or break time convert time left to seconds
function incDec(inc,wrkBrk) {

    if (wrkBrk){
        timeObj.workTime = validIncDec(inc,timeObj.workTime);
        timeObj.workTimeLeft = timeObj.workTime * 60;
    }
    else{
        timeObj.breakTime = validIncDec(inc,timeObj.breakTime)
        timeObj.breakTimeLeft = timeObj.breakTime * 60;
    }

    updateDisp(timeObj)
}

// check it is valid increment
function validIncDec(inc,time) {

    // can't increment above 1 hour
    if (inc){
        if (time < 60){
            return time + 1
        }
        else {
            return time
        }
    }
    // can't decrement below 1 min
    else{
        if (time < 1){
            return time 
        }
        else {
            return time - 1
        }
    }
}

// play function interval every second
function playTimer(){

    timeObj.play = true;
    timerChange = setInterval(updateTimeLeft, 1000);
}

function updateTimeLeft(){

    //if working phase decrement time left and update display else break time
    if (timeObj.work){
        timeObj.workTimeLeft = timeObj.workTimeLeft - 1;
    }
    else{
        timeObj.breakTimeLeft = timeObj.breakTimeLeft - 1;
    }

  // when timer finshed play beep, switch from break to work or vice versa
    if (timeObj.workTimeLeft < 0 && timeObj.work){
            audioObj.play();
            timeObj.work = false;
            timeObj.workTimeLeft = timeObj.workTime * 60;
        }
    
    if (timeObj.breakTimeLeft < 0 && !timeObj.work){
            audioObj.play();
            timeObj.work = true;
            timeObj.breakTimeLeft = timeObj.breakTime * 60;
        }

    updateDisp(timeObj)
}

// change colour of time left it 1min or less
function changeColour(time){
    if (time <= 60){
        document.getElementById("session-length").style.color = "red";
    }
    else{
        document.getElementById("session-length").style.color = "black";
    }
}

function pauseTimer(){
    timeObj.play = false;
    clearInterval(timerChange);
}