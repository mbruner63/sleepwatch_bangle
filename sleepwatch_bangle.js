// PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT PVT
//----------Imported Libraries--------
var Layout = require("Layout");
var heatShrink = require("heatshrink");
let file = null;
let Version = "Version 1.26";
var sleepTank = 100;
//------------------------------------



//------------Variables---------------
let logicLoop = null;
let stopwatch = null;
let shouldContinueLoop = true;
let elapsedSecondsForStopwatch = 0;
let reactions = {};
let isImageCurrentlyBeingDisplayed = false;
let timeForReactionsHasElapsed = false;
var touchGuard = true;
let dateOfStart = null;
let recordDateOfStart = null;
let recordTimeOfStart = null;
let dateOfTargetDisplayed = null;
let timeData = [];
let reactionTimeData = [];
let isPvt = false;
let onMainMenu = true;
let cancelTest = false;
let showClock = false;

let menuDisabled = false;

var loopSpeed = 10;
var stopwatchSpeed = 10;
var minimumTargetDisplayTime = 2;
var maximumTargetDisplayTime = 10;
var numberOfSecondsTargetsShouldDisplay = 60;
var encodedTargetImage = atob("2OxwZC/AH4A/AEkSpMkyQCCpA/3HwpE6HxICEyA/vgI+MAQkgINsJIKKGtgQ+QAQhBqHyaGsghBXyVIIMw+WAQhAkgJBbyRBjhJBcpJBiHzYCDwBAfgRBfyVAIP7IgiRBhZDxBjyRB/AQNIILY+hAQhB/AQOQIP4CBoBB/AQMgIC0EINEkwBB/AQJB/AQNIIP4CBkBB/AQOAIMwahILwcJhJBQpBBiEZsSL58gISKnegKGPwBBfyAg/MSUAUh1AILxARAALIOILsgIKcAiRlcDppAUAAMJIJmQILVIIKzIOIOYmbIM0AdhkgDJcCDRdAILLINIOkAIJeQIOgpYINEAhIpKpBB0gApKpMgLKpBLgIUGIRcSNxWAIL71JCigCByBBfWBSGKFiitHIJryLC61IILgULAQcgTaYUIIMckwAZHgTdSIKbvLDRwUKyASGgjaSIKNJTybaRIJA+PZBZxKTA5BmOJESTCARRIKpfHgQUJkBBtF48AhLaPKaJBWF4wABCJOQF55BeyQeGggRPINNID4z4JCIrXKILxiHfBRBvkmAEAoyJKYkBEDQCPyAgFGR4gQILOSoAhFggyNBxxBcfAoABKZpBJySkQASD4EAAMSCJFIKBpBhfAoABSppQJcwwyOUhRlIdJKVDgSSNIJovOMqRBTOhQvGCJQjQyDUQIKYjLWwYACa5jUNDp4AFgK2MAAUSMpYdJIIwdJIJC2OSpbXDL7JBJCiC5JIJmADgkCIKZ0JWwTXPUJJBbGRIPFO5jjYNwoAGGREgB4o1LcbBBMGRIOFGpa2JcZ1IIJgyIdh41CBZAyGIKomJBxwmCWxFJeRxBNbpw1LWxFJkAbEghBVTZ41LIJ0ABxwAHLJwOIkgLNAAcSBxoAINC0kwALNAAUCBxoAILJwOIyQLKyAbFIKwXONBGSoALKFIsJKBoAIC5w1IpALKJoIADgJQNABAXOKA4CBBZRNCAAZQNABJoWpMgBZQpFghQNABAXOGpEkBZRNBAAhQNIKBoOAQOABZQbFiQONABBoWIIQLMAAUCBxoAILJwOIyALKyQbFDRQALLJwOIGoQLJoAbEhJQNABBZNGpgLIpAbEgIONIKCqOEwZ0IpIbFggONAA4mIVRwmCOhFJkArFBw8kILY1MBZAyGiQOHwBBLbp41LWxAyGgTyOIJzdGIJI1CBZAyGWBBuGWyIACO5OQOhbjSABAUPIJcAIJDjSIKIUGiS5LWxBfQa4xBdXIS2JDqCVGEZmACAj7JEYYdZSo5BLfAb7LpK2MDozXJCMZlDahhxNMQqVKAQJBTahoACghBKGQQOOMp7UNfAwyMARynFgARJwBQRWxxBfyBQRcxgCQdKBBEdJTmQIMAyFUiAgKIKoyPfBQgGiRBugAjJkAhGIL5iJCIr4KwAhFCJQCNUiIQFEZOQEQxBefCEEa57pLILz4Ga54jMIMgRRgEBILcAChQRRwASGbRShQF6RxLEo7aJIMcAExVAEyRBPhIUJyATHdiRWLLhxBTWZZCIIMb1IWZZWIZB4XIIKgULNZDINLJMBFkAUIgECbqZBWghBKkAsJLJITKIJdICxMSNxWAFxTgFYRJBZgBBKTZQATIJabLNYgXSINLyJAQZBbNbEEIJb4MILcgDJcSIJWSoBBzgBBLDRwmmgIaLkmAIOUAIJjIXgRBMkgdOIJjIWILodOZCkSILkAhLIhU5plQgJBNZCUEILwgQyRiedKTmOQx4dPIKQjRQxZfQIKanQAQQbHDSRBSgEEEyIpEC64ASVSICaIKkAIP4ABgJB/AALyVINcAiRB/AAJB/AARBnIDAABIP4ABgRB/AAMBIMcgILcAghB/AAMSIP4ABhJBgIDzIhpBBgZD5BiZD1AIMTIdIEYABgRBZyBBlAAJBYIE4ABiRBVkBBpgEBIKdIIFQACIKVAINqGRwBAuAAUCIJg/xAAkSQHQA/AH4AxA==");
var imageOfTarget = heatShrink.decompress(encodedTargetImage);
var numberOfMillisecondsInOneSecond = 1000;
var saveFileName = "Reaction-Data.pvt";

