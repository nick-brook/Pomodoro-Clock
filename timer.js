// global time object
var timeObj = {
            "breakTime" : 5,
            "workTime" : 25,
            "breakTimeLeft" : 300,
            "workTimeLeft" : 1500,
            "work": true,
            "play" : false,
} ;

var timerChange




function initialize() {


    // initialize timeObj
        timeObj.breakTime = 5;
        timeObj.workTime = 25;
        timeObj.breakTimeLeft = 300;
        timeObj.workTimeLeft = 1500;

    //  if playing stop timer

    if (timeObj.playplay){

    }

    timeObj.work = true;
    timeObj.play = true;

// update display
    updateDisp(timeObj)

}

// update display 
function updateDisp(locTimeObj) {
    
    // update break and work time
    document.getElementById("work-time").innerHTML = locTimeObj.workTime;
    document.getElementById("break-time").innerHTML = locTimeObj.breakTime;

    // calculate, format and display time left

    // if work phase get work time left else break time left

    var dispStr = ""

    if (locTimeObj.work){
        dispStr = locTimeObj.workTimeLeft
        document.getElementById("session-level").innerHTML = "Work Time Left"
    }
    else{
        dispStr = locTimeObj.breakTimeLeft
        document.getElementById("session-level").innerHTML = "Break Time Left"
    }

    var minutes = Math.floor(dispStr / 60);
    minutes = (minutes < 10 ? "0" + minutes : minutes);

    var seconds = (dispStr % 60) ;
     seconds = (seconds < 10 ? "0" + seconds : seconds);

    dispStr = minutes + " : " + seconds

    document.getElementById("session-length").innerHTML = dispStr;
}

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

function validIncDec(inc,time) {

    if (inc){
        if (time < 60){
            return time + 1
        }
        else {
            return time
        }
    }
    else{
        if (time < 1){
            return time 
        }
        else {
            return time - 1
        }
    }
}

function playTimer(){

    timeObj.play = true;
    timerChange = setInterval(updateTimeLeft, 1000);

}

function updateTimeLeft(){

    if (timeObj.work){
        timeObj.workTimeLeft = timeObj.workTimeLeft - 1
        updateDisp(timeObj)
    }
    else{
        timeObj.breakTimeLeft = timeObj.breakTimeLeft - 1
        updateDisp(timeObj)
    }

}



function pauseTimer(){
    timeObj.play = false;
    clearInterval(timerChange);


}