var fileMode = {
write: "w",
read: "r",
append: "a"
};
//------------------------------------






//---------Display Functions-----------
var clear = () => g.clear();

var displayWelcomeMessage = () => {
clear();
E.showMenu();
file = require("Storage").open("demo.pvt", "w");
cancelTest = false;
menuDisabled = true;
countDown().then(() => onSideButtonPressed());
};

var displayCompleteMessage = () => {
clear();
E.showMessage("Test complete\n\n");
Bangle.setLCDTimeout(10);
};

var countDown = () => new Promise((resolve, reject) => {
setTimeout(() => E.showMessage("Ready"), 500);
setTimeout(() => E.showMessage("Set"), 1500);
setTimeout(() => E.showMessage("Go!"), 2500);
setTimeout(() => {
Bangle.setLCDTimeout(0);
resolve();
clear();
}, 3500);
});

//--------------------------------------





//---------Business Logic Functions-----
var getRandomNumber = (from, to) => {
return Math.floor(Math.random() * (to - from + 1) + from);
};

var convertSecondsToMilliseconds = (seconds) => {
return seconds * numberOfMillisecondsInOneSecond;
};

var continueLoopAfterDelay = (millisecondDelay) => setTimeout(() => shouldContinueLoop = true, millisecondDelay);

var getRandomDelay = () => {
let randomDelayInSeconds = getRandomNumber(minimumTargetDisplayTime, maximumTargetDisplayTime);
let randomDelayInMilliseconds = convertSecondsToMilliseconds(randomDelayInSeconds);
return randomDelayInMilliseconds;
};

var drawImage = (image) => {
clear();
g.drawImage(image, 0, 0);
};

var forceScreenToStayOn = () => {
Bangle.setLCDPower(1);
};


var startStopwatch = () => {
stopwatch = setInterval(() => onStopwatchTick(), stopwatchSpeed);
};

var isFalseStart = () => {
return elapsedSecondsForStopwatch < 100;
};

var falseStart = () => {
clear();
E.showMessage("False Start \nWait for next target");
stopStopwatch();
resetStopwatch();
elapsedSecondsForStopwatch = 0;
recordReactionTime();
};

var stopAnyPreExistingStopwatches = () => {
if (stopwatch) {
clear();
stopStopwatch();
resetStopwatch();
}
};

var stopStopwatch = () => {
clearInterval(stopwatch);
stopwatch = null;
};

var resetStopwatch = () => {
elapsedSecondsForStopwatch = 0;
};


var recordReactionTime = () => {
let dateDataTaken = dateOfTargetDisplayed - dateOfStart;
  dateDataTaken = dateDataTaken / 1000;
  dateDataTaken = dateDataTaken.toFixed(1);
timeData.push(dateDataTaken);
  reactionTimeData.push(elapsedSecondsForStopwatch);

// prevent printing of reaction time if false start  
if (elapsedSecondsForStopwatch > 1) {
g.setFontAlign(0,0);
g.setColor("#000000");
g.setFont("Vector",30);
g.drawString(elapsedSecondsForStopwatch.toString(), 88, 88);
}
};


var getStartDateForExport = () => {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

recordDateOfStart = mm + '/' + dd + '/' + yyyy;
};

var getStartTrialTimeForExport = () => {
var d = new Date();
var curr_hour = d.getHours();
var curr_min = d.getMinutes();
  if (curr_min < 10) {
  curr_min = "" + 0 + curr_min;
  }
recordTimeOfStart = "" + curr_hour + curr_min;

};
//--------------------------------------



//-----Input/Output (IO) Operations-----
var saveReactionsToFile = () => {
for (let i = 0; i < timeData.length; i++) {
    if ( i == 0) {
    createDataHeader();
    }
let recordTimeData = timeData[i].toString();
    let recordReactionTimeData = reactionTimeData[i].toString();
file.write(recordReactionTimeData + "," + recordTimeData + "\r\n");
}
file.write("0, 0");
};

createDataHeader = () => {
    file.write("\r\n\"PVT DATA\" \r\n");
   file.write("\"STUDY: \", \"STUDY\" \r\n");
    file.write("\"RATING PRE, POST TRIAL: \",5,5\r\n");
    file.write("\"E. INITIALS:\", \"JKB\"\r\n");
    file.write("\"S. INITIALS:\", \"MLB\"\r\n");
    file.write("\"S. ID NUMBER:\", 8888\r\n");
    file.write("\"TRIAL NUMBER:\", 1 \r\n");
    file.write("\"TRIAL DATE:\", \"" + recordDateOfStart + "\"\r\n");
    file.write("\"TRIAL TIME:\", \"" + recordTimeOfStart + "\" \r\n");
    file.write("\"ISI MIN (ms):\", 2000\r\n");
    file.write("\"ISI MAX (ms):\", 10000\r\n");
    file.write(
        "\"TRIAL LENGTH (s):\", " + numberOfSecondsTargetsShouldDisplay +" \r\n");
    file.write("\"TASK:\", \"V\" \r\n");
    file.write("\"HAND: \",\"R\" \r\n");
    file.write("\"PVT S/N:\", 0001\r\n");
};

//--------------------------------------





//--------------Events------------------
var onSideButtonPressed = () => {
touchGuard = false;
dateOfStart = Date.now();
  getStartDateForExport();
  getStartTrialTimeForExport();
 
var randomDelay = getRandomDelay();
setTimeout(() => startLoop(), randomDelay);
endLoopAfterElapsedTime();
};

var onStopwatchTick = () => {
elapsedSecondsForStopwatch += stopwatchSpeed;

// Added by MLB
// check to see if we are over 10 seconds
if (elapsedSecondsForStopwatch > 9999) {
clear();
stopStopwatch();
recordReactionTime();
resetStopwatch();

}
};

var onScreenTouched = () => {

// Guard to prevent swiping at the end of the code triggering false start
if (touchGuard) {
return;
}
if (!isImageCurrentlyBeingDisplayed) {
falseStart();
return;

}


clear();
isImageCurrentlyBeingDisplayed = false;
//elapsedSecondsForStopwatch -= 25;//
if (isFalseStart()) {
falseStart();
return;
}
stopStopwatch();

recordReactionTime();
resetStopwatch();

Bangle.buzz();
};

var onReactionGameCompleted = () => {
touchGuard = true;
timeForReactionsHasElapsed = true;
stopAnyPreExistingStopwatches();
clearInterval(logicLoop);
menuDisabled = false;
if (cancelTest == false) {
displayCompleteMessage();
saveReactionsToFile();
}};

//--------------------------------------




//--------------Main Loop---------------
var startLoop = () => {
clear();
logicLoop = setInterval(() => loop(), loopSpeed);
};

var loop = () => {
forceScreenToStayOn();

if (shouldContinueLoop) {
let randomDelay = getRandomDelay();

if (isImageCurrentlyBeingDisplayed) {
shouldContinueLoop = false;
continueLoopAfterDelay(randomDelay);
return;
}

shouldContinueLoop = false;

drawImage(imageOfTarget);
isImageCurrentlyBeingDisplayed = true;
dateOfTargetDisplayed = Date.now();
startStopwatch();

continueLoopAfterDelay(randomDelay);
}
};

var endLoopAfterElapsedTime = () => {
var elapsedTime = convertSecondsToMilliseconds(numberOfSecondsTargetsShouldDisplay);

setTimeout(() => {
onReactionGameCompleted();
}, elapsedTime);
};
//--------------------------------------



//---------Bangle.JS Hardware Events----

/*Bangle.on('touch', () => {
onScreenTouched();
});
Bangle.on('swipe', function(direction) {
if (menuDisabled == false) {
menuMain();
}
});*/

//--------------------------------------



//-------------Application--------------

// ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM ZCM

//---------Variables-------------------
let zcm = 0;
let zcmFile = null;
let bpm = 0;
let steps = 0;
let sleep = [];
let currentZCMBuffer = [];
let epoch = 0; //minutes passed
let isRunning = false;
let isHRM = false;
let zcmRecordDateOfStart = null;
let zcmRecordTimeOfStart = null;
let ZCMData = [];
let ZCMValue = 0;
let dbSleep = 0;
var accel = {};
var last;
let zcmRecordDateOfStartTitle = 0;
let zcmRecordTimeOfStartTitle = 0;

var R = Bangle.appRect;
var x = 0;


// X, Y, Z Varriables

var xMaxMinList = [];
var xsample_counter = 0;
var xhigh = false;
var xprevious = false;
var lastX = 0;
var dx = 0;
var dxSum;
var dxCalculated;
var dxList = [];
var x_zcm = 0;

var yMaxMinList = [];
var ysample_counter = 0;
var yhigh = false;
var yprevious = false;
var lastY = 0;
var dy = 0;
var dySum;
var dyCalculated;
var dyList = [];
var y_zcm = 0;

var zMaxMinList = [];
var zsample_counter = 0;
var zhigh = false;
var zprevious = false;
var lastZ = 0;
var dz = 0;
var dzSum;
var dzCalculated;
var dzList = [];
var z_zcm = 0;
var window_size = 4;
var x_thresh = 0.025;
var y_thresh = 0.03;
var z_thresh = 0.03;


var bpmMax = 0;
//-------------------------------------


//---------X, Y, Z Filters-----------------

var dxFilter = () => {
    if (dxList.length > window_size) {
        dxList.shift();
    }
    dxWindow();
};

var dxWindow = () => {
  var i;
    if (dxList.length == window_size) {
      for(i=0;i<window_size;i++){
        dxSum = dxList[i];
        dxCalculated = dxSum / window_size;
      }
    }
};

var dyFilter = () => {
    if (dyList.length > window_size) {
        dyList.shift();
    }
    dyWindow();
};

var dyWindow = () => {
  var i;
    if (dyList.length == window_size) {
      for(i=0;i<window_size;i++){
        dySum = dyList[i];
        dyCalculated = dySum / window_size;
      }
    }
};

var dzFilter = () => {
    if (dzList.length > window_size) {
        dzList.shift();
    }
    dzWindow();
};

var dzWindow = () => {
  var i;
    if (dzList.length == window_size) {
      for(i=0;i<window_size;i++){
        dzSum = dzList[i];
        dzCalculated = dzSum / window_size;
      }
    }
};

//---------X, Y, Z Buisness Logic------

var xChange = (v) => {
  //console.log(v);
    dx = v - lastX;
    lastX = v;
    xsample_counter++;
    dxList.push(dx);
    dxFilter();
    //console.log(dxCalculated);
    if (dxCalculated > x_thresh) {
        xhigh = true;
    } else {
        xhigh = false;
    }
    if (xhigh != xprevious) {
       // console.log("x");
        x_zcm++;
    }
    xprevious = xhigh;
};

var yChange = (v) => {
    dy = v - lastY;
    lastY = v;
    ysample_counter++;
    dyList.push(dy);
    dyFilter();
    if (dyCalculated > y_thresh) {
        yhigh = true;
    } else {
        yhigh = false;
    }
    if (yhigh != yprevious) {
     //console.log("y");
        y_zcm++;
    }
    yprevious = yhigh;
};

var zChange = (v) => {
    dz = v - lastZ;
    lastZ = v;
    zsample_counter++;
    dzList.push(dz);
    dzFilter();
    if (dzCalculated > z_thresh) {
        zhigh = true;
    } else {
        zhigh = false;
    }
    if (zhigh != zprevious) {
      //console.log("z");
        z_zcm++;
    }
    zprevious = zhigh;
};

//---------Business Logic Functions-----

var bufferZCM = () => {
    //zcm = zcm * 2;
    ZCMData.push(zcm);
    if (ZCMData.length > 7) {
        ZCMData.shift();
    }
};

var zcmGetStartDateForExport = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    zcmRecordDateOfStart = mm + ',' + dd + ',' + yyyy;
    zcmRecordDateOfStartTitle = mm + '-' + dd + '-' + yyyy;
};

var zcmGetStartTrialTimeForExport = () => {
    let time = new Date();
    let currHour = time.getHours();
    if (currHour < 10) {
      currHour = "" + 0 + currHour;}
    let currMin = time.getMinutes();
    if (currMin < 10) {
        currMin = "" + 0 + currMin;
    }
    zcmRecordTimeOfStart = "" + currHour + "," + currMin;
    zcmRecordTimeOfStartTitle = "" + currHour + currMin;

};

var sleepCalculations = () => {
    dbSleep = 0.0033 * (1.06 * ZCMData[0] +
        0.54 * ZCMData[1] +
        0.58 * ZCMData[2] +
        0.76 * ZCMData[3] +
        2.3 * ZCMData[4] +
        0.74 * ZCMData[5] +
        0.67 * ZCMData[6]);
};

var isAsleep = () => {
    if (epoch > 6) //if 6 minutes passes by
    {
        sleepCalculations();
        if (dbSleep > 1) {
            dbSleep = 0; // awake
            sleepTank = sleepTank - 0.1;
            checkSleepTank();
        } else {
            dbSleep = 1; // Asleep
            sleepTank = sleepTank + 0.2;
            checkSleepTank();
        }
    }else{
        dbSleep = 0; // awake
        sleepTank = sleepTank - 0.1;
        checkSleepTank();
    }
    epoch++;
};

var checkSleepTank = () => {
if (sleepTank >= 100) {
  sleepTank = 100;
} else if (sleepTank <= 0) {
  sleepTank = 0;
}
  console.log(sleepTank);
};


var calculateBestBpm = (bmp) => {
        if (bpm > bpmMax) {
         bpmMax = bpm;
        } else {
        bpm = bpmMax;
        }
};

var resetDataVariables = () => {
    bpmMax = 0;
    x_zcm = 0;
    y_zcm = 0;
    z_zcm = 0;
    zcm = 0;
    bpm = 0;
};

var zcmCalculated = () => {
zcm = z_zcm + x_zcm + y_zcm;
    ZCMData.push(zcm);
    bufferZCM();};

var createFile = () => {
        zcmGetStartDateForExport();
        zcmGetStartTrialTimeForExport();
        zcmFile = require("Storage").open("ZCM.txt", "w");
        zcmFile.write(Version+"\r\n");
        zcmFile.write("Start of Test: " + zcmRecordDateOfStart + "," + zcmRecordTimeOfStart + "\r\n");
        zcmFile.write("Sleep , ZCM , BPM , Steps \r\n");
};



//-------------------------------------



//---------Hardware-------------------

Bangle.setHRMPower(true);
Bangle.setLCDBrightness(1);

Bangle.on('accel', (a) => {
    if (isRunning) {
        xChange(a.x);
        yChange(a.y);
        zChange(a.z);}
});

Bangle.on('HRM', function(hrm) {
    if (hrm.confidence > 60 && isRunning) {
    bpm = hrm.bpm;
    calculateBestBpm();}
});


//---------Main Loop-------------------


var zcmLoop = () => {
    mainZcmLoop = setInterval((() => {
    steps = Bangle.getStepCount();
    zcmCalculated();
    isAsleep();
    zcmFile.write(dbSleep + "," + zcm + "," + bpm + "," + steps + "\r\n");
    ///console.log("x "+x_zcm+" y "+y_zcm+" z "+z_zcm);  
    resetDataVariables();
    //console.log("in ZCM");
}), 60000);};

var zcmEnd = () => {
E.showMenu();
clearInterval(mainZcmLoop);
isRunning = false;
E.showMessage("ZCM session ended \n\Swipe left for menu");
};

var zcmStart = () => {
    E.showMenu();
    createFile();
    Bangle.setStepCount(0);
    if(!isRunning) {
    isRunning = true;
    zcmLoop();
    }
    else {
    //E.showMessage("ZCM restarted");
      zcmLoop();
    }
    Bluetooth.print('{');
    Bluetooth.print('}');

};


//--------------------------------------


// turn off backlight. Else keep backlight on.

function setBacklight() { 
    var d = new Date();
    var h = d.getHours();
    var  m = d.getMinutes();
    var s = d.getSeconds();
    //console.log("checking time");
    console.log(h);
   if ((h > 20) || (h < 7)) { Bangle.setLCDBrightness(0); } else {Bangle.setLCDBrightness(1);}}


// MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU

var btn;
function exitMenu(){
  clockDisplay_enable();
    swipe_enabled = false;
    g.clear();
  onMainMenu = false;
  E.showMenu();
}

function menuMain() {
  onMainMenu = true;
  showClock = true;
  swipe_enabled = false;
  clockDisplay_disable();
  E.showMenu({
    "": { title: /*LANG*/"Main Menu" },
    /*LANG*/"ZCM": () => menuZCM(),
    /*LANG*/"PVT": () => menuPVT(),
    /*LANG*/"Exit": () =>exitMenu(),});}
function menuZCM() {
  swipe_enabled = false;
  onMainMenu = false;
  E.showMenu({
    "": { title:/*LANG*/"ZCM" },
    /*LANG*/"< Back": () => menuMain(),
    /*LANG*/"Restart Session": () => zcmStart(),
  });
}

function menuPVT() {
  swipe_enabled = false;
  onMainMenu = false;
  E.showMenu({
    "": { title:/*LANG*/"PVT" },
    /*LANG*/"< Back": () => menuMain(),
    /*LANG*/"Start Session": () => startPVT(),
  });
}


function startPVT() {
  g.clear(1);
  g.reset();
  displayWelcomeMessage();
}


//CLOCK

function stepsCheckForReset(){
    var d = new Date();
    var h = d.getHours();
    var  m = d.getMinutes();
    var s = d.getSeconds();
    //console.log("checking time");
    if((h==2)&&(m==0)&&(s==0)){
        Bangle.setStepCount(0);
    }
}

var draw = () => {
  //setBacklight();
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes();
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",4);
  g.setFontAlign(1,1); // align right bottom
  g.drawString(time, X, Y, true /*clear background*/);
  // draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg",2);
  g.drawString(("0"+d.getSeconds()).substr(-2), X+30, Y, true /*clear background*/);
  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0,0); // align center bottom
  // pad the date - this clears the background if the date were to change length
  var dateStr = "    "+require("locale").date(d)+"    ";
  g.drawString(dateStr, g.getWidth()/2, Y+15, true);
  calculateSleepTank();
  Bangle.drawWidgets();
};

var calculateSleepTank = () => {
  let textColor = '#008000';
  
  if (sleepTank > 70){ 
    textColor = '#008000'; 
  } else if ( sleepTank > 40) { 
    textColor = '#FFC300'; } else { 
    textColor = '#FF0000'; }

  g.setColor(textColor);
  //g.setFont("Vector12", 8);
  g.setFont12x20(2);
  g.drawString(sleepTank+"%",50, Y-75,false);
 
  
};
   
function clockDisplay_enable(){
  secondInterval = setInterval(draw, 1000);
}


// Disable clock display
function clockDisplay_disable(){
    clearInterval(secondInterval);
  g.clear();


}
// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 130, Y = 110;


clear();
 Bangle.loadWidgets();
 Bangle.drawWidgets();
setInterval(stepsCheckForReset,1000); 
secondInterval = setInterval(draw, 1000);
zcmStart();

setWatch(() => {

  if (showClock && onMainMenu && !menuDisabled) {

    exitMenu();
    showClock = false;
  } 
  else if (menuDisabled) { 

  onScreenTouched();
  } else { 

  menuMain();
  showClock=true;
  }
}, BTN1, {repeat:true});





//(ON BUTTON PRESS) menuMain();
//launchClock();


//BLUETOOTH

function zcmDl() {

    // open zcm file
    var zcmReadFile = require("Storage").open("ZCM.txt", "r");
    // read file lines
    var l = zcmReadFile.readLine();
    Bluetooth.print('{');
    while (l !== undefined) {
        // send out bluetooth
        Bluetooth.print(l);
        l = zcmReadFile.readLine();
    }
    Bluetooth.print('}');
}

function test(){
  g.clear();
  Bluetooth.print("hello");
}
function pvtDl() {

    // open zcm file
    var pvtReadFile = require("Storage").open("demo.pvt", "r");
    // read file lines
    Bluetooth.print('{');
    var l = pvtReadFile.readLine();
    while (l !== undefined) {
        // send out bluetooth
        Bluetooth.print(l);
        l = pvtReadFile.readLine();
    }
    Bluetooth.print('}');
}